PP.GamepadCore = class GamepadCore {

    constructor(handedness, handPose) {
        this._myHandedness = handedness;
        this._myHandPose = handPose;
    }

    getHandedness() {
        return this._myHandedness;
    }

    getHandPose() {
        return this._myHandPose;
    }

    isGamepadCoreActive() {
        return true;
    }

    start() {

    }

    preUpdate(dt) {

    }

    postUpdate(dt) {

    }

    getButtonData(buttonID) {
        let buttonData = { pressed: false, touched: false, value: 0 };
        return buttonData;
    }

    getAxesData() {
        let axesData = [0.0, 0.0];
        return axesData;
    }

    getHapticActuators() {
        let hapticActuators = [];
        return hapticActuators;
    }
};