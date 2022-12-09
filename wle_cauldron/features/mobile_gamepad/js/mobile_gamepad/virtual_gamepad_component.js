WL.registerComponent("virtual-gamepad", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.defaultSetup();

        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabel = "T";
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabelFontSize = 2;

        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.IMAGE;
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageURL = "./image2.png";
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageBrightnessPressed = 0.5;

        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myBackColorPressed = params.myThumbstickParams[PP.Handedness.RIGHT].myBackColor;
        params.myThumbstickParams[PP.Handedness.RIGHT].myBackColor = "#123123";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myIconShape = VirtualGamepadIconShape.IMAGE;
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImageURL = "./image2.png";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImageBrightnessPressed = 1.5;

        params.myButtonsOrder[PP.Handedness.LEFT][2] = null;

        params.myReleaseOnMouseLeave = false;
        params.myScaleInterface = 1;
        params.myScaleMargin = 1;

        params.myShowOnDesktopBrowser = false;
        params.myShowOnVRBrowser = true;
        params.myShowOnMobileBrowser = true;

        this._myVirtualGamepad = new VirtualGamepad(params);

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});