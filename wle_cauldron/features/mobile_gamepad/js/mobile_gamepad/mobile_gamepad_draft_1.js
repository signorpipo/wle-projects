WL.registerComponent("mobile-gamepad-draft-1", {
    speed: { type: WL.Type.Float, default: 1 },
    rotationSpeed: { type: WL.Type.Float, default: -180 },
    restrictY: { type: WL.Type.Bool, default: false },
}, {
    start() {
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
        this.select = new ButtonController("select", "selectBack", "selectLabel");
        this.squeeze = new ButtonController("squeeze", "squeezeBack", "squeezeLabel");
        this.topButton = new ButtonController("topButton", "topButtonBack", "topButtonLabel");
        this.bottomButton = new ButtonController("bottomButton", "bottomButtonBack", "bottomButtonLabel");
        this.selectButton = new ButtonController("thumbstickButton", "thumbstickButtonBack", "thumbstickButtonLabel");

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
        thumbstick.style.width = "15vw";
        thumbstick.style.height = "15vw";
        thumbstick.style.bottom = "3vw";

        if (isLeft) {
            thumbstick.style.left = "3vw";
        } else {
            thumbstick.style.right = "3vw";
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
        thumbstickBackVisual.style.fill = "#616161";
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
        thumbstickStickVisual.style.fill = "#e0e0e0";
        thumbstickStickSVG.appendChild(thumbstickStickVisual);
    },
    createHtmlButtons() {
        let buttonSetups = [];
        buttonSetups.push(new ButtonSetup("thumbstickButton", "Th"));
        buttonSetups.push(new ButtonSetup("bottomButton", "Bo"));
        buttonSetups.push(new ButtonSetup("topButton", "To"));
        buttonSetups.push(new ButtonSetup("squeeze", "Sq"));
        buttonSetups.push(new ButtonSetup("select", "Se"));

        let minAngle = 245;
        let maxAngle = 385;
        let currentAngle = minAngle;
        let angleStep = (maxAngle - minAngle) / (buttonSetups.length - 1);
        for (let setup of buttonSetups) {
            this.createButtonWithSetup(setup, currentAngle);
            currentAngle += angleStep;
        }
    },
    createButtonWithSetup(setup, angle) {
        let fixedAngle = Math.pp_angleClamp(angle, true);
        let counterAngle = 360 - fixedAngle;

        let virtualGamepad = document.getElementById("virtualGamepad");

        let button = document.createElement("div");
        button.style.position = "absolute";
        button.style.width = "5vw";
        button.style.height = "5vw";
        button.style.left = "8vw";
        button.style.bottom = "8vw";
        button.style.transform = "rotate(" + fixedAngle + "deg) translateX(12vw)";
        virtualGamepad.appendChild(button);

        let buttonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        buttonSVG.id = setup.myID;
        buttonSVG.style.position = "absolute";
        buttonSVG.style.width = "100%";
        buttonSVG.style.height = "100%";
        buttonSVG.style.transform = "rotate(" + counterAngle + "deg)";
        button.appendChild(buttonSVG);

        let buttonSVGBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        buttonSVGBack.id = setup.myID + "Back";
        buttonSVGBack.setAttributeNS(null, 'cx', "50%");
        buttonSVGBack.setAttributeNS(null, 'cy', "50%");
        buttonSVGBack.setAttributeNS(null, 'r', "50%");
        buttonSVGBack.style.fill = "#616161";
        buttonSVG.appendChild(buttonSVGBack);

        let buttonSVGLabel = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        buttonSVGLabel.id = setup.myID + "Label";
        buttonSVGLabel.setAttributeNS(null, 'x', "50%");
        buttonSVGLabel.setAttributeNS(null, 'y', "50%");
        buttonSVGLabel.style.fill = "#e0e0e0";
        buttonSVGLabel.style.textAlign = "center";
        buttonSVGLabel.style.textAnchor = "middle";
        buttonSVGLabel.style.dominantBaseline = "central";
        buttonSVGLabel.style.alignmentBaseline = "central";
        buttonSVGLabel.style.fontFamily = "sans-serif";
        buttonSVGLabel.style.fontSize = "2vw";
        buttonSVGLabel.style.fontWeight = "bold";
        buttonSVGLabel.textContent = setup.myLabel;
        buttonSVG.appendChild(buttonSVGLabel);
    }
});

class ButtonSetup {
    constructor(id, label) {
        this.myID = id;
        this.myLabel = label;
    }
}

class ButtonController {
    constructor(buttonID, backID, labelID) {
        this.button = document.getElementById(buttonID);
        this.back = document.getElementById(backID);
        this.label = document.getElementById(labelID);

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
        this.back.style.fill = this.label.style.fill;
        this.label.style.fill = backFillBackup;

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
        this.back.style.fill = this.label.style.fill;
        this.label.style.fill = backFillBackup;

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
