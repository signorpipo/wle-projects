WL.registerComponent('spawn-physx-test', {
}, {
    start: function () {
        this._myRoot = WL.scene.addObject(this.object);

        this._myPhysXObject = WL.scene.addObject(this._myRoot);
        this._myPhysXObject.pp_translateObject([0, 0, -2]);
        this._myPhysX = this._myPhysXObject.pp_addComponent("physx", { "shape": WL.Shape.Sphere, "extents": [0.165, 0.165, 0.165] });

        /* this._myPhysX = physxObject.pp_addComponent("physx");
        this._myPhysX.extents = [0.165, 0.165, 0.165];
        this._myPhysX.shape = WL.Shape.Sphere; */

        console.log(this._myPhysX);

        this._myTimer = new PP.Timer(0);
        this._myTimer.update(this._myTimer.getDuration());
    },
    update: function (dt) {
        this._myTimer.update(dt);
        if (this._myTimer.isDone()) {
            this._myTimer.start();

            let rayHit = WL.physics.rayCast([0, 0, 0], [0, 0, -1], 255, 10000);

            let raycastParams = new PP.DebugRaycastParams();
            raycastParams.myOrigin = [0, 0, 0];
            raycastParams.myDirection = [0, 0, -1];
            raycastParams.myDistance = 10000;
            raycastParams.myRaycastResult = rayHit;
            PP.myDebugManager.draw(raycastParams);
        }
    },
});