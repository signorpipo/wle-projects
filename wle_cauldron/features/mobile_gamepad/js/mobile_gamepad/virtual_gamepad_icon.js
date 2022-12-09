VirtualGamepadIconShape = {
    NONE: 0,
    LABEL: 1,
    IMAGE: 2,
    DOT: 3,
    CIRCLE: 4,
    SQUARE: 5,
    RING: 6,
    FRAME: 7,
};

VirtualGamepadIconParams = class VirtualGamepadIconParams {
    constructor() {
        this.myBackColor = "";
        this.myBackColorPressed = "";
        this.myIconColor = "";
        this.myIconColorPressed = "";

        this.myIconShape = VirtualGamepadIconShape.NONE;

        // if icon shape is label

        this.myLabel = "";
        this.myLabelFontSize = 0;
        this.myLabelFontFamily = "";
        this.myLabelFontWeight = "";

        // if icon shape is image

        this.myImageURL = "";
        this.myImageBrightnessPressed = 1;
    }
};

VirtualGamepadIcon = class VirtualGamepadIcon {
    constructor(iconElementParent, iconParams, minSizeMultiplier, scale) {
        this._myParams = iconParams;

        this._myBackElement = null;
        this._myIconElement = null;

        this._myPressed = false;

        this._build(iconElementParent, minSizeMultiplier, scale);
    }

    setPressed(pressed) {
        if (this._myPressed != pressed) {
            this._myPressed = pressed;

            if (this._myParams.myIconShape != VirtualGamepadIconShape.NONE) {
                if (this._myIconElement != null) {
                    if (this._myPressed) {
                        this._myBackElement.style.fill = this._myParams.myBackColorPressed;
                        if (this._myIconElement.style.strokeWidth.length > 0) {
                            this._myIconElement.style.stroke = this._myParams.myIconColorPressed;
                        } else {
                            this._myIconElement.style.fill = this._myParams.myIconColorPressed;
                        }

                        if (this._myParams.myIconShape == VirtualGamepadIconShape.IMAGE) {
                            this._myIconElement.style.filter = "brightness(" + this._myParams.myImageBrightnessPressed + ")";
                        }
                    } else {
                        this._myBackElement.style.fill = this._myParams.myBackColor;
                        if (this._myIconElement.style.strokeWidth.length > 0) {
                            this._myIconElement.style.stroke = this._myParams.myIconColor;
                        } else {
                            this._myIconElement.style.fill = this._myParams.myIconColor;
                        }

                        if (this._myParams.myIconShape == VirtualGamepadIconShape.IMAGE) {
                            this._myIconElement.style.filter = "none";
                        }
                    }
                }
            }
        }
    }

    _build(iconElementParent, minSizeMultiplier, scale) {
        let iconContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        iconContainer.style.position = "absolute";
        iconContainer.style.width = "100%";
        iconContainer.style.height = "100%";
        iconElementParent.appendChild(iconContainer);

        this._myBackElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._myBackElement.setAttributeNS(null, 'cx', "50%");
        this._myBackElement.setAttributeNS(null, 'cy', "50%");
        this._myBackElement.setAttributeNS(null, 'r', "50%");
        this._myBackElement.style.fill = this._myParams.myBackColor;
        iconContainer.appendChild(this._myBackElement);

        switch (this._myParams.myIconShape) {
            case VirtualGamepadIconShape.NONE:
                break;
            case VirtualGamepadIconShape.LABEL:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                this._myIconElement.setAttributeNS(null, 'x', "50%");
                this._myIconElement.setAttributeNS(null, 'y', "50%");
                this._myIconElement.style.textAlign = "center";
                this._myIconElement.style.textAnchor = "middle";
                this._myIconElement.style.dominantBaseline = "central";
                this._myIconElement.style.alignmentBaseline = "central";
                this._myIconElement.style.fontFamily = this._myParams.myLabelFontFamily;
                this._myIconElement.style.fontWeight = this._myParams.myLabelFontWeight;
                this._myIconElement.style.fontSize = this._createSizeValue(this._myParams.myLabelFontSize * scale, minSizeMultiplier);
                this._myIconElement.style.fill = this._myParams.myIconColor;
                this._myIconElement.textContent = this._myParams.myLabel;
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.IMAGE:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
                this._myIconElement.setAttributeNS(null, 'x', "0%");
                this._myIconElement.setAttributeNS(null, 'y', "0%");
                this._myIconElement.setAttribute("href", this._myParams.myImageURL);
                this._myIconElement.style.width = "100%";
                this._myIconElement.style.height = "100%";
                this._myIconElement.style.filter = "none";
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.DOT:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "17.5%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.CIRCLE:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "24%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.SQUARE:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                this._myIconElement.setAttributeNS(null, 'x', "28%");
                this._myIconElement.setAttributeNS(null, 'y', "28%");
                this._myIconElement.setAttributeNS(null, 'rx', "10%");
                this._myIconElement.setAttributeNS(null, 'ry', "10%");
                this._myIconElement.setAttributeNS(null, 'width', "44%");
                this._myIconElement.setAttributeNS(null, 'height', "44%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                this._myIconElement.style.transformOrigin = "center";
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.RING:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "20%");
                this._myIconElement.style.fill = "#00000000";
                this._myIconElement.style.stroke = this._myParams.myIconColor;
                this._myIconElement.style.strokeWidth = "10%";
                iconContainer.appendChild(this._myIconElement);
                break;
            case VirtualGamepadIconShape.FRAME:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                this._myIconElement.setAttributeNS(null, 'x', "31.5%");
                this._myIconElement.setAttributeNS(null, 'y', "31.5%");
                this._myIconElement.setAttributeNS(null, 'rx', "10%");
                this._myIconElement.setAttributeNS(null, 'ry', "10%");
                this._myIconElement.setAttributeNS(null, 'width', "37%");
                this._myIconElement.setAttributeNS(null, 'height', "37%");
                this._myIconElement.style.fill = "#00000000";
                this._myIconElement.style.stroke = this._myParams.myIconColor;
                this._myIconElement.style.strokeWidth = "10%";
                this._myIconElement.style.transformOrigin = "center";
                iconContainer.appendChild(this._myIconElement);
                break;
        }
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }

    _invertColors() {
        if (this._myIconElement.style.strokeWidth.length > 0) {
            this._myBackElement.style.fill = this._myParams.myIconColor;
            this._myIconElement.style.fill = this._myParams.myIconColor;
            this._myIconElement.style.stroke = this._myParams.myBackColor;
        } else {
            this._myBackElement.style.fill = this._myParams.myIconColor;
            this._myIconElement.style.fill = this._myParams.myBackColor;
        }
    }
}