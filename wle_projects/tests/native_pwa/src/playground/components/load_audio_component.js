import { Component } from "@wonderlandengine/api";
import { AudioSetup, Globals } from "wle-pp";

export class LoadAudioComponent extends Component {
    static TypeName = "load-audio";

    start() {
        this._myFirstUpdate = true;
    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._loadAudio();
            this._myFirstUpdate = false;
        }
    }

    _loadAudio() {
        let manager = Globals.getAudioManager(this.engine);

        {
            let audioSetup = new AudioSetup("assets/audio/music/playground/playground_ambient.mp3");
            audioSetup.myLoop = true;
            audioSetup.mySpatial = false;
            audioSetup.myVolume = 1;
            manager.addAudioSetup("playground_ambient", audioSetup);
        }

        {
            let audioSetup = new AudioSetup("assets/audio/sfx/playground/collision.mp3");
            audioSetup.myRate = 1;
            audioSetup.myVolume = 1;
            audioSetup.myReferenceDistance = 5;
            manager.addAudioSetup("collision", audioSetup);
        }

        {
            let audioSetup = new AudioSetup("assets/audio/sfx/playground/grab.mp3");
            audioSetup.myRate = 1;
            audioSetup.myVolume = 1;
            audioSetup.myReferenceDistance = 0.5;
            manager.addAudioSetup("grab", audioSetup);
        }

        {
            let audioSetup = new AudioSetup("assets/audio/sfx/playground/throw.mp3");
            audioSetup.myRate = 1;
            audioSetup.myVolume = 1;
            audioSetup.myReferenceDistance = 0.5;
            manager.addAudioSetup("throw", audioSetup);
        }

        {
            let audioSetup = new AudioSetup("assets/audio/sfx/playground/strike.mp3");
            audioSetup.myRate = 1;
            audioSetup.myVolume = 1;
            audioSetup.myReferenceDistance = 3;
            manager.addAudioSetup("strike", audioSetup);
        }
    }
}