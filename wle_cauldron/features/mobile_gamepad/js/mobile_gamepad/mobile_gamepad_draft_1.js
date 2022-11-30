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

            let joysticksDiv = document.createElement("div"); // container
            joysticksDiv.id = "joysticksDiv";
            joysticksDiv.style.opacity = "0.6";
            joysticksDiv.style.userSelect = "none";
            document.body.appendChild(joysticksDiv);

            this.createDynamicHtmlButtons();
            this.createDynamicHtml();
            this.createJoystick();
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
            class JoystickController {
                constructor(stickContainerID, stickID, maxDistancePercentage, maxDistanceMinValue, deadzonePercentage, deadzoneMinValue) {
                    this.id = stickID;
                    let stick = document.getElementById(stickID);
                    let stickContainer = document.getElementById(stickContainerID);

                    // location from which drag begins, used to calculate offsets
                    this.dragStart = null;

                    // track touch identifier in case multiple joysticks present
                    this.touchId = null;

                    this.active = false;
                    this.value = { x: 0, y: 0 };

                    let self = this;

                    function handleDown(event) {
                        self.active = true;

                        // all drag movements are instantaneous
                        stick.style.transition = "0s";

                        // touch event fired before mouse event; prevent redundant mouse event from firing
                        event.preventDefault();

                        if (event.changedTouches)
                            self.dragStart = {
                                x: event.changedTouches[0].clientX,
                                y: event.changedTouches[0].clientY,
                            };
                        else self.dragStart = { x: event.clientX, y: event.clientY };

                        // if this is a touch event, keep track of which one
                        if (event.changedTouches) self.touchId = event.changedTouches[0].identifier;
                    }

                    function handleMove(event) {
                        if (!self.active) return;

                        // if this is a touch event, make sure it is the right one
                        // also handle multiple simultaneous touchmove events
                        let touchmoveId = null;
                        if (event.changedTouches) {
                            for (let i = 0; i < event.changedTouches.length; i++) {
                                if (self.touchId == event.changedTouches[i].identifier) {
                                    touchmoveId = i;
                                    event.clientX = event.changedTouches[i].clientX;
                                    event.clientY = event.changedTouches[i].clientY;
                                }
                            }

                            if (touchmoveId == null) return;
                        }

                        let bounds = stickContainer.getBoundingClientRect();
                        let maxDistance = 0;
                        maxDistance = Math.max(maxDistanceMinValue, bounds.width * maxDistancePercentage);

                        const xDiff = event.clientX - self.dragStart.x;
                        const yDiff = event.clientY - self.dragStart.y;
                        const angle = Math.atan2(yDiff, xDiff);
                        const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
                        const xPosition = distance * Math.cos(angle);
                        const yPosition = distance * Math.sin(angle);

                        // move stick image to new position
                        stick.style.transition = "0.05s";
                        stick.style.transform = `translate(${xPosition}px, ${yPosition}px)`;

                        // deadzone adjustment

                        let deadzone = 0;
                        deadzone = Math.max(deadzoneMinValue, bounds.width * deadzonePercentage);

                        //console.error(maxDistance.toFixed(3), deadzone.toFixed(3), bounds.width.toFixed(3));

                        const distance2 =
                            distance < deadzone
                                ? 0
                                : (maxDistance / (maxDistance - deadzone)) * (distance - deadzone);
                        const xPosition2 = distance2 * Math.cos(angle);
                        const yPosition2 = distance2 * Math.sin(angle);
                        const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
                        const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

                        self.value = { x: xPercent, y: yPercent };
                        self.x = xPercent;
                        self.y = yPercent;
                    }

                    function handleUp(event) {
                        if (!self.active) return;

                        // if this is a touch event, make sure it is the right one
                        if (event.changedTouches && self.touchId != event.changedTouches[0].identifier)
                            return;

                        // transition the joystick position back to center
                        stick.style.transition = "0.2s";
                        stick.style.transform = `translate(0px, 0px)`;

                        // reset everything
                        self.value = { x: 0, y: 0 };
                        self.x = 0;
                        self.y = 0;
                        self.touchId = null;
                        self.active = false;
                    }

                    stick.addEventListener("mousedown", handleDown);
                    stick.addEventListener("touchstart", handleDown);
                    document.body.addEventListener("mousemove", handleMove, {
                        passive: false,
                    });
                    document.body.addEventListener("touchmove", handleMove, {
                        passive: false,
                    });
                    document.body.addEventListener("mouseup", handleUp);
                    document.body.addEventListener("touchend", handleUp);

                    // could be optional
                    //document.body.addEventListener("mouseenter", handleUp);
                    //document.body.addEventListener("mouseleave", handleUp);
                }
            }
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
            joystickRotationBackgroundSVG.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
            joystickRotationBackground.appendChild(joystickRotationBackgroundSVG);

            const joystickRotationBackgroundSVGCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'cx', "50%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'cy', "50%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'r', "48%");
            joystickRotationBackgroundSVGCircle.setAttributeNS(null, 'style', 'fill: #616161;');
            joystickRotationBackgroundSVG.appendChild(joystickRotationBackgroundSVGCircle);

            test = joystickRotationBackgroundSVGCircle;

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
            joystickRotationStickSVGCircle.setAttributeNS(null, 'style', 'fill: #e0e0e0;');
            joystickRotationStickSVG.appendChild(joystickRotationStickSVGCircle);
        },

        createDynamicHtmlButtons: function () {
            let joysticksDiv = document.getElementById("joysticksDiv");

            let topButton = document.createElement("div");
            topButton.id = "topButton";
            topButton.style.position = "absolute";
            topButton.style.width = "5vw";
            topButton.style.height = "5vw";
            topButton.style.minWidth = "0px";
            topButton.style.left = "20.5vw";
            topButton.style.bottom = "10vw";
            joysticksDiv.appendChild(topButton);

            let topButtonIcon = document.createElement("div");
            topButtonIcon.id = "topButtonIcon";
            topButtonIcon.style.position = "absolute";
            topButtonIcon.style.width = "100%";
            topButtonIcon.style.height = "100%";
            topButtonIcon.style.display = "flex";
            topButtonIcon.style.alignItems = "center";
            topButtonIcon.style.justifyContent = "center";
            topButtonIcon.style.textAlign = "center";
            topButton.appendChild(topButtonIcon);

            let topButtonIconSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            topButtonIconSVG.style.position = "absolute";
            topButtonIconSVG.style.width = "100%";
            topButtonIconSVG.style.height = "100%";
            topButtonIcon.appendChild(topButtonIconSVG);

            let topButtonIconSVGBackground = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            topButtonIconSVGBackground.setAttributeNS(null, 'cx', "50%");
            topButtonIconSVGBackground.setAttributeNS(null, 'cy', "50%");
            topButtonIconSVGBackground.setAttributeNS(null, 'r', "46.5%");
            topButtonIconSVGBackground.setAttributeNS(null, 'stroke', "#616161");
            topButtonIconSVGBackground.setAttributeNS(null, 'stroke-width', "7%");
            topButtonIconSVGBackground.setAttributeNS(null, 'fill', "#e0e0e0");
            topButtonIconSVG.appendChild(topButtonIconSVGBackground);

            let topButtonIconSVGLabel = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            topButtonIconSVGLabel.setAttributeNS(null, 'x', "50%");
            topButtonIconSVGLabel.setAttributeNS(null, 'y', "50%");
            topButtonIconSVGLabel.style.fill = "#616161";
            topButtonIconSVGLabel.style.textAlign = "center";
            topButtonIconSVGLabel.style.textAnchor = "middle";
            topButtonIconSVGLabel.style.dominantBaseline = "central";
            topButtonIconSVGLabel.style.alignmentBaseline = "central";
            topButtonIconSVGLabel.style.fontFamily = "sans-serif";
            topButtonIconSVGLabel.style.fontSize = "2vw";
            topButtonIconSVGLabel.style.fontWeight = "bold";
            //topButtonIconSVGLabel.style.userSelect = "none";
            topButtonIconSVGLabel.textContent = "To";
            topButtonIconSVG.appendChild(topButtonIconSVGLabel);

            //BOTTOM
            let bottomButton = document.createElement("div");
            bottomButton.id = "bottomButton";
            bottomButton.style.position = "absolute";
            bottomButton.style.width = "5vw";
            bottomButton.style.height = "5vw";
            bottomButton.style.minWidth = "0px";
            bottomButton.style.left = "19vw";
            bottomButton.style.bottom = "3vw";
            joysticksDiv.appendChild(bottomButton);

            let bottomButtonIcon = document.createElement("div");
            bottomButtonIcon.id = "bottomButtonIcon";
            bottomButtonIcon.style.position = "absolute";
            bottomButtonIcon.style.width = "100%";
            bottomButtonIcon.style.height = "100%";
            bottomButton.appendChild(bottomButtonIcon);

            let bottomButtonIconSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            bottomButtonIconSVG.style.position = "absolute";
            bottomButtonIconSVG.style.width = "100%";
            bottomButtonIconSVG.style.height = "100%";
            bottomButtonIcon.appendChild(bottomButtonIconSVG);

            let bottomButtonIconSVGBackground = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            bottomButtonIconSVGBackground.setAttributeNS(null, 'cx', "50%");
            bottomButtonIconSVGBackground.setAttributeNS(null, 'cy', "50%");
            bottomButtonIconSVGBackground.setAttributeNS(null, 'r', "46.5%");
            bottomButtonIconSVGBackground.setAttributeNS(null, 'stroke', "#616161");
            bottomButtonIconSVGBackground.setAttributeNS(null, 'stroke-width', "7%");
            bottomButtonIconSVGBackground.setAttributeNS(null, 'fill', "#e0e0e0");
            bottomButtonIconSVG.appendChild(bottomButtonIconSVGBackground);

            let bottomButtonIconSVGLabel = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            bottomButtonIconSVGLabel.setAttributeNS(null, 'x', "50%");
            bottomButtonIconSVGLabel.setAttributeNS(null, 'y', "50%");
            bottomButtonIconSVGLabel.style.fill = "#616161";
            bottomButtonIconSVGLabel.style.textAlign = "center";
            bottomButtonIconSVGLabel.style.textAnchor = "middle";
            bottomButtonIconSVGLabel.style.dominantBaseline = "central";
            bottomButtonIconSVGLabel.style.fontFamily = "sans-serif";
            bottomButtonIconSVGLabel.style.fontSize = "2vw";
            bottomButtonIconSVGLabel.style.fontWeight = "bold";
            //bottomButtonIconSVGLabel.style.userSelect = "none";
            bottomButtonIconSVGLabel.textContent = "Bo";
            bottomButtonIconSVG.appendChild(bottomButtonIconSVGLabel);

            test = topButtonIconSVGLabel;
        }
    },
);

test = null;
