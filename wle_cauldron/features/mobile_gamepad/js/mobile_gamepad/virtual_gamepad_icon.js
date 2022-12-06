VirtualGamepadIconShape = {
    NONE: 0,
    LABEL: 1,
    DOT: 2,
    CIRCLE: 3,
    SQUARE: 4,
    RING: 5,
    FRAME: 6,
};

VirtualGamepadIconParams = class VirtualGamepadIconParams {
    constructor() {
        this.myBackColor = "";
        this.myIconColor = "";

        this.myIconShape = VirtualGamepadIconShape.NONE;

        // if icon shape is label

        this.myLabel = "";
        this.myLabelFontSize = 0;
        this.myLabelFontFamily = "";
        this.myLabelFontWeight = "";
    }
};

VirtualGamepadIcon = class VirtualGamepadIcon {
    constructor(iconElementParent, iconParams, minSizeMultiplier) {
        this._myParams = iconParams;

        this._myBackElement = null;
        this._myIconElement = null;

        this._myPressed = false;

        this._build(iconElementParent, minSizeMultiplier);
    }

    setPressed(pressed) {
        if (this._myPressed != pressed) {
            this._myPressed = pressed;

            if (this._myParams.myIconShape != VirtualGamepadIconShape.NONE) {
                if (this._myIconElement != null) {
                    this._invertColors();
                }
            }
        }
    }

    _build(iconElementParent, minSizeMultiplier) {
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
                this._myIconElement.style.fontSize = this._createSizeValue(this._myParams.myLabelFontSize, minSizeMultiplier);
                this._myIconElement.style.fill = this._myParams.myIconColor;
                this._myIconElement.textContent = this._myParams.myLabel;
                break;
            case VirtualGamepadIconShape.DOT:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "17.5%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                break;
            case VirtualGamepadIconShape.CIRCLE:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "24%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                break;
            case VirtualGamepadIconShape.SQUARE:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                this._myIconElement.setAttributeNS(null, 'x', "28.5%");
                this._myIconElement.setAttributeNS(null, 'y', "28.5%");
                this._myIconElement.setAttributeNS(null, 'rx', "10%");
                this._myIconElement.setAttributeNS(null, 'ry', "10%");
                this._myIconElement.setAttributeNS(null, 'width', "43%");
                this._myIconElement.setAttributeNS(null, 'height', "43%");
                this._myIconElement.style.fill = this._myParams.myIconColor;
                this._myIconElement.style.transformOrigin = "center";
                break;
            case VirtualGamepadIconShape.RING:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                this._myIconElement.setAttributeNS(null, 'cx', "50%");
                this._myIconElement.setAttributeNS(null, 'cy', "50%");
                this._myIconElement.setAttributeNS(null, 'r', "20%");
                this._myIconElement.style.fill = "#00000000";
                this._myIconElement.style.stroke = this._myParams.myIconColor;
                this._myIconElement.style.strokeWidth = "10%";
                break;
            case VirtualGamepadIconShape.FRAME:
                this._myIconElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                this._myIconElement.setAttributeNS(null, 'x', "32%");
                this._myIconElement.setAttributeNS(null, 'y', "32%");
                this._myIconElement.setAttributeNS(null, 'rx', "10%");
                this._myIconElement.setAttributeNS(null, 'ry', "10%");
                this._myIconElement.setAttributeNS(null, 'width', "36%");
                this._myIconElement.setAttributeNS(null, 'height', "36%");
                this._myIconElement.style.fill = "#00000000";
                this._myIconElement.style.stroke = this._myParams.myIconColor;
                this._myIconElement.style.strokeWidth = "10%";
                this._myIconElement.style.transformOrigin = "center";
                break;
        }

        if (this._myIconElement != null) {
            iconContainer.appendChild(this._myIconElement);
        }
    }

    _createSizeValue(value, minSizeMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minSizeMultiplier).toFixed(3) + "vw)";
    }

    _invertColors() {
        let backFillBackup = this._myBackElement.style.fill;
        if (this._myIconElement.style.strokeWidth.length > 0) {
            this._myBackElement.style.fill = this._myIconElement.style.stroke;
            this._myIconElement.style.fill = this._myIconElement.style.stroke;
            this._myIconElement.style.stroke = backFillBackup;
        } else {
            this._myBackElement.style.fill = this._myIconElement.style.fill;
            this._myIconElement.style.fill = backFillBackup;
        }
    }
}