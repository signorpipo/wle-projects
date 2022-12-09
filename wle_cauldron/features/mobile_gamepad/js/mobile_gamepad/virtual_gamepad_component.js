WL.registerComponent("virtual-gamepad", {
    _myShowOnDesktopBrowser: { type: WL.Type.Bool, default: false },
    _myShowOnMobileBrowser: { type: WL.Type.Bool, default: true },
    _myShowOnHeadset: { type: WL.Type.Bool, default: false },
    _myReleaseOnMouseLeave: { type: WL.Type.Bool, default: false },
    _myIconColor: { type: WL.Type.String, default: "#e0e0e0" },
    _myBackgroundColor: { type: WL.Type.String, default: "#616161" },
    _myInterfaceScale: { type: WL.Type.Float, default: 1 },
    _myMarginScale: { type: WL.Type.Float, default: 1 },
    //add params for specific buttons?

}, {
    start() {
        let params = new VirtualGamepadParams();
        params.defaultSetup();

        for (let handedness in params.myButtonParams) {
            for (let gamepadButtonID in params.myButtonParams[handedness]) {
                let buttonParams = params.myButtonParams[handedness][gamepadButtonID];
                buttonParams.myIconParams.myBackgroundColor = this._myBackgroundColor;
                buttonParams.myIconParams.myBackgroundColorPressed = this._myIconColor;
                buttonParams.myIconParams.myIconColor = this._myIconColor;
                buttonParams.myIconParams.myIconColorPressed = this._myBackgroundColor;
            }
        }

        for (let handedness in params.myThumbstickParams) {
            let thumbstickParams = params.myThumbstickParams[handedness];
            thumbstickParams.myBackgroundColor = this._myBackgroundColor;
            thumbstickParams.myIconParams.myBackgroundColor = this._myIconColor;
            thumbstickParams.myIconParams.myBackgroundColorPressed = this._myIconColor;
            thumbstickParams.myIconParams.myIconColor = this._myBackgroundColor;
            thumbstickParams.myIconParams.myIconColorPressed = this._myBackgroundColor;
        }

        params.myReleaseOnMouseLeave = this._myReleaseOnMouseLeave;
        params.myInterfaceScale = this._myInterfaceScale;
        params.myMarginScale = this._myMarginScale;

        params.myShowOnDesktopBrowser = this._myShowOnDesktopBrowser;
        params.myShowOnMobileBrowser = this._myShowOnMobileBrowser;
        params.myShowOnHeadset = this._myShowOnHeadset;

        if (params.myShowOnDesktopBrowser || params.myShowOnMobileBrowser || params.myShowOnHeadset) {
            params.myAutoUpdateVisibility = true;
        } else {
            params.myAutoUpdateVisibility = false;
        }

        this._myVirtualGamepad = new VirtualGamepad(params);
        if (!params.myAutoUpdateVisibility) {
            this._myVirtualGamepad.setVisible(false);
        }

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});