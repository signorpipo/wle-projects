WL.registerComponent("mobile-gamepad-draft-1", {
    speed: { type: WL.Type.Float, default: 1 },
    rotationSpeed: { type: WL.Type.Float, default: -180 },
    restrictY: { type: WL.Type.Bool, default: false },
}, {
    start() {
        this.htmlElementSizeSetup = new HTMLElementSizeSetup();

        this.setupHtml();
        this.createHtmlButtons();
        this.createHtmlThumbsticks();

        this.createButtonsController();
        this.createThumbsticksController();

        test = virtualGamepad;
    },
    update(dt) {
        if (this.thumbstickLeft == null) return;

        let direction = [0, 0, 0];

        // movement controls
        if (this.thumbstickLeft.x != null) direction[0] += this.thumbstickLeft.x;
        if (this.thumbstickLeft.y != null) direction[2] += this.thumbstickLeft.y;

        // horizontal view controls
        if (this.thumbstickRight.x != null) {
            PP.myPlayerObjects.myPlayer.pp_rotateAxisObject(this.rotationSpeed * this.thumbstickRight.x * dt, [0, 1, 0]);
        }

        direction.vec3_transformQuat(PP.myPlayerObjects.myNonVRCamera.pp_getTransformWorldQuat(), direction);
        if (this.restrictY) {
            direction[1] = 0; // y restricts
        }
        direction.vec3_normalize(direction);

        direction[0] *= this.speed * dt;
        direction[2] *= this.speed * dt;
        PP.myPlayerObjects.myPlayer.pp_translate(direction);
    },
    createButtonsController() {
        this.selectLeft = new ButtonController("selectLeft", "selectLeftBack", "selectLeftIcon");
        this.squeezeLeft = new ButtonController("squeezeLeft", "squeezeLeftBack", "squeezeLeftIcon");
        this.topButtonLeft = new ButtonController("topButtonLeft", "topButtonLeftBack", "topButtonLeftIcon");
        this.bottomButtonLeft = new ButtonController("bottomButtonLeft", "bottomButtonLeftBack", "bottomButtonLeftIcon");
        this.selectButtonLeft = new ButtonController("thumbstickButtonLeft", "thumbstickButtonLeftBack", "thumbstickButtonLeftIcon");

        this.selectRight = new ButtonController("selectRight", "selectRightBack", "selectRightIcon");
        this.squeezeRight = new ButtonController("squeezeRight", "squeezeRightBack", "squeezeRightIcon");
        this.topButtonRight = new ButtonController("topButtonRight", "topButtonRightBack", "topButtonRightIcon");
        this.bottomButtonRight = new ButtonController("bottomButtonRight", "bottomButtonRightBack", "bottomButtonRightIcon");
        this.selectButtonRight = new ButtonController("thumbstickButtonRight", "thumbstickButtonRightBack", "thumbstickButtonRightIcon");

        this.thumbstickLeft = new ThumbstickController("thumbstickLeft", "thumbstickLeftStick", 0.5, 0, 0.1, 0);
        this.thumbstickRight = new ThumbstickController("thumbstickRight", "thumbstickRightStick", 0.5, 0, 0.1, 0);
    },
    createThumbsticksController() {
        this.thumbstickLeft = new ThumbstickController("thumbstickLeft", "thumbstickLeftStick", 0.5, 0, 0.1, 0);
        this.thumbstickRight = new ThumbstickController("thumbstickRight", "thumbstickRightStick", 0.5, 0, 0.1, 0);
    },
    setupHtml() {
        document.body.style.overflow = "hidden";
        document.body.style.userSelect = "none";
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
        document.body.style.webkitTapHighlightColor = "transparent";
        document.body.style.touchAction = "none";

        let virtualGamepad = document.createElement("div"); // container
        virtualGamepad.id = "virtualGamepad";
        virtualGamepad.style.opacity = "0.5";
        document.body.appendChild(virtualGamepad);
    },
    createHtmlThumbsticks() {
        this.createThumbstickWithSetup("thumbstickLeft", true);
        this.createThumbstickWithSetup("thumbstickRight", false);
    },
    createThumbstickWithSetup(id, isLeft) {
        let virtualGamepad = document.getElementById("virtualGamepad");

        let thumbstick = document.createElement("div");
        thumbstick.id = id;
        thumbstick.style.position = "absolute";
        thumbstick.style.width = this.createSizeValue(this.htmlElementSizeSetup.thumbstickSize, this.htmlElementSizeSetup.minMultiplier);
        thumbstick.style.height = this.createSizeValue(this.htmlElementSizeSetup.thumbstickSize, this.htmlElementSizeSetup.minMultiplier);
        thumbstick.style.bottom = this.createSizeValue(this.htmlElementSizeSetup.thumbstickBottom, this.htmlElementSizeSetup.minMultiplier);

        if (isLeft) {
            thumbstick.style.left = this.createSizeValue(this.htmlElementSizeSetup.thumbstickLeft, this.htmlElementSizeSetup.minMultiplier);
        } else {
            thumbstick.style.right = this.createSizeValue(this.htmlElementSizeSetup.thumbstickRight, this.htmlElementSizeSetup.minMultiplier);
        }

        virtualGamepad.appendChild(thumbstick);

        let thumbstickBackSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        thumbstickBackSVG.style.position = "absolute";
        thumbstickBackSVG.style.width = "100%";
        thumbstickBackSVG.style.height = "100%";
        thumbstick.appendChild(thumbstickBackSVG);

        let thumbstickBackVisual = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        thumbstickBackVisual.setAttributeNS(null, 'cx', "50%");
        thumbstickBackVisual.setAttributeNS(null, 'cy', "50%");
        thumbstickBackVisual.setAttributeNS(null, 'r', "48%");
        thumbstickBackVisual.style.fill = this.htmlElementSizeSetup.backColor;
        thumbstickBackSVG.appendChild(thumbstickBackVisual);

        // avoid making them clickable
        thumbstickBackVisual.addEventListener("mousedown", (event) => { event.preventDefault() });
        thumbstickBackVisual.addEventListener("touchstart", (event) => { event.preventDefault() });

        let thumbstickStick = document.createElement("div");
        thumbstickStick.id = id + "Stick";
        thumbstickStick.style.position = "absolute";
        thumbstickStick.style.width = "100%";
        thumbstickStick.style.height = "100%";
        thumbstick.appendChild(thumbstickStick);

        let thumbstickStickSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        thumbstickStickSVG.style.position = "absolute";
        thumbstickStickSVG.style.width = "100%";
        thumbstickStickSVG.style.height = "100%";
        thumbstickStick.appendChild(thumbstickStickSVG);

        let thumbstickStickVisual = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        //thumbstickStickVisual.style.position = "absolute";
        thumbstickStickVisual.setAttributeNS(null, 'cx', "50%");
        thumbstickStickVisual.setAttributeNS(null, 'cy', "50%");
        thumbstickStickVisual.setAttributeNS(null, 'r', "17%");
        thumbstickStickVisual.style.fill = this.htmlElementSizeSetup.iconColor;
        thumbstickStickSVG.appendChild(thumbstickStickVisual);
    },
    createHtmlButtons() {
        let buttonSetups = [];
        buttonSetups.push(new ButtonSetup("thumbstickButton", "Th", 1));
        buttonSetups.push(new ButtonSetup("bottomButton", "Bo", 2));
        buttonSetups.push(new ButtonSetup("topButton", "To", 3));
        buttonSetups.push(new ButtonSetup("squeeze", "Sq", 4));
        buttonSetups.push(new ButtonSetup("select", "Se", 5));

        let minAngle = 245;
        let maxAngle = 385;
        let currentAngle = minAngle;
        let angleStep = (maxAngle - minAngle) / (buttonSetups.length - 1);
        for (let setup of buttonSetups) {
            this.createButtonWithSetup(setup, currentAngle, true);
            this.createButtonWithSetup(setup, currentAngle, false);
            currentAngle += angleStep;
        }
    },
    createButtonWithSetup(setup, angle, isLeft) {
        let fixedAngle = Math.pp_angleClamp(angle, true);

        if (!isLeft) {
            fixedAngle = 270 + (270 - fixedAngle);
            fixedAngle = Math.pp_angleClamp(fixedAngle, true);
        }

        let counterAngle = 360 - fixedAngle;

        let buttonID = setup.myID + (isLeft ? "Left" : "Right");

        let virtualGamepad = document.getElementById("virtualGamepad");

        let button = document.createElement("div");
        button.style.position = "absolute";
        button.style.width = this.createSizeValue(this.htmlElementSizeSetup.buttonSize, this.htmlElementSizeSetup.minMultiplier);
        button.style.height = this.createSizeValue(this.htmlElementSizeSetup.buttonSize, this.htmlElementSizeSetup.minMultiplier);

        let centerOnThumbstickBottom =
            this.htmlElementSizeSetup.thumbstickBottom +
            this.htmlElementSizeSetup.thumbstickSize / 2 -
            this.htmlElementSizeSetup.buttonSize / 2;

        button.style.bottom = this.createSizeValue(centerOnThumbstickBottom, this.htmlElementSizeSetup.minMultiplier);

        if (isLeft) {
            let centerOnThumbstickLeft =
                this.htmlElementSizeSetup.thumbstickLeft +
                this.htmlElementSizeSetup.thumbstickSize / 2 -
                this.htmlElementSizeSetup.buttonSize / 2;
            button.style.left = this.createSizeValue(centerOnThumbstickLeft, this.htmlElementSizeSetup.minMultiplier);
        } else {
            let centerOnThumbstickRight =
                this.htmlElementSizeSetup.thumbstickRight +
                this.htmlElementSizeSetup.thumbstickSize / 2 -
                this.htmlElementSizeSetup.buttonSize / 2;
            button.style.right = this.createSizeValue(centerOnThumbstickRight, this.htmlElementSizeSetup.minMultiplier);
        }
        button.style.transform = "rotate(" + fixedAngle + "deg) translateX(" + this.createSizeValue(this.htmlElementSizeSetup.buttonTranslate, this.htmlElementSizeSetup.minMultiplier) + ")";
        virtualGamepad.appendChild(button);

        let buttonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        buttonSVG.id = buttonID;
        buttonSVG.style.position = "absolute";
        buttonSVG.style.width = "100%";
        buttonSVG.style.height = "100%";
        buttonSVG.style.transform = "rotate(" + counterAngle + "deg)";
        button.appendChild(buttonSVG);

        let buttonSVGBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        buttonSVGBack.id = buttonID + "Back";
        buttonSVGBack.setAttributeNS(null, 'cx', "50%");
        buttonSVGBack.setAttributeNS(null, 'cy', "50%");
        buttonSVGBack.setAttributeNS(null, 'r', "50%");
        buttonSVGBack.style.fill = this.htmlElementSizeSetup.backColor;
        buttonSVG.appendChild(buttonSVGBack);

        if (setup.myShapeIndex == null) {
            let buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            buttonSVGIcon.id = buttonID + "Icon";
            buttonSVGIcon.setAttributeNS(null, 'x', "50%");
            buttonSVGIcon.setAttributeNS(null, 'y', "50%");
            buttonSVGIcon.style.fill = this.htmlElementSizeSetup.iconColor;
            buttonSVGIcon.style.textAlign = "center";
            buttonSVGIcon.style.textAnchor = "middle";
            buttonSVGIcon.style.dominantBaseline = "central";
            buttonSVGIcon.style.alignmentBaseline = "central";
            buttonSVGIcon.style.fontFamily = "sans-serif";
            buttonSVGIcon.style.fontSize = this.createSizeValue(this.htmlElementSizeSetup.fontSize, this.htmlElementSizeSetup.minMultiplier);
            buttonSVGIcon.style.fontWeight = "bold";
            buttonSVGIcon.textContent = setup.myIcon;
            buttonSVG.appendChild(buttonSVGIcon);
        } else {
            let buttonSVGIcon = null;
            switch (setup.myShapeIndex) {
                case 1:
                    buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                    buttonSVGIcon.setAttributeNS(null, 'x', "28%");
                    buttonSVGIcon.setAttributeNS(null, 'y', "28%");
                    buttonSVGIcon.setAttributeNS(null, 'rx', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'ry', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'width', "44%");
                    buttonSVGIcon.setAttributeNS(null, 'height', "44%");
                    buttonSVGIcon.style.fill = this.htmlElementSizeSetup.iconColor;
                    break;
                case 2:
                    buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                    buttonSVGIcon.setAttributeNS(null, 'cx', "50%");
                    buttonSVGIcon.setAttributeNS(null, 'cy', "50%");
                    buttonSVGIcon.setAttributeNS(null, 'r', "20%");
                    buttonSVGIcon.style.fill = this.htmlElementSizeSetup.backColor;
                    buttonSVGIcon.style.stroke = this.htmlElementSizeSetup.iconColor;
                    buttonSVGIcon.style.strokeWidth = "10%";
                    break;
                case 3:
                    buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                    buttonSVGIcon.setAttributeNS(null, 'cx', "50%");
                    buttonSVGIcon.setAttributeNS(null, 'cy', "50%");
                    buttonSVGIcon.setAttributeNS(null, 'r', "25%");
                    buttonSVGIcon.style.fill = this.htmlElementSizeSetup.iconColor;
                    break;
                case 4:
                    buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                    buttonSVGIcon.setAttributeNS(null, 'x', "32%");
                    buttonSVGIcon.setAttributeNS(null, 'y', "32%");
                    buttonSVGIcon.setAttributeNS(null, 'rx', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'ry', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'width', "36%");
                    buttonSVGIcon.setAttributeNS(null, 'height', "36%");
                    buttonSVGIcon.style.fill = this.htmlElementSizeSetup.backColor;
                    buttonSVGIcon.style.stroke = this.htmlElementSizeSetup.iconColor;
                    buttonSVGIcon.style.strokeWidth = "10%";
                    buttonSVGIcon.style.transformOrigin = "center";
                    buttonSVGIcon.style.transform = "rotate(45deg)";
                    break;
                case 5:
                    buttonSVGIcon = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                    buttonSVGIcon.setAttributeNS(null, 'x', "28%");
                    buttonSVGIcon.setAttributeNS(null, 'y', "28%");
                    buttonSVGIcon.setAttributeNS(null, 'rx', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'ry', "10%");
                    buttonSVGIcon.setAttributeNS(null, 'width', "44%");
                    buttonSVGIcon.setAttributeNS(null, 'height', "44%");
                    buttonSVGIcon.style.fill = this.htmlElementSizeSetup.iconColor;
                    buttonSVGIcon.style.transformOrigin = "center";
                    buttonSVGIcon.style.transform = "rotate(45deg)";
                    break;
            }

            buttonSVGIcon.id = buttonID + "Icon";
            buttonSVG.appendChild(buttonSVGIcon);
        }
    },

    createSizeValue(value, minMultiplier) {
        return "min(" + value.toFixed(3) + "vmax," + (value * minMultiplier).toFixed(3) + "vw)";
    }
});

