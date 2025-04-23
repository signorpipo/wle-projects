import { Component } from "@wonderlandengine/api";
import { Globals } from "wle-pp";

export class PlayMusicComponent extends Component {
    static TypeName = "play-music";

    start() {
        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._myMusic = Globals.getAudioManager(this.engine).createAudioPlayer("playground_ambient");
            if (this._myMusic != null) {
                this._myMusic.play();

                this._myStarted = true;
            }
        }
    }

    onActivate() {
        if (this._myStarted) {
            this._myMusic.resume();
        }
    }

    onDeactivate() {
        if (this._myStarted) {
            this._myMusic.pause();
        }
    }
}