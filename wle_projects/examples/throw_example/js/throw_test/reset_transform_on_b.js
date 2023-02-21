WL.registerComponent("reset-transform-on-b", {
}, {
    start: function () {
        this._myPhysX = this.object.pp_getComponent("physx");
        this._myTransform = this.object.pp_getTransform();

        this._mySetKinematic = 0;
    },
    update(dt) {
        if (this._mySetKinematic == 0) {
            this._myPhysX.kinematic = false;
            this._mySetKinematic = -1;
        } else if (this._mySetKinematic > 0) {
            this._mySetKinematic--;
        }

        if (PP.myRightGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).isPressEnd()) {
            this._myPhysX.kinematic = true;
            this.object.pp_setTransform(this._myTransform);
            this._mySetKinematic = 1;
        }
    }
});