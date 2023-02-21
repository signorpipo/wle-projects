WL.registerComponent("virtual-gamepad-draft", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.defaultSetup();

        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconType = VirtualGamepadIconType.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabel = "T";
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myLabelFontSize = 2;

        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconType = VirtualGamepadIconType.IMAGE;
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImageURL = "./image2.png";
        params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myImagePressedBrightness = 0.5;

        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myBackgroundPressedColor = params.myThumbstickParams[PP.Handedness.RIGHT].myBackgroundColor;
        params.myThumbstickParams[PP.Handedness.RIGHT].myBackgroundColor = "#123123";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myIconType = VirtualGamepadIconType.IMAGE;
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImageURL = "./image2.png";
        params.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myImagePressedBrightness = 1.5;

        params.myButtonsOrder[PP.Handedness.LEFT][2] = null;

        params.myReleaseOnMouseLeave = false;
        params.myInterfaceScale = 1;
        params.myMarginScale = 1;

        params.myShowOnDesktop = false;
        params.myShowOnHeadset = true;
        params.myShowOnMobile = true;

        this._myVirtualGamepad = new VirtualGamepad(params);

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});