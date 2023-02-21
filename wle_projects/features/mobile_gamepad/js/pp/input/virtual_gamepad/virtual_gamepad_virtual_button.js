VirtualGamepadVirtualButton = class VirtualGamepadVirtualButton {
    constructor(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        this._myButtonElement = null;
        this._myButtonIcon = null;

        this._myIsActive = true;

        this._myTouchID = null;

        this._myIsPressed = false;

        this._myParams = virtualGamepadParams.myButtonParams[gamepadButtonHandedness][gamepadButtonID];

        this._build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex);

        this._myButtonElement.addEventListener("mousedown", this._onMouseDown.bind(this, virtualGamepadParams.myStopPropagatingMouseDownEvents));
        this._myButtonElement.addEventListener("touchstart", this._onMouseDown.bind(this, virtualGamepadParams.myStopPropagatingMouseDownEvents));
        document.body.addEventListener("mouseup", this._onMouseUp.bind(this));
        document.body.addEventListener("touchend", this._onMouseUp.bind(this));

        if (virtualGamepadParams.myReleaseOnMouseLeave) {
            document.body.addEventListener("mouseenter", this._onMouseUp.bind(this));
            document.body.addEventListener("mouseleave", this._onMouseUp.bind(this));
        }
    }

    isPressed() {
        return this._myIsActive && this._myIsPressed;
    }

    setActive(active) {
        this._myIsActive = active;
    }

    reset() {
        if (this._myIsPressed) {
            this._myButtonIcon.setPressed(false);

            this._myIsPressed = false;
            this._myTouchID = null;
        }
    }

    _onMouseDown(stopPropagatingMouseDownEvents, event) {
        if (!this._myIsActive) return;
        if (this._myIsPressed) return;

        if (stopPropagatingMouseDownEvents) {
            event.stopPropagation();
        }
        event.preventDefault();

        this._myButtonIcon.setPressed(true);

        // if this is a touch event, keep track of which one
        if (event.changedTouches != null && event.changedTouches.length > 0) {
            this._myTouchID = event.changedTouches[0].identifier;
        }

        this._myIsPressed = true;
    }

    _onMouseUp(event) {
        if (!this._myIsActive) return;
        if (!this._myIsPressed) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches != null && event.changedTouches.length > 0 && this._myTouchID != event.changedTouches[0].identifier) return;

        this.reset();
    }

    _build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex) {
        // setup variables used for the sizes and the like

        let buttonSize = virtualGamepadParams.myButtonSize * virtualGamepadParams.myInterfaceScale;
        let buttonsRingRadius = virtualGamepadParams.myButtonsRingRadius * virtualGamepadParams.myInterfaceScale;

        let thumbstickSize = virtualGamepadParams.myThumbstickSize * virtualGamepadParams.myInterfaceScale;

        let marginBottom = virtualGamepadParams.myMarginBottom * virtualGamepadParams.myInterfaceScale * virtualGamepadParams.myMarginScale;
        let marginLeft = virtualGamepadParams.myMarginLeft * virtualGamepadParams.myInterfaceScale * virtualGamepadParams.myMarginScale;
        let marginRight = virtualGamepadParams.myMarginRight * virtualGamepadParams.myInterfaceScale * virtualGamepadParams.myMarginScale;

        let buttonRingStartAngle = virtualGamepadParams.myButtonsRingStartAngle;
        let buttonRingEndAngle = virtualGamepadParams.myButtonsRingEndAngle;

        let minSizeMultiplier = Math.max(1, virtualGamepadParams.myMinSizeMultiplier / virtualGamepadParams.myInterfaceScale);

        let buttonsAmount = virtualGamepadParams.myButtonsOrder[PP.Handedness.LEFT].length;

        let angleStep = (buttonRingEndAngle - buttonRingStartAngle) / (buttonsAmount - 1);

        let currentAngle = Math.pp_angleClamp(buttonRingStartAngle + angleStep * virtualButtonIndex);

        if (virtualButtonHandedness == PP.Handedness.RIGHT) {
            currentAngle = 270 + (270 - currentAngle);
            currentAngle = Math.pp_angleClamp(currentAngle, true);
        }

        let counterAngle = 360 - currentAngle;

        // actual button creation

        let buttonPivot = document.createElement("div");
        buttonPivot.style.position = "absolute";
        buttonPivot.style.width = this._createSizeValue(buttonSize, minSizeMultiplier);
        buttonPivot.style.height = this._createSizeValue(buttonSize, minSizeMultiplier);

        let centerOnThumbstickBottom = marginBottom + thumbstickSize / 2 - buttonSize / 2;

        buttonPivot.style.bottom = this._createSizeValue(centerOnThumbstickBottom, minSizeMultiplier);

        if (virtualButtonHandedness == PP.Handedness.LEFT) {
            let centerOnThumbstickLeft = marginLeft + thumbstickSize / 2 - buttonSize / 2;
            buttonPivot.style.left = this._createSizeValue(centerOnThumbstickLeft, minSizeMultiplier);
        } else {
            let centerOnThumbstickRight = marginRight + thumbstickSize / 2 - buttonSize / 2;
            buttonPivot.style.right = this._createSizeValue(centerOnThumbstickRight, minSizeMultiplier);
        }

        buttonPivot.style.transform = "rotate(" + currentAngle + "deg) translateX(" + this._createSizeValue(buttonsRingRadius, minSizeMultiplier) + ")";
        buttonElementParent.appendChild(buttonPivot);

        this._myButtonElement = document.createElement("div");
        this._myButtonElement.style.position = "absolute";
        this._myButtonElement.style.width = "100%";
        this._myButtonElement.style.height = "100%";
        this._myButtonElement.style.transform = "rotate(" + counterAngle + "deg)";
        buttonPivot.appendChild(this._myButtonElement);

        this._myButtonIcon = new VirtualGamepadIcon(this._myButtonElement, this._myParams.myIconParams, minSizeMultiplier, virtualGamepadParams.myInterfaceScale);
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }
};