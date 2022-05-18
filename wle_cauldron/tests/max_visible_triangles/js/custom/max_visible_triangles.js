WL.registerComponent("max-visible-triangles", {
    _myTargetFrameRate: { type: WL.Type.Int, default: -1 },             //-1 means it will auto detect it at start
    _myTargetFrameRateThreshold: { type: WL.Type.Int, default: 2 },
    _myStartPlaneCount: { type: WL.Type.Int, default: 2 },
    _myPlaneTriangles: { type: WL.Type.Int, default: 2 },
    _mySecondsBeforeDoubling: { type: WL.Type.Float, default: 0.5 },    // higher gives a better average frame rate
    _myCloneMaterial: { type: WL.Type.Bool, default: true },
    _myCloneMesh: { type: WL.Type.Bool, default: false },
    _myPlaneMaterial: { type: WL.Type.Material },
    _myBackgroundMaterial: { type: WL.Type.Material }
}, {
    _start() {
        this._myBackgroundSize = 4;
        this._myBackgroundObject.pp_setActive(true);
        this._myBackgroundObject.pp_setScale(this._myBackgroundSize + 0.1);
        this._myBackgroundObject.pp_translate([0, 0, -0.001]);

        this._myDoubleTimer = new PP.Timer(this._mySecondsBeforeDoubling);
        this._myIsDone = false;

        this._myCurrentPlanes = this._myStartPlaneCount;

        this._myElapsedTime = 0;
        this._myFrameCount = 0;

        this._myUpperLimit = -1;
        this._myLowerLimit = 0;

        this._myPlanes = [];
        this._mySkipNextFrames = 0;
        this._myMaxWaitFrames = 0;

        this._myMaxPlaneReached = false;

        this._myFirstTime = true;
    },
    _update(dt) {
        //Skip lag frames after the new set of plane has been shown, wait for it to be stable
        {
            if (dt > 0.5 && this._myMaxWaitFrames > 0) {
                this._myMaxWaitFrames--;
                return;
            }

            this._myMaxWaitFrames = 10;

            if (this._mySkipNextFrames > 0) {
                this._mySkipNextFrames--;
                return;
            }
        }

        if (!this._myIsDone) {
            this._myElapsedTime += dt;
            this._myFrameCount++;

            this._myDoubleTimer.update(dt);
            if (this._myDoubleTimer.isDone()) {
                this._myDoubleTimer.start();

                if (this._myFirstTime) {
                    this._myFirstTime = false;
                } else {

                    let averageDT = this._myElapsedTime / this._myFrameCount;
                    let averageFrameRate = 1 / averageDT;

                    //if there is not lag, the current plane count is a good lower limit, otherwise the current count is now a upper threshold, we have to search below it
                    let isLagging = false;
                    if (averageFrameRate < this._myStableFrameRate - this._myTargetFrameRateThreshold) {
                        this._myUpperLimit = this._myCurrentPlanes;

                        console.log("Lag - Triangles:", this._myCurrentPlanes * this._myRealTrianglesAmount, "- Planes:", this._myCurrentPlanes, "- Average Frame Rate:", averageFrameRate.toFixed(2));
                        isLagging = true;

                        if (this._myUpperLimit == 1) {
                            this._myLowerLimit = 1;
                        }
                    } else {
                        this._myLowerLimit = this._myCurrentPlanes;
                    }

                    //check if the binary search is completed
                    if (this._myUpperLimit > 0 && (this._myUpperLimit - this._myLowerLimit) <= 1 || (!isLagging && this._myMaxPlaneReached)) {
                        if (this._myUpperLimit > 1 && averageFrameRate < this._myStableFrameRate - this._myTargetFrameRateThreshold) {
                            //going a bit back with the binary search, maybe the lower limit was not lower after all cause of a bad assumption of average FPS
                            this._myUpperLimit = this._myCurrentPlanes;
                            this._myLowerLimit = Math.floor(this._myUpperLimit / 2);
                        } else {
                            if (this._myMaxPlaneReached) {
                                console.log("Aborting - Max Plane Reached");
                            } else {
                                this._displayPlanes(this._myLowerLimit);

                                console.log("\nEnd - Triangles:", this._myLowerLimit * this._myRealTrianglesAmount, "- Planes:", this._myLowerLimit, "- Average Frame Rate:", averageFrameRate.toFixed(2));
                                console.log("Plane Triangles (Adjusted):", this._myRealTrianglesAmount);
                                console.log("Target Frame Rate:", this._myStableFrameRate.toFixed(2), "- Threshold: ", (this._myStableFrameRate - this._myTargetFrameRateThreshold).toFixed(2));
                            }
                            this._myIsDone = true;
                        }
                    }

                    if (!this._myIsDone) {
                        //sort of binary search, if there is no upper limit yet, just double
                        if (this._myUpperLimit > 0) {
                            this._myCurrentPlanes = Math.floor((this._myUpperLimit + this._myLowerLimit) / 2);
                            this._myCurrentPlanes = Math.max(this._myCurrentPlanes, 1);
                        } else {
                            this._myCurrentPlanes = this._myLowerLimit * 2;
                        }

                        if (this._myCurrentPlanes > 65000) {
                            this._myCurrentPlanes = 65000;
                            this._myMaxPlaneReached = true;
                        } else {
                            this._myMaxPlaneReached = false;
                        }
                    }
                }

                if (!this._myIsDone) {
                    this._displayPlanes(this._myCurrentPlanes);
                    this._myElapsedTime = 0;
                    this._myFrameCount = 0;

                    this._mySkipNextFrames = 30;
                }
            }
        }
    },
    _displayPlanes(count) {
        while (this._myPlanes.length > count) {
            let plane = this._myPlanes.pop();
            this._myPlanePool.release(plane);
        }

        while (this._myPlanes.length < count) {
            let plane = this._myPlanePool.get();
            this._myPlanes.push(plane);
        }

        let gridSize = 1;
        while (gridSize * gridSize < count) {
            gridSize++;
        }

        let spaceBetween = 0.01;
        let totalSpaceBetween = spaceBetween * (gridSize - 1);
        let planeSize = (this._myBackgroundSize * 2 - totalSpaceBetween) / (gridSize * 2);

        let currentCount = count;

        for (let i = 0; i < gridSize && currentCount > 0; i++) {
            for (let j = 0; j < gridSize && currentCount > 0; j++) {
                let plane = this._myPlanes[currentCount - 1];
                plane.pp_setScale(planeSize);

                let position = [-this._myBackgroundSize + planeSize + j * planeSize * 2 + j * spaceBetween, this._myBackgroundSize - planeSize - i * planeSize * 2 - i * spaceBetween, 0];

                plane.pp_setPositionLocal(position);
                plane.pp_setActive(true);

                currentCount--;
            }
        }
    },
    start() {
        this._myRealTrianglesAmount = 0;

        this._myTrianglesObject = WL.scene.addObject(this.object);

        this._myBackgroundObject = WL.scene.addObject(this._myTrianglesObject);
        {
            let meshComponent = this._myBackgroundObject.addComponent('mesh');
            meshComponent.mesh = PP.MeshUtils.createPlaneMesh();
            meshComponent.material = this._myBackgroundMaterial.clone();
        }

        this._myPlaneObject = WL.scene.addObject(this._myTrianglesObject);
        {
            let meshComponent = this._myPlaneObject.addComponent('mesh');
            meshComponent.mesh = this._createPlaneMesh(this._myPlaneTriangles);
            this._myRealTrianglesAmount = meshComponent.mesh.indexData.length / 3;
            meshComponent.material = this._myPlaneMaterial.clone();
        }

        let poolParams = new PP.ObjectPoolParams();
        if (!this._myCloneMesh) {
            poolParams.myInitialPoolSize = 65100;
        } else {
            if (this._myRealTrianglesAmount <= 4) {
                poolParams.myInitialPoolSize = 45100;
            } else if (this._myRealTrianglesAmount <= 8) {
                poolParams.myInitialPoolSize = 25100;
            } else if (this._myRealTrianglesAmount <= 64) {
                poolParams.myInitialPoolSize = 15100;
            } else {
                poolParams.myInitialPoolSize = 5100;
            }
        }
        poolParams.myPercentageToAddWhenEmpty = 0;
        poolParams.myAmountToAddWhenEmpty = 10000;
        poolParams.myCloneParams = new PP.CloneParams();
        poolParams.myCloneParams.myDeepCloneParams.setDeepCloneComponentVariable("mesh", "material", this._myCloneMaterial);
        poolParams.myCloneParams.myDeepCloneParams.setDeepCloneComponentVariable("mesh", "mesh", this._myCloneMesh);
        this._myPlanePool = new PP.ObjectPool(this._myPlaneObject, poolParams);

        this._myBackgroundObject.pp_setActive(false);
        this._myPlaneObject.pp_setActive(false);

        this._myStartTimer = new PP.Timer(1);
        this._mySessionStarted = false;
    },
    update(dt) {
        if (this._mySessionStarted) {
            if (this._myStartTimer.isRunning()) {
                this._myStartTimer.update(dt);
                if (this._myStartTimer.isDone()) {
                    this._myStableFrameRate = 1 / dt;
                    if (this._myTargetFrameRate > 0) {
                        this._myStableFrameRate = this._myTargetFrameRate;
                    }
                    console.log("\nPlane Triangles (Adjusted):", this._myRealTrianglesAmount);
                    console.log("Target Frame Rate:", this._myStableFrameRate.toFixed(2), "- Threshold: ", (this._myStableFrameRate - this._myTargetFrameRateThreshold).toFixed(2));
                    console.log("");
                    this._start();
                }
            } else {
                this._update(dt);
            }
        } else {
            this._mySessionStarted = WL.xrSession != null;
        }
    },
    _createPlaneMesh(trianglesAmount) {
        let squaresAmount = Math.ceil(trianglesAmount / 2);

        let row = 1;
        let column = 1;

        let closestSqrt = 1;
        while (closestSqrt * closestSqrt < squaresAmount) {
            closestSqrt++;
        }

        row = closestSqrt;
        column = closestSqrt;

        while (row > 1 && column > 1 && row * column > squaresAmount && ((row - 1) * column >= squaresAmount)) {
            row--;
        }

        let vertexCount = (row + 1) * (column + 1);
        let vertexDataSize = WL.Mesh.VERTEX_FLOAT_SIZE;

        let vertexData = new Float32Array(vertexCount * vertexDataSize);

        for (let i = 0; i < row + 1; i++) {
            for (let j = 0; j < column + 1; j++) {
                let x = (2 / column) * j;
                let y = (2 / row) * i;

                let index = (i * (column + 1)) + j;

                vertexData[index * vertexDataSize + WL.Mesh.POS.X] = x - 1;
                vertexData[index * vertexDataSize + WL.Mesh.POS.Y] = y - 1;
                vertexData[index * vertexDataSize + WL.Mesh.POS.Z] = 0;

                vertexData[index * vertexDataSize + WL.Mesh.TEXCOORD.U] = x / 2;
                vertexData[index * vertexDataSize + WL.Mesh.TEXCOORD.V] = y / 2;

                vertexData[index * vertexDataSize + WL.Mesh.NORMAL.X] = 0;
                vertexData[index * vertexDataSize + WL.Mesh.NORMAL.Y] = 0;
                vertexData[index * vertexDataSize + WL.Mesh.NORMAL.Z] = 999;
            }
        }

        let realSquaresAmount = (row * column);
        let realTrianglesAmount = realSquaresAmount * 2;
        let indexData = new Uint32Array(realTrianglesAmount * 3);

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let startIndex = ((i * column) + j) * 6;

                indexData[startIndex] = (i * (column + 1)) + j;
                indexData[startIndex + 1] = (i * (column + 1)) + j + 1;
                indexData[startIndex + 2] = ((i + 1) * (column + 1)) + j;
                indexData[startIndex + 3] = ((i + 1) * (column + 1)) + j;
                indexData[startIndex + 4] = (i * (column + 1)) + j + 1;
                indexData[startIndex + 5] = ((i + 1) * (column + 1)) + j + 1;
            }
        }

        let mesh = new WL.Mesh({
            indexData: indexData,
            indexType: WL.MeshIndexType.UnsignedInt,
            vertexData: vertexData
        });

        return mesh;
    }
});