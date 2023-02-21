Global = {};

WL.registerComponent('skinned-mesh-edit-check', {
    _mySkinnedObject: { type: WL.Type.Object }
}, {
    init: function () {
    },
    start: function () {
        Global.mySkinnedObject = this._mySkinnedObject;

        this._myMeshesObject = WL.scene.addObject(this.object);
        this._myCurrentObject = this._mySkinnedObject;

        this._myMeshComponent = this._mySkinnedObject.pp_getComponentHierarchy("mesh");
        this._myMesh = this._myMeshComponent.mesh;
        this._myCurrentMeshObject = this._myMeshComponent.object;

        this._myAnimationComponent = this._mySkinnedObject.pp_getComponentHierarchy("animation");
        this._myAnimation = this._myAnimationComponent.animation;

        this._myTimer = new PP.Timer(2);
    },
    update: function (dt) {
        this._myTimer.update(dt);
        if (this._myTimer.isDone()) {
            this._myTimer.start();

            this._switchMeshObjectAttempt(dt);
        }
    },
    _originalObjectWithNewMeshAttempt(dt) {
        this._myMeshEdit = this._createMesh();
        this._myMeshComponent.mesh = this._myMeshEdit;
    },
    _originalObjectWithSameMeshAttempt(dt) {
        let vertexPositionAttribute = this._myMeshComponent.mesh.attribute(WL.MeshAttribute.Position);
        let vertexDataSize = WL.Mesh.VERTEX_FLOAT_SIZE;
        let vertexCount = this._myMesh.vertexData.length / vertexDataSize;
        let vertexOut = new Float32Array(3);
        for (let i = 0; i < vertexCount; i++) {
            vertexPositionAttribute.get(i, vertexOut);

            vertexOut[0] = vertexOut[0] + Math.pp_random(-0.01, 0.01);
            vertexOut[1] = vertexOut[1] + Math.pp_random(-0.01, 0.01);
            vertexOut[2] = vertexOut[2] + Math.pp_random(-0.01, 0.01);

            vertexPositionAttribute.set(i, vertexOut);
        }

        this._myMeshComponent.object.setDirty();
    },
    _cloneAttempt(dt) {
        this._myCurrentObject.pp_setActive(false);

        let cloneParams = new PP.CloneParams();
        cloneParams.myIgnoreComponents = true;
        let clonedObject = this._mySkinnedObject.pp_clone(cloneParams);
        clonedObject.pp_setParent(this._myMeshesObject);

        this._myCurrentObject = clonedObject;

        let children = this._myCurrentObject.pp_getChildren();

        this._myMeshEdit = this._createMesh();

        let mesh = children[0].pp_addComponent("mesh");
        mesh.skin = this._myMeshComponent.skin;
        mesh.material = this._myMeshComponent.material;
        mesh.mesh = this._myMeshEdit;

        let animation = children[1].pp_addComponent("animation");
        animation.animation = this._myAnimation;

        this._myCurrentObject.pp_setActive(true);
    },
    _switchMeshObjectAttempt(dt) {
        let meshObject = WL.scene.addObject(this._myCurrentMeshObject.parent);
        this._myCurrentMeshObject.pp_setActive(false);

        let mesh = meshObject.pp_addComponent("mesh");
        mesh.skin = this._myMeshComponent.skin;
        mesh.material = this._myMeshComponent.material;
        this._myMeshEdit = this._createMesh();
        mesh.mesh = this._myMeshEdit;

        this._myCurrentMeshObject = meshObject;
    },
    _createMesh() {
        let indexData = new Uint32Array(this._myMesh.indexData.length);
        for (let i = 0; i < this._myMesh.indexData.length; i++) {
            indexData[i] = this._myMesh.indexData[i];
        }

        let vertexData = new Float32Array(this._myMesh.vertexData.length);
        for (let i = 0; i < this._myMesh.vertexData.length; i++) {
            vertexData[i] = this._myMesh.vertexData[i];
        }

        let vertexDataSize = WL.Mesh.VERTEX_FLOAT_SIZE;
        let vertexCount = this._myMesh.vertexData.length / vertexDataSize;
        for (let i = 0; i < vertexCount; i++) {
            vertexData[i * vertexDataSize + WL.Mesh.POS.X] = vertexData[i * vertexDataSize + WL.Mesh.POS.X] + Math.pp_random(-0.01, 0.01);
            vertexData[i * vertexDataSize + WL.Mesh.POS.Y] = vertexData[i * vertexDataSize + WL.Mesh.POS.Y] + Math.pp_random(-0.01, 0.01);
            vertexData[i * vertexDataSize + WL.Mesh.POS.Z] = vertexData[i * vertexDataSize + WL.Mesh.POS.Z] + Math.pp_random(-0.01, 0.01);
        }

        let mesh = new WL.Mesh({
            indexData: indexData,
            indexType: WL.MeshIndexType.UnsignedInt,
            vertexData: vertexData
        });

        return mesh;
    }
});