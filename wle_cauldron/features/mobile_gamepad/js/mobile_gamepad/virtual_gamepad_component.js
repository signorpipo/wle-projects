WL.registerComponent("virtual-gamepad", {
    _myShowOnDesktopBrowser: { type: WL.Type.Bool, default: false },
    _myShowOnVRBrowser: { type: WL.Type.Bool, default: false },
    _myShowOnMobileBrowser: { type: WL.Type.Bool, default: true },
    _myReleaseOnMouseLeave: { type: WL.Type.Bool, default: false },
    _myIconColor: { type: WL.Type.String, default: "#e0e0e0" },
    _myBackColor: { type: WL.Type.String, default: "#616161" },
    _myInterfaceScale: { type: WL.Type.Float, default: 1 },
    _myMarginScale: { type: WL.Type.Float, default: 1 },

}, {
    start() {
        let params = new VirtualGamepadParams();
        params.defaultSetup();

        for (let handedness in params.myButtonParams) {
            for (let gamepadButtonID in params.myButtonParams[handedness]) {
                let buttonParams = params.myButtonParams[handedness][gamepadButtonID];
                buttonParams.myIconParams.myBackColor = this._myBackColor;
                buttonParams.myIconParams.myBackColorPressed = this._myIconColor;
                buttonParams.myIconParams.myIconColor = this._myIconColor;
                buttonParams.myIconParams.myIconColorPressed = this._myBackColor;
            }
        }

        for (let handedness in params.myThumbstickParams) {
            let thumbstickParams = params.myThumbstickParams[handedness];
            thumbstickParams.myBackColor = this._myBackColor;
            thumbstickParams.myIconParams.myBackColor = this._myIconColor;
            thumbstickParams.myIconParams.myBackColorPressed = this._myIconColor;
            thumbstickParams.myIconParams.myIconColor = this._myBackColor;
            thumbstickParams.myIconParams.myIconColorPressed = this._myBackColor;
        }

        params.myReleaseOnMouseLeave = this._myReleaseOnMouseLeave;
        params.myInterfaceScale = this._myInterfaceScale;
        params.myMarginScale = this._myMarginScale;

        params.myShowOnDesktopBrowser = this._myShowOnDesktopBrowser;
        params.myShowOnVRBrowser = this._myShowOnVRBrowser;
        params.myShowOnMobileBrowser = this._myShowOnMobileBrowser;

        if (params.myShowOnDesktopBrowser || params.myShowOnVRBrowser || params.myShowOnMobileBrowser) {
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