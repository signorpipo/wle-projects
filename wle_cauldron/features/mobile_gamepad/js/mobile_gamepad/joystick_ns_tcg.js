import * as glMatrix from 'gl-matrix';

/*** Player movement with Virtual Joystic and W/A/S/D keys */
WL.registerComponent(
	"joystick",
	{
		/** Movement speed in m/s. */
		speed: { type: WL.Type.Float, default: 1 },
		/** Object of which the orientation is used to determine forward direction */
		NonVrCamera: { type: WL.Type.Object },
		/** Parent object */
		Player: { type: WL.Type.Object },
		/** Whether or not to restrict movement on the Y axis */
		restrictY: { type: WL.Type.Bool, default: false },
		/**Left joystick base url */
		leftJoystickBaseURL: { type: WL.Type.String },
		/**Right joystick base url */
		RightJoystickBaseURL: { type: WL.Type.String },
		/**Joystick body url */
		joystickBodyURL: { type: WL.Type.String },
	},
	{
		init: function () {
			vec3 = glMatrix.vec3;
			this.defaultLeftJoystickUrl =
				"data:image/svg+xml,%3Csvg width='150px' height='150px' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='white' fill-opacity='0'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 10C25.6569 10 27 8.65685 27 7C27 5.34315 25.6569 4 24 4C22.3431 4 21 5.34315 21 7C21 8.65685 22.3431 10 24 10Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 44C25.6569 44 27 42.6569 27 41C27 39.3431 25.6569 38 24 38C22.3431 38 21 39.3431 21 41C21 42.6569 22.3431 44 24 44Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7 27C8.65685 27 10 25.6569 10 24C10 22.3431 8.65685 21 7 21C5.34315 21 4 22.3431 4 24C4 25.6569 5.34315 27 7 27Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 27C42.6569 27 44 25.6569 44 24C44 22.3431 42.6569 21 41 21C39.3431 21 38 22.3431 38 24C38 25.6569 39.3431 27 41 27Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M24.1969 15.7437C27.2874 15.7437 30.0141 14.186 31.6346 11.8129C33.5162 12.9387 35.1205 14.4803 36.3205 16.3108C33.7298 17.8909 32.0002 20.7435 32.0002 24C32.0002 27.3428 33.8226 30.2599 36.528 31.812C35.4049 33.6293 33.8903 35.1792 32.102 36.344C30.5754 33.5471 27.6077 31.6498 24.1969 31.6498C20.7969 31.6498 17.8373 33.5351 16.3064 36.3174C14.4779 35.1177 12.9379 33.5145 11.813 31.6344C14.1861 30.0139 15.7438 27.2872 15.7438 24.1968C15.7438 21.1165 14.1964 18.3976 11.8365 16.7752C13.0547 14.7536 14.7538 13.0546 16.7753 11.8364C18.3977 14.1963 21.1166 15.7437 24.1969 15.7437Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A";
			this.defaultRightJoystickUrl =
				"data:image/svg+xml,%3Csvg width='150px' height='150px' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='white' fill-opacity='0'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7 27C8.65685 27 10 25.6569 10 24C10 22.3431 8.65685 21 7 21C5.34315 21 4 22.3431 4 24C4 25.6569 5.34315 27 7 27Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 27C42.6569 27 44 25.6569 44 24C44 22.3431 42.6569 21 41 21C39.3431 21 38 22.3431 38 24C38 25.6569 39.3431 27 41 27Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M24.1969 15.7437C27.2874 15.7437 30.0141 14.186 31.6346 11.8129C33.5162 12.9387 35.1205 14.4803 36.3205 16.3108C33.7298 17.8909 32.0002 20.7435 32.0002 24C32.0002 27.3428 33.8226 30.2599 36.528 31.812C35.4049 33.6293 33.8903 35.1792 32.102 36.344C30.5754 33.5471 27.6077 31.6498 24.1969 31.6498C20.7969 31.6498 17.8373 33.5351 16.3064 36.3174C14.4779 35.1177 12.9379 33.5145 11.813 31.6344C14.1861 30.0139 15.7438 27.2872 15.7438 24.1968C15.7438 21.1165 14.1964 18.3976 11.8365 16.7752C13.0547 14.7536 14.7538 13.0546 16.7753 11.8364C18.3977 14.1963 21.1166 15.7437 24.1969 15.7437Z' fill='%232F88FF' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A";
			this.defaultBodyURL =
				"data:image/svg+xml,%3Csvg width='80px' height='80px' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='color'%3E%3Ccircle cx='36' cy='36.0001' r='28' fill='white'/%3E%3C/g%3E%3Cg id='line'%3E%3Ccircle cx='36' cy='36.0001' r='28' fill='none' stroke='%23000' stroke-linejoin='round' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E%0A";
		},

		start: function () {
			this.createDynamicHtml();
			this.createJoystick();
			this.headObject = this.NonVrCamera || this.object;
		},

		update: function (dt) {
			if (this.joystick1 == null) return;

			let direction = [0, 0, 0];

			// movement controls
			if (this.joystick1.x != null) direction[0] += this.joystick1.x;
			if (this.joystick1.y != null) direction[2] += this.joystick1.y;

			// horizontal view controls
			if (this.joystick2.x != null)
				this.Player.rotateAxisAngleDegObject([0, 1, 0], -2 * this.joystick2.x);

			vec3.transformQuat(direction, direction, this.headObject.transformWorld);

			if (this.restrictY) direction[1] = 0; // y restricts
			vec3.normalize(direction, direction); // normalize

			direction[0] *= this.speed * dt;
			direction[2] *= this.speed * dt;
			this.Player.translate(direction);
		},

		createJoystick: function () {
			class JoystickController {
				// stickID: ID of HTML element (representing joystick) that will be dragged
				// maxDistance: maximum amount joystick can move in any direction
				// deadzone: joystick must move at least this amount from origin to register value change
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
						stick.style.transition = ".05s";
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
						stick.style.transition = ".2s";
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
			this.joystick1 = new JoystickController("joystickTranslation", "stick1", 0.5, 64, 0.1, 8);
			this.joystick2 = new JoystickController("joystickRotation", "stick2", 0.5, 64, 0.1, 8);
		},

		createDynamicHtml: function () {
			/* document.body.setAttribute( // avoid blue selection on long press on mobile
				"style",
				"-webkit-tap-highlight-color: transparent; -webkit-user-select: none; -ms-user-select: none; user-select: none;",
			); */

			const joysticksDiv = document.createElement("div");
			joysticksDiv.id = "joysticksDiv";
			/* joysticksDiv.setAttribute(
				"style",
				"position: absolute; width: 15%; aspect-ratio:1/1; min-width: 128px; left:5%; bottom:5%",
			); */
			document.body.appendChild(joysticksDiv);

			const joystickTranslation = document.createElement("div");
			joystickTranslation.id = "joystickTranslation";
			joystickTranslation.setAttribute(
				"style",
				"position: absolute; width: 15%; aspect-ratio:1/1; min-width: 128px; left:5%; bottom:5%",
			);
			document.getElementById("joysticksDiv").appendChild(joystickTranslation);

			const joystickBase = document.createElement("img");
			joystickBase.src = this.joystickBodyURL || this.defaultLeftJoystickUrl;
			joystickBase.draggable = false;
			joystickBase.setAttribute("style", "opacity:1; position: absolute; width: 100%; height: 100%;");
			document.getElementById("joystickTranslation").appendChild(joystickBase);

			//avoid making them clickable
			joystickBase.addEventListener("mousedown", (event) => { event.preventDefault() });
			joystickBase.addEventListener("touchstart", (event) => { event.preventDefault() });

			const stick1 = document.createElement("div");
			stick1.id = "stick1";
			stick1.setAttribute("style", "position: absolute; left :25%; top:25%; width: 50%; height: 50%;");
			document.getElementById("joystickTranslation").appendChild(stick1);

			/* const joystickBody1 = document.createElement("img");
			joystickBody1.src = this.joystickBodyURL || this.defaultBodyURL;
			joystickBody1.draggable = false;
			joystickBody1.setAttribute("style", "opacity: 0.6; position: absolute; width: 100%; height: 100%;");
			document.getElementById("stick1").appendChild(joystickBody1); */

			/* const joystickBody1 = document.createElement("canvas");
			joystickBody1.width = 50;
			joystickBody1.height = 50;
			joystickBody1.id = "joystickBody1";
			joystickBody1.draggable = false;
			joystickBody1.setAttribute("style", "opacity: 0.6; position: absolute; width: 100%; height: 100%;");
			//joystickBody1.src = this.joystickBodyURL || this.defaultBodyURL;
			document.getElementById("stick1").appendChild(joystickBody1);

			let joystickBody1Context = joystickBody1.getContext("2d");
			joystickBody1Context.clearRect(0, 0, joystickBody1Context.canvas.width, joystickBody1Context.canvas.height);
			joystickBody1Context.arc(joystickBody1Context.canvas.width / 2, joystickBody1Context.canvas.height / 2, joystickBody1Context.canvas.width / 2, 0, Math.PI * 2, false);
			joystickBody1Context.fillStyle = "red";
			joystickBody1Context.fill(); */

			const joystickBody1 = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			joystickBody1.draggable = false;
			joystickBody1.setAttribute("style", "opacity: 0.6; position: absolute; width: 100%; height: 100%;");
			document.getElementById("stick1").appendChild(joystickBody1);

			const joystickBody1Image = document.createElementNS("http://www.w3.org/2000/svg", 'image');
			//joystickBody1Image.setAttribute("style", "position: absolute; width: 100%; height: 100%;");
			joystickBody1Image.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', this.joystickBodyURL || this.defaultBodyURL);
			joystickBody1Image.setAttributeNS(null, 'height', '100%');
			joystickBody1Image.setAttributeNS(null, 'width', '100%');
			joystickBody1.appendChild(joystickBody1Image);

			const joystickRotation = document.createElement("div");
			joystickRotation.id = "joystickRotation";
			joystickRotation.setAttribute(
				"style",
				"position: absolute; width: 15%; aspect-ratio:1/1; min-width: 128px; right:5%; bottom:5%",
			);
			document.getElementById("joysticksDiv").appendChild(joystickRotation);

			const joystickBaseHorizontal = document.createElement("img");
			joystickBaseHorizontal.src =
				this.joystickBodyURL || this.defaultRightJoystickUrl;
			joystickBaseHorizontal.draggable = false;
			joystickBaseHorizontal.setAttribute("style", "opacity:1; position: absolute; width: 100%; height: 100%;");
			document.getElementById("joystickRotation").appendChild(joystickBaseHorizontal);

			joystickBaseHorizontal.addEventListener("mousedown", (event) => { event.preventDefault() });
			joystickBaseHorizontal.addEventListener("touchstart", (event) => { event.preventDefault() });

			const stick2 = document.createElement("div");
			stick2.id = "stick2";
			stick2.setAttribute("style", "position: absolute; left :25%; top:25%; width: 50%; height: 50%;");
			document.getElementById("joystickRotation").appendChild(stick2);

			const joystickBody2 = document.createElement("img");
			joystickBody2.src = this.joystickBodyURL || this.defaultBodyURL;
			joystickBody2.draggable = false;
			joystickBody2.setAttribute("style", "opacity: 0.6; position: absolute; width: 100%; height: 100%;");
			document.getElementById("stick2").appendChild(joystickBody2);
		},
	},
);