class HTMLElementSizeSetup {
    constructor() {
        this.minMultiplier = 5 / 3;

        this.thumbstickSize = 15;
        this.thumbstickLeft = 3;
        this.thumbstickRight = 3;
        this.thumbstickBottom = 3;

        this.buttonSize = 5;
        this.buttonTranslate = 12;

        this.fontSize = 2;

        this.backColor = "#616161";
        this.iconColor = "#e0e0e0";
    }
}

class ButtonSetup {
    constructor(id, label, shapeIndex = null) {
        this.myID = id;
        this.myLabel = label;
        this.myShapeIndex = shapeIndex;
    }
}

class ButtonController {
    constructor(buttonID, backID, iconID) {
        this.button = document.getElementById(buttonID);
        this.back = document.getElementById(backID);
        this.icon = document.getElementById(iconID);

        // track touch identifier to remember which one moved the stick
        this.touchId = null;

        this.pressed = false;

        this.button.addEventListener("mousedown", this.handleDown.bind(this));
        this.button.addEventListener("touchstart", this.handleDown.bind(this));
        document.body.addEventListener("mouseup", this.handleUp.bind(this));
        document.body.addEventListener("touchend", this.handleUp.bind(this));

        // could be optional
        //document.body.addEventListener("mouseenter", handleUp);
        //document.body.addEventListener("mouseleave", handleUp);
    }

