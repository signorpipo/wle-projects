WL.registerComponent("virtual-gamepad", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabel = "T";
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabelFontSize = 2;

        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.IMAGE;
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageURL = "./image2.png";
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageBrightnessPressed = 0.5;

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