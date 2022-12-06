WL.registerComponent("virtual-gamepad", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabel = "T";
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabelFontSize = 2;

        params.myButtonsOrder[PP.Handedness.LEFT][2] = null;

        params.myReleaseOnMouseLeave = false;
        params.myScale = 1;
        params.myScaleLabelFont = 1;
        params.myScaleMargin = 1;

        this._myVirtualGamepad = new VirtualGamepad(params);

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});