WL.registerComponent("virtual-gamepad", {
}, {
    start() {
        let params = new VirtualGamepadParams();
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconShape = VirtualGamepadIconShape.LABEL;
        params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myLabel = "T";

        params.myButtonsOrder[PP.Handedness.LEFT][2] = null;

        this._myVirtualGamepad = new VirtualGamepad(params);

        this._myVirtualGamepad.start();
    },
    update(dt) {
        this._myVirtualGamepad.update(dt);
    }
});