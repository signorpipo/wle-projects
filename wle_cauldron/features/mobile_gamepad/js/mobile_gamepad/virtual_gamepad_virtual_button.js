VirtualGamepadVirtualButton = class VirtualGamepadVirtualButton {
    constructor(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        this._myButtonElement = null;
        this._myButtonBackElement = null;
        this._myButtonIconElement = null;

        this._myIsActive = true;

        this._myTouchID = null;

        this._myIsPressed = false;

        this._build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID);

        this._myButtonElement.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._myButtonElement.addEventListener("touchstart", this._onMouseDown.bind(this));
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

    _onMouseDown(event) {
        if (!this._myIsActive) return;
        if (this._myIsPressed) return;

        event.preventDefault();

        this._invertColors();

        // if this is a touch event, keep track of which one
        if (event.changedTouches) {
            this._myTouchID = event.changedTouches[0].identifier;
        }

        this._myIsPressed = true;
    }

    _onMouseUp(event) {
        if (!this._myIsActive) return;
        if (!this._myIsPressed) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches != null && event.changedTouches.length > 0 && this._myTouchID != event.changedTouches[0].identifier) return;

        this._invertColors();

        this._myIsPressed = false;
        this._myTouchID = null;
    }

    _invertColors() {
        let backFillBackup = this._myButtonBackElement.style.fill;
        if (this._myButtonIconElement.style.strokeWidth.length > 0) {
            this._myButtonBackElement.style.fill = this._myButtonIconElement.style.stroke;
            this._myButtonIconElement.style.fill = this._myButtonIconElement.style.stroke;
            this._myButtonIconElement.style.stroke = backFillBackup;
        } else {
            this._myButtonBackElement.style.fill = this._myButtonIconElement.style.fill;
            this._myButtonIconElement.style.fill = backFillBackup;
        }
    }

    _build(buttonElementParent, virtualGamepadParams, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        let buttonSize = virtualGamepadParams.myButtonSize * virtualGamepadParams.myScale;
        let buttonsRingRadius = virtualGamepadParams.myButtonsRingRadius * virtualGamepadParams.myScale;

        let thumbstickSize = virtualGamepadParams.myThumbstickSize * virtualGamepadParams.myScale;

        let marginBottom = virtualGamepadParams.myMarginBottom * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;
        let marginLeft = virtualGamepadParams.myMarginLeft * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;
        let marginRight = virtualGamepadParams.myMarginRight * virtualGamepadParams.myScale * virtualGamepadParams.myScaleMargin;

        let buttonRingStartAngle = virtualGamepadParams.myButtonsRingStartAngle;
        let buttonRingEndAngle = virtualGamepadParams.myButtonsRingEndAngle;

        let minSizeMultiplier = Math.max(1, virtualGamepadParams.myMinSizeMultiplier / virtualGamepadParams.myScale);

        let fontSize = virtualGamepadParams.myLabelFontSize * virtualGamepadParams.myScale * virtualGamepadParams.myScaleLabelFont;

        let buttonsAmount = virtualGamepadParams.myButtonsOrder[PP.Handedness.LEFT].length;

        let buttonParams = virtualGamepadParams.myButtonParams[gamepadButtonHandedness][gamepadButtonID];

        let angleStep = (buttonRingEndAngle - buttonRingStartAngle) / (buttonsAmount - 1);

        let currentAngle = Math.pp_angleClamp(buttonRingStartAngle + angleStep * virtualButtonIndex);

        if (virtualButtonHandedness == PP.Handedness.RIGHT) {
            currentAngle = 270 + (270 - currentAngle);
            currentAngle = Math.pp_angleClamp(currentAngle, true);
        }

        let counterAngle = 360 - currentAngle;

        let button = document.createElement("div");
        button.style.position = "absolute";
        button.style.width = this._createSizeValue(buttonSize, minSizeMultiplier);
        button.style.height = this._createSizeValue(buttonSize, minSizeMultiplier);

        let centerOnThumbstickBottom = marginBottom + thumbstickSize / 2 - buttonSize / 2;

        button.style.bottom = this._createSizeValue(centerOnThumbstickBottom, minSizeMultiplier);

        if (virtualButtonHandedness == PP.Handedness.LEFT) {
            let centerOnThumbstickLeft = marginLeft + thumbstickSize / 2 - buttonSize / 2;
            button.style.left = this._createSizeValue(centerOnThumbstickLeft, minSizeMultiplier);
        } else {
            let centerOnThumbstickRight = marginRight + thumbstickSize / 2 - buttonSize / 2;
            button.style.right = this._createSizeValue(centerOnThumbstickRight, minSizeMultiplier);
        }

        button.style.transform = "rotate(" + currentAngle + "deg) translateX(" + this._createSizeValue(buttonsRingRadius, minSizeMultiplier) + ")";
        buttonElementParent.appendChild(button);

        let buttonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        buttonSVG.style.position = "absolute";
        buttonSVG.style.width = "100%";
        buttonSVG.style.height = "100%";
        buttonSVG.style.transform = "rotate(" + counterAngle + "deg)";
        button.appendChild(buttonSVG);

        let buttonSVGBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        buttonSVGBack.setAttributeNS(null, 'cx', "50%");
        buttonSVGBack.setAttributeNS(null, 'cy', "50%");
        buttonSVGBack.setAttributeNS(null, 'r', "50%");
        buttonSVGBack.style.fill = buttonParams.myBackColor;
        buttonSVG.appendChild(buttonSVGBack);

        let buttonSVGIcon = null;
        switch (buttonParams.myIconShape) {
            case VirtualGamepadIconShape.NONE:
                break;
            case VirtualGamepadIconShape.LABEL:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                buttonSVGIcon.setAttributeNS(null, 'x', "50%");
                buttonSVGIcon.setAttributeNS(null, 'y', "50%");
                buttonSVGIcon.style.textAlign = "center";
                buttonSVGIcon.style.textAnchor = "middle";
                buttonSVGIcon.style.dominantBaseline = "central";
                buttonSVGIcon.style.alignmentBaseline = "central";
                buttonSVGIcon.style.fontFamily = virtualGamepadParams.myLabelFontFamily;
                buttonSVGIcon.style.fontWeight = virtualGamepadParams.myLabelFontWeight;
                buttonSVGIcon.style.fontSize = this._createSizeValue(fontSize, minSizeMultiplier);
                buttonSVGIcon.style.fill = buttonParams.myIconColor;
                buttonSVGIcon.textContent = buttonParams.myLabel;
                break;
            case VirtualGamepadIconShape.DOT:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                buttonSVGIcon.setAttributeNS(null, 'cx', "50%");
                buttonSVGIcon.setAttributeNS(null, 'cy', "50%");
                buttonSVGIcon.setAttributeNS(null, 'r', "17.5%");
                buttonSVGIcon.style.fill = buttonParams.myIconColor;
                break;
            case VirtualGamepadIconShape.CIRCLE:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                buttonSVGIcon.setAttributeNS(null, 'cx', "50%");
                buttonSVGIcon.setAttributeNS(null, 'cy', "50%");
                buttonSVGIcon.setAttributeNS(null, 'r', "24%");
                buttonSVGIcon.style.fill = buttonParams.myIconColor;
                break;
            case VirtualGamepadIconShape.SQUARE:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                buttonSVGIcon.setAttributeNS(null, 'x', "28.5%");
                buttonSVGIcon.setAttributeNS(null, 'y', "28.5%");
                buttonSVGIcon.setAttributeNS(null, 'rx', "10%");
                buttonSVGIcon.setAttributeNS(null, 'ry', "10%");
                buttonSVGIcon.setAttributeNS(null, 'width', "43%");
                buttonSVGIcon.setAttributeNS(null, 'height', "43%");
                buttonSVGIcon.style.fill = buttonParams.myIconColor;
                buttonSVGIcon.style.transformOrigin = "center";
                break;
            case VirtualGamepadIconShape.RING:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                buttonSVGIcon.setAttributeNS(null, 'cx', "50%");
                buttonSVGIcon.setAttributeNS(null, 'cy', "50%");
                buttonSVGIcon.setAttributeNS(null, 'r', "20%");
                buttonSVGIcon.style.fill = buttonParams.myBackColor;
                buttonSVGIcon.style.stroke = buttonParams.myIconColor;
                buttonSVGIcon.style.strokeWidth = "10%";
                break;
            case VirtualGamepadIconShape.FRAME:
                buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                buttonSVGIcon.setAttributeNS(null, 'x', "32%");
                buttonSVGIcon.setAttributeNS(null, 'y', "32%");
                buttonSVGIcon.setAttributeNS(null, 'rx', "10%");
                buttonSVGIcon.setAttributeNS(null, 'ry', "10%");
                buttonSVGIcon.setAttributeNS(null, 'width', "36%");
                buttonSVGIcon.setAttributeNS(null, 'height', "36%");
                buttonSVGIcon.style.fill = buttonParams.myBackColor;
                buttonSVGIcon.style.stroke = buttonParams.myIconColor;
                buttonSVGIcon.style.strokeWidth = "10%";
                buttonSVGIcon.style.transformOrigin = "center";
                break;
        }

        if (buttonSVGIcon != null) {
            buttonSVG.appendChild(buttonSVGIcon);
        }

        this._myButtonElement = buttonSVG;
        this._myButtonBackElement = buttonSVGBack;
        this._myButtonIconElement = buttonSVGIcon;
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }
};