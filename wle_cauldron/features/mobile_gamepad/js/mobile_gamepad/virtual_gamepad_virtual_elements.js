VirtualGamepadVirtualButton = class VirtualGamepadVirtualButton {
    constructor(buttonElement, buttonBackElement, buttonIconElement) {
        this._myButtonElement = buttonElement;
        this._myButtonBackElement = buttonBackElement;
        this._myButtonIconElement = buttonIconElement;
    }

    start() {

    }

    isPressed() {
        return false;
    }
};