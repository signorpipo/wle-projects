WL.registerComponent("spector-test", {
    _myPlaneTriangles: { type: WL.Type.Int, default: 2 },
    _myPlaneMaterial: { type: WL.Type.Material },
}, {
    start() {
        this._myPlaneObject = WL.scene.addObject(this.object);

        let meshComponent = this._myPlaneObject.addComponent('mesh');
        meshComponent.mesh = this._createPlaneMesh(this._myPlaneTriangles);
        meshComponent.material = this._myPlaneMaterial.clone();

        let realTrianglesAmount = meshComponent.mesh.indexData.length / 3;
        console.error("Triangles:", realTrianglesAmount);
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