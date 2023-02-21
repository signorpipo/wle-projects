WL.registerComponent('far-near-change-runtime', {
}, {
    init() {

    },
    start() {
        this._myToggleActiveTimer = new PP.Timer(2);
        this._myViewComponents = this.object.pp_getComponentsHierarchy("view");
    },
    update(dt) {
        for (let viewComponent of this._myViewComponents) {
            //viewComponent.object.pp_setActive(true);
        }

        let leftAxes = PP.myLeftGamepad.getAxesInfo().getAxes();
        let rightAxes = PP.myRightGamepad.getAxesInfo().getAxes();

        let amount = 2;

        if (Math.abs(leftAxes[1]) > 0.3) {
            for (let viewComponent of this._myViewComponents) {
                viewComponent.far += amount * leftAxes[1] * dt;
            }
        }

        if (Math.abs(rightAxes[1]) > 0.3) {
            for (let viewComponent of this._myViewComponents) {
                viewComponent.near += amount * rightAxes[1] * dt;
            }
        }

        this._myToggleActiveTimer.update(dt);
        if (this._myToggleActiveTimer.isDone()) {
            this._myToggleActiveTimer.start();
            for (let viewComponent of this._myViewComponents) {
                //viewComponent.object.pp_setActive(false);
            }
        }

        //console.error(this._myViewComponents[0].far, this._myViewComponents[0].active);

        if (PP.XRUtils.isXRSessionActive()) {
            //WL.xrSession.depthFar = this._myViewComponents[0].far;
            //console.error(WL.xrSession.depthFar);
        }
    },
});