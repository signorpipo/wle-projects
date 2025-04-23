import { Component } from "@wonderlandengine/api";
import { Globals, GrabberHandComponent } from "wle-pp";

export class SFXOnGrabThrowComponent extends Component {
    static TypeName = "sfx-on-grab-throw";

    start() {
        this._myGrabbers = null;
        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._myGrabbers = Globals.getRootObject(this.engine).pp_getComponents(GrabberHandComponent);
            this.onActivate();

            let audioManager = Globals.getAudioManager(this.engine);

            this._myGrabSFX = audioManager.createAudioPlayer("grab");
            this._myThrowSFX = audioManager.createAudioPlayer("throw");

            this._myStarted = true;
        }
    }

    _onGrab(grabber, grabbable) {
        this._myGrabSFX.setPosition(grabber.object.pp_getPosition());
        this._myGrabSFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._myGrabSFX.play();

        let intensity = 0.25;
        let pulseInfo = grabber.getGamepad().getPulseInfo();
        if (pulseInfo.myIntensity <= intensity) {
            grabber.getGamepad().pulse(intensity, 0.1);
        }
    }

    _onThrow(grabber, grabbable) {
        this._myThrowSFX.setPosition(grabber.object.pp_getPosition());
        this._myThrowSFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._myThrowSFX.play();

        let intensity = 0.15;
        let pulseInfo = grabber.getGamepad().getPulseInfo();
        if (pulseInfo.myIntensity <= intensity) {
            grabber.getGamepad().pulse(intensity, 0.1);
        }
    }

    onActivate() {
        if (this._myGrabbers != null) {
            for (let grabber of this._myGrabbers) {
                grabber.registerGrabEventListener(this, this._onGrab.bind(this));
                grabber.registerThrowEventListener(this, this._onThrow.bind(this));
            }
        }
    }

    onDeactivate() {
        for (let grabber of this._myGrabbers) {
            if (!grabber.isDestroyed) {
                grabber.unregisterGrabEventListener(this);
                grabber.unregisterThrowEventListener(this);
            }
        }
    }
}