WL.registerComponent(
    "mobile-gamepad-draft-1",
    {
        speed: { type: WL.Type.Float, default: 1 },
        rotationSpeed: { type: WL.Type.Float, default: -180 },
        restrictY: { type: WL.Type.Bool, default: false },
    },
    {
        start: function () {
            document.body.style.overflow = "hidden";
            document.body.style.userSelect = "none";
            document.body.style.userSelect = "none";
            document.body.style.webkitUserSelect = "none";
            document.body.style.touchAction = "none";

            let joysticksDiv = document.createElement("div"); // container
            joysticksDiv.id = "joysticksDiv";
            joysticksDiv.style.opacity = "0.5";
            document.body.appendChild(joysticksDiv);

            this.createDynamicHtmlButtons();
            this.createDynamicHtml();
            this.createJoystick();

            test = joysticksDiv;
        },

        update: function (dt) {
            if (this.joystick1 == null) return;

            let direction = [0, 0, 0];

            // movement controls
            if (this.joystick1.x != null) direction[0] += this.joystick1.x;
            if (this.joystick1.y != null) direction[2] += this.joystick1.y;

            // horizontal view controls
            if (this.joystick2.x != null) {
                PP.myPlayerObjects.myPlayer.pp_rotateAxisObject(this.rotationSpeed * this.joystick2.x * dt, [0, 1, 0]);
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

        createJoystick: function () {
            this.joystick1 = new JoystickController("joystickTranslation", "joystickTranslationStick", 0.5, 0, 0.1, 0);
            this.joystick2 = new JoystickController("joystickRotation", "joystickRotationStick", 0.5, 0, 0.1, 0);
        },

        createDynamicHtml: function () {
            const joystickTranslation = document.createElement("div");
            joystickTranslation.id = "joystickTranslation";
            joystickTranslation.setAttribute(
                "style",
                "position: absolute; width: 15vw; height:15vw; min-width: 0px; left:3vw; bottom:3vw",
            );
            joysticksDiv.appendChild(joystickTranslation);

            const joystickTranslationBackground = document.createElement("div");
            joystickTranslationBackground.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickTranslation.appendChild(joystickTranslationBackground);

            const joystickTranslationBackgroundSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            joystickTranslationBackgroundSVG.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickTranslationBackground.appendChild(joystickTranslationBackgroundSVG);

            const joystickTranslationBackgroundSVGCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            joystickTranslationBackgroundSVGCircle.setAttributeNS(null, 'cx', "50%");
            joystickTranslationBackgroundSVGCircle.setAttributeNS(null, 'cy', "50%");
            joystickTranslationBackgroundSVGCircle.setAttributeNS(null, 'r', "48%");
            joystickTranslationBackgroundSVGCircle.setAttributeNS(null, 'style', 'fill: #616161;');
            joystickTranslationBackgroundSVG.appendChild(joystickTranslationBackgroundSVGCircle);

            //avoid making them clickable
            joystickTranslationBackground.addEventListener("mousedown", (event) => { event.preventDefault() });
            joystickTranslationBackground.addEventListener("touchstart", (event) => { event.preventDefault() });

            const joystickTranslationStick = document.createElement("div");
            joystickTranslationStick.id = "joystickTranslationStick";
            joystickTranslationStick.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickTranslation.appendChild(joystickTranslationStick);

            const joystickTranslationStickSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            joystickTranslationStickSVG.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickTranslationStick.appendChild(joystickTranslationStickSVG);

            const joystickTranslationStickSVGCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            joystickTranslationStickSVGCircle.style.position = "absolute";
            joystickTranslationStickSVGCircle.setAttributeNS(null, 'cx', "50%");
            joystickTranslationStickSVGCircle.setAttributeNS(null, 'cy', "50%");
            joystickTranslationStickSVGCircle.setAttributeNS(null, 'r', "17%");
            joystickTranslationStickSVGCircle.setAttributeNS(null, 'style', 'fill: #e0e0e0;');
            joystickTranslationStickSVG.appendChild(joystickTranslationStickSVGCircle);

            const joystickRotation = document.createElement("div");
            joystickRotation.id = "joystickRotation";
            joystickRotation.setAttribute(
                "style",
                "position: absolute; width: 15vw; height:15vw; min-width: 0px; right:3vw; bottom:3vw",
            );
            joysticksDiv.appendChild(joystickRotation);

            const joystickRotationBackground = document.createElement("div");
            joystickRotationBackground.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickRotation.appendChild(joystickRotationBackground);

            joystickRotationBackground.addEventListener("mousedown", (event) => { event.preventDefault() });
            joystickRotationBackground.addEventListener("touchstart", (event) => { event.preventDefault() });

            const joystickRotationBackgroundSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            joystickRotationBackground.appendChild(joystickRotationBackgroundSVG);
            joystickRotationBackgroundSVG.style.position = "absolute";
            joystickRotationBackgroundSVG.style.width = "100%";
            joystickRotationBackgroundSVG.style.height = "100%";

            const joystickRotationBackgroundSVGCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'cx', "50%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'cy', "50%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'r', "48%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'style', 'fill: #616161;');
            joystickRotationBackgroundSVG.appendChild(joystickRotationBackgroundSVGCircle);

            const joystickRotationStick = document.createElement("div");
            joystickRotationStick.id = "joystickRotationStick";
            joystickRotationStick.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickRotation.appendChild(joystickRotationStick);

            const joystickRotationStickSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            joystickRotationStickSVG.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickRotationStick.appendChild(joystickRotationStickSVG);

            const joystickRotationStickSVGCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            joystickRotationStickSVGCircle.setAttributeNS(null, 'cx', "50%");
            joystickRotationStickSVGCircle.setAttributeNS(null, 'cy', "50%");
            joystickRotationStickSVGCircle.setAttributeNS(null, 'r', "17%");
            joystickRotationStickSVGCircle.setAttributeNS(null, 'fill', '#e0e0e0');
            joystickRotationStickSVG.appendChild(joystickRotationStickSVGCircle);

            test = joystickRotationBackgroundSVG;
        },

        createDynamicHtmlButtons: function () {
            let buttonSetups = [];
            buttonSetups.push(new ButtonSetup("thumbstickButton", "Th"));
            buttonSetups.push(new ButtonSetup("bottomButton", "Bo"));
            buttonSetups.push(new ButtonSetup("topButton", "To"));
            buttonSetups.push(new ButtonSetup("Squeeze", "Sq"));
            buttonSetups.push(new ButtonSetup("Select", "Se"));

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

            let joysticksDiv = document.getElementById("joysticksDiv");

            let button = document.createElement("div");
            button.id = setup.myID;
            button.style.position = "absolute";
            button.style.width = "5vw";
            button.style.height = "5vw";
            button.style.minWidth = "0px";
            button.style.left = "8vw";
            button.style.bottom = "8vw";
            button.style.transform = "rotate(" + fixedAngle + "deg) translateX(12vw)";
            joysticksDiv.appendChild(button);

            let buttonIconSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            buttonIconSVG.style.position = "absolute";
            buttonIconSVG.style.width = "100%";
            buttonIconSVG.style.height = "100%";
            buttonIconSVG.style.transform = "rotate(" + counterAngle + "deg)";
            button.appendChild(buttonIconSVG);

            let buttonIconSVGBackground = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            buttonIconSVGBackground.id = setup.myID + "Background";
            buttonIconSVGBackground.setAttributeNS(null, 'cx', "50%");
            buttonIconSVGBackground.setAttributeNS(null, 'cy', "50%");
            buttonIconSVGBackground.setAttributeNS(null, 'r', "50%");
            //buttonIconSVGBackground.setAttributeNS(null, 'stroke', "#616161");
            //buttonIconSVGBackground.setAttributeNS(null, 'stroke-width', "7%");
            buttonIconSVGBackground.setAttributeNS(null, 'fill', "#616161");
            buttonIconSVG.appendChild(buttonIconSVGBackground);

            let buttonIconSVGLabel = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            buttonIconSVGLabel.id = setup.myID + "Label";
            buttonIconSVGLabel.setAttributeNS(null, 'x', "50%");
            buttonIconSVGLabel.setAttributeNS(null, 'y', "50%");
            buttonIconSVGLabel.style.fill = "#e0e0e0";
            buttonIconSVGLabel.style.textAlign = "center";
            buttonIconSVGLabel.style.textAnchor = "middle";
            buttonIconSVGLabel.style.dominantBaseline = "central";
            buttonIconSVGLabel.style.alignmentBaseline = "central";
            buttonIconSVGLabel.style.fontFamily = "sans-serif";
            buttonIconSVGLabel.style.fontSize = "2vw";
            buttonIconSVGLabel.style.fontWeight = "bold";
            //buttonIconSVGLabel.style.userSelect = "none";
            buttonIconSVGLabel.textContent = setup.myLabel;
            buttonIconSVG.appendChild(buttonIconSVGLabel);
        }
    }
);

class ButtonSetup {
    constructor(id, label) {
        this.myID = id;
        this.myLabel = label;
    }
}

class ButtonController {
    constructor(buttonID, circleID, textID) {
        this.buttonID = document.getElementById(buttonID);
        this.circleID = document.getElementById(circleID);
        this.textID = document.getElementById(textID);

        this.stickContainer = document.getElementById(stickContainerID);

        // location from which drag begins, used to calculate offsets
        this.dragStart = null;

        // track touch identifier in case multiple joysticks present
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
}

class JoystickController {
    constructor(stickContainerID, stickID, maxDistancePercentage, maxDistanceMinValue, deadzonePercentage, deadzoneMinValue) {
        this.id = stickID;

        this.stick = document.getElementById(stickID);

        this.stickContainer = document.getElementById(stickContainerID);

        // location from which drag begins, used to calculate offsets
        this.dragStart = null;

        // track touch identifier in case multiple joysticks present
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

        // transition the joystick position back to center
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