    handleDown(event) {
        if (this.pressed) return;

        event.preventDefault();

        let backFillBackup = this.back.style.fill;
        if (this.icon.style.strokeWidth.length > 0) {
            this.back.style.fill = this.icon.style.stroke;
            this.icon.style.fill = this.icon.style.stroke;
            this.icon.style.stroke = backFillBackup;
        } else {
            this.back.style.fill = this.icon.style.fill;
            this.icon.style.fill = backFillBackup;
        }

        // if this is a touch event, keep track of which one
        if (event.changedTouches) {
            this.touchId = event.changedTouches[0].identifier;
        }

        this.pressed = true;
    }

    handleUp(event) {
        if (!this.pressed) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches != null && event.changedTouches.length > 0 && this.touchId != event.changedTouches[0].identifier) return;

        let backFillBackup = this.back.style.fill;
        if (this.icon.style.strokeWidth.length > 0) {
            this.back.style.fill = this.icon.style.stroke;
            this.icon.style.fill = this.icon.style.stroke;
            this.icon.style.stroke = backFillBackup;
        } else {
            this.back.style.fill = this.icon.style.fill;
            this.icon.style.fill = backFillBackup;
        }

        this.pressed = false;
    }
}

class ThumbstickController {
    constructor(stickContainerID, stickID, maxDistancePercentage, maxDistanceMinValue, deadzonePercentage, deadzoneMinValue) {
        this.id = stickID;

        this.stick = document.getElementById(stickID);

        this.stickContainer = document.getElementById(stickContainerID);

        // location from which drag begins, used to calculate offsets
        this.dragStart = null;

        // track touch identifier to remember which one moved the stick
        this.touchId = null;

        this.active = false;
        this.value = { x: 0, y: 0 };

        this.maxDistancePercentage = maxDistancePercentage;
        this.maxDistanceMinValue = maxDistanceMinValue;
        this.deadzonePercentage = deadzonePercentage;
        this.deadzoneMinValue = deadzoneMinValue;

        this.stick.addEventListener("mousedown", this.handleDown.bind(this));
        this.stick.addEventListener("touchstart", this.handleDown.bind(this));
        document.body.addEventListener("mousemove", this.handleMove.bind(this), {
            passive: false,
        });
        document.body.addEventListener("touchmove", this.handleMove.bind(this), {
            passive: false,
        });
        document.body.addEventListener("mouseup", this.handleUp.bind(this));
        document.body.addEventListener("touchend", this.handleUp.bind(this));

        // could be optional
        //document.body.addEventListener("mouseenter", handleUp);
        //document.body.addEventListener("mouseleave", handleUp);
    }

    handleDown(event) {
        this.active = true;

        // all drag movements are instantaneous
        this.stick.style.transition = "0s";

        // touch event fired before mouse event; prevent redundant mouse event from firing
        event.preventDefault();

        if (event.changedTouches)
            this.dragStart = {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
        else this.dragStart = { x: event.clientX, y: event.clientY };

        // if this is a touch event, keep track of which one
        if (event.changedTouches) this.touchId = event.changedTouches[0].identifier;
    }

    handleMove(event) {
        if (!this.active) return;

        // if this is a touch event, make sure it is the right one
        // also handle multiple simultaneous touchmove events
        let touchmoveId = null;
        if (event.changedTouches) {
            for (let i = 0; i < event.changedTouches.length; i++) {
                if (this.touchId == event.changedTouches[i].identifier) {
                    touchmoveId = i;
                    event.clientX = event.changedTouches[i].clientX;
                    event.clientY = event.changedTouches[i].clientY;
                }
            }

            if (touchmoveId == null) return;
        }

        let bounds = this.stickContainer.getBoundingClientRect();
        let maxDistance = 0;
        maxDistance = Math.max(this.maxDistanceMinValue, bounds.width * this.maxDistancePercentage);

        const xDiff = event.clientX - this.dragStart.x;
        const yDiff = event.clientY - this.dragStart.y;
        const angle = Math.atan2(yDiff, xDiff);
        const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
        const xPosition = distance * Math.cos(angle);
        const yPosition = distance * Math.sin(angle);

        // move stick image to new position
        this.stick.style.transition = "0.05s";
        this.stick.style.transform = `translate(${xPosition}px, ${yPosition}px)`;

        // deadzone adjustment

        let deadzone = 0;
        deadzone = Math.max(this.deadzoneMinValue, bounds.width * this.deadzonePercentage);

        //console.error(maxDistance.toFixed(3), deadzone.toFixed(3), bounds.width.toFixed(3));

        const distance2 =
            distance < deadzone
                ? 0
                : (maxDistance / (maxDistance - deadzone)) * (distance - deadzone);
        const xPosition2 = distance2 * Math.cos(angle);
        const yPosition2 = distance2 * Math.sin(angle);
        const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
        const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

        this.value = { x: xPercent, y: yPercent };
        this.x = xPercent;
        this.y = yPercent;
    }

    handleUp(event) {
        if (!this.active) return;

        // if this is a touch event, make sure it is the right one
        if (event.changedTouches && this.touchId != event.changedTouches[0].identifier)
            return;

        // transition the stick position back to center
        this.stick.style.transition = "0.2s";
        this.stick.style.transform = `translate(0px, 0px)`;

        // reset everything
        this.value = { x: 0, y: 0 };
        this.x = 0;
        this.y = 0;
        this.touchId = null;
        this.active = false;
    }
}

test = null;
