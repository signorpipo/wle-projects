VirtualGamepad = class VirtualGamepad {
    constructor(params = new VirtualGamepadParams()) {
        this._myParams = params;

        this._myVisible = false;
        this._myVirtualGamepadContainer = null;

        this._myVirtualGamepadVirtualButtons = [];
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT] = [];
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT] = [];

        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON] = null;

        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON] = null;
        this._myVirtualGamepadVirtualButtons[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON] = null;

        // Setup
        this._myButtonsAmount = 5;

        this._myThumbstickSize = 15;
        this._myThumbstickLeft = 3;
        this._myThumbstickRight = 3;
        this._myThumbstickBottom = 3;

        this._myButtonSize = 5;
        this._myButtonsRingRadius = 12;
        this._myButtonsRingStartAngle = 385;
        this._myButtonsRingEndAngle = 245;

        this._myFontSize = 2;

        this._myMinSizeMultiplier = 5 / 3;

        this.setVisible(true);
    }

    setVisible(visible) {
        if (this._myVisible != visible) {
            this._myVisible = visible;

            if (this._myVisible) {
                this._myVirtualGamepadContainer.style.display = "block";
            } else {
                this._myVirtualGamepadContainer.style.display = "none";
            }

            for (let handednessButtons of this._myVirtualGamepadVirtualButtons) {
                for (let button of handednessButtons) {
                    if (button != null) {
                        button.reset();
                    }
                }
            }
        }
    }

    isButtonPressed(handedness, gamepadButtonID) {
        let button = this._myVirtualGamepadVirtualButtons[handedness][gamepadButtonID];
        if (button != null) {
            return button.isPressed();
        }

        return false;
    }

    getAxes(handedness) {

    }

    start() {
        this._buildVirtualGamepad();

        for (let handednessButtons of this._myVirtualGamepadVirtualButtons) {
            for (let button of handednessButtons) {
                if (button != null) {
                    button.start();
                }
            }
        }
    }

    update(dt) {

    }

    _buildVirtualGamepad() {
        this._documentBodySetup();

        this._myVirtualGamepadContainer = document.createElement("div");
        this._myVirtualGamepadContainer.style.display = "block";
        this._myVirtualGamepadContainer.style.opacity = this._myParams.myOpacity.toString();
        document.body.appendChild(this._myVirtualGamepadContainer);

        let leftDiv = document.createElement("div");
        this._myVirtualGamepadContainer.appendChild(leftDiv);

        let rightDiv = document.createElement("div");
        this._myVirtualGamepadContainer.appendChild(rightDiv);

        for (let i = 0; i < this._myButtonsAmount; i++) {
            if (this._myParams.myButtonsOrder[PP.Handedness.LEFT][i] != null) {
                let gamepadButtonHandedness = this._myParams.myButtonsOrder[PP.Handedness.LEFT][i][0];
                let gamepadButtonID = this._myParams.myButtonsOrder[PP.Handedness.LEFT][i][1];
                this._buildButton(leftDiv, PP.Handedness.LEFT, i, gamepadButtonHandedness, gamepadButtonID);
            }

            if (this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i] != null) {
                let gamepadButtonHandedness = this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i][0];
                let gamepadButtonID = this._myParams.myButtonsOrder[PP.Handedness.RIGHT][i][1];
                this._buildButton(rightDiv, PP.Handedness.RIGHT, i, gamepadButtonHandedness, gamepadButtonID);
            }
        }
    }

    _documentBodySetup() {
        document.body.style.overflow = "hidden";
        document.body.style.userSelect = "none";
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
        document.body.style.webkitTapHighlightColor = "transparent";
        document.body.style.touchAction = "none";
    }

    _buildThumbstick() {
        let thumbstickSize = this._myThumbstickSize * this._myParams.myScaleMargin;

        let thumbstickBottom = this._myThumbstickBottom * this._myParams.myScaleMargin;
        let thumbstickLeft = this._myThumbstickLeft * this._myParams.myScaleMargin;
        let thumbstickRight = this._myThumbstickRight * this._myParams.myScaleMargin;

        let minSizeMultiplier = this._myMinSizeMultiplier * this._myParams.myScale;

        let fontSize = this._myFontSize * this._myParams.myScale * this._myParams.myScaleFont;

    }

    _buildButton(parent, virtualButtonHandedness, virtualButtonIndex, gamepadButtonHandedness, gamepadButtonID) {
        let buttonSize = this._myButtonSize * this._myParams.myScale;
        let buttonsRingRadius = this._myButtonsRingRadius * this._myParams.myScale;

        let thumbstickSize = this._myThumbstickSize * this._myParams.myScaleMargin;

        let thumbstickBottom = this._myThumbstickBottom * this._myParams.myScaleMargin;
        let thumbstickLeft = this._myThumbstickLeft * this._myParams.myScaleMargin;
        let thumbstickRight = this._myThumbstickRight * this._myParams.myScaleMargin;

        let buttonRingStartAngle = this._myButtonsRingStartAngle;
        let buttonRingEndAngle = this._myButtonsRingEndAngle;

        let minSizeMultiplier = this._myMinSizeMultiplier * this._myParams.myScale;

        let fontSize = this._myFontSize * this._myParams.myScale * this._myParams.myScaleFont;

        let buttonParams = this._myParams.myButtonParams[gamepadButtonHandedness][gamepadButtonID];

        let angleStep = (buttonRingEndAngle - buttonRingStartAngle) / (this._myButtonsAmount - 1);

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

        let centerOnThumbstickBottom = thumbstickBottom + thumbstickSize / 2 - buttonSize / 2;

        button.style.bottom = this._createSizeValue(centerOnThumbstickBottom, minSizeMultiplier);

        if (virtualButtonHandedness == PP.Handedness.LEFT) {
            let centerOnThumbstickLeft = thumbstickLeft + thumbstickSize / 2 - buttonSize / 2;
            button.style.left = this._createSizeValue(centerOnThumbstickLeft, minSizeMultiplier);
        } else {
            let centerOnThumbstickRight = thumbstickRight + thumbstickSize / 2 - buttonSize / 2;
            button.style.right = this._createSizeValue(centerOnThumbstickRight, minSizeMultiplier);
        }

        button.style.transform = "rotate(" + currentAngle + "deg) translateX(" + this._createSizeValue(buttonsRingRadius, minSizeMultiplier) + ")";
        parent.appendChild(button);

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
                buttonSVGIcon.style.fontFamily = this._myParams.myLabelFontFamily;
                buttonSVGIcon.style.fontWeight = this._myParams.myLabelFontWeight;
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

        let virtualGamepadVirtualButton = new VirtualGamepadVirtualButton(buttonSVG, buttonSVGBack, buttonSVGIcon);
        this._myVirtualGamepadVirtualButtons[gamepadButtonHandedness][gamepadButtonID] = virtualGamepadVirtualButton;
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }
};