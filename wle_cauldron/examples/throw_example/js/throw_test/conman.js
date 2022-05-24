import * as glMatrix from 'gl-matrix';

WL.registerComponent('conman', {
    player: { type: WL.Type.Object },
    pivot: { type: WL.Type.Object },
    worldroot: { type: WL.Type.Object },
    head: { type: WL.Type.Object },
    speed: { type: WL.Type.Float, default: 1 },

}, {
    init: function () {
        this.vMove = [0, 0, 0];
        this.vTemp1 = [0, 0, 0];
        this.vTemp2 = [0, 0, 0];
        this.turnReady = true;
    },
    start: function () {
        PP.myLeftGamepad.registerButtonEventListener(PP.ButtonType.THUMBSTICK, PP.ButtonEvent.PRESS_START, this, this._thumbstickPressStart.bind(this));
        PP.myRightGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).isTouchEnd();
        PP.myLeftGamepad.getButtonInfo(PP.ButtonType.SQUEEZE).isPressStart(2); // fast pressed 2 times     
        PP.myGamepads[PP.Handedness.LEFT].getAxesInfo().myAxes;
        PP.myRightGamepad.pulse(0.5, 1);
    },
    update: function (dt) {
        let AxesMove = PP.myGamepads[PP.Handedness.LEFT].getAxesInfo().myAxes;
        let AxesTurn = PP.myGamepads[PP.Handedness.RIGHT].getAxesInfo().myAxes;
        //console.debug();
        if (this.player) {
            // MOVE (Translattion) Controls
            // FORWARD movement
            this.head.getForward(this.vTemp1);
            let dy = AxesMove[1];
            dy = Math.sign(dy) * (dy * dy);
            glMatrix.vec3.scale(this.vTemp1, this.vTemp1, dy);

            // LATERAL movement
            this.head.getRight(this.vTemp2);
            let dx = this.deadzone(AxesMove[0], 0.2);
            dx = Math.sign(dx) * (dx * dx);
            glMatrix.vec3.scale(this.vTemp2, this.vTemp2, dx);
            glMatrix.vec3.add(this.vMove, this.vTemp1, this.vTemp2);
            glMatrix.vec3.scale(this.vMove, this.vMove, this.speed);

            // FLOOR limiter
            this.player.getTranslationWorld(this.vTemp1);
            glMatrix.vec3.add(this.vTemp1, this.vTemp1, this.vMove)
            if (this.vTemp1[1] < 0) this.vTemp1[1] = 0; // prevent going below floor level
            this.player.setTranslationWorld(this.vTemp1);

            // TURN Controls
            let TurnLimit = 0.75
            if (Math.abs(AxesTurn[0]) > TurnLimit) {
                if (this.turnReady) {
                    this.turnReady = false;
                    if (this.pivot) {
                        this.pivot.rotateAxisAngleDegObject([0, -1, 0], 30 * Math.sign(AxesTurn[0]));
                    }
                    if (this.worldroot) {
                        this.worldroot.rotateAxisAngleDegObject([0, -1, 0], -30 * Math.sign(AxesTurn[0]));
                    }
                }
            } else {
                this.turnReady = true;
            }
        }
    },
    deadzone: function (v, d) {
        if (v < -d) {
            return (v - (-d)) / (1 - d);
        } else if (v > d) {
            return (v - d) / (1 - d)
        } else {
            return 0;
        }
    },
    _thumbstickPressStart: function () {
        console.debug("Thumb click");
        //PP.myRightGamepad.pulse(0.5, 1);   
    }
});
