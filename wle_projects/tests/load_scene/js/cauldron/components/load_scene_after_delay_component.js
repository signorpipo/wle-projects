import { Component, Property } from "@wonderlandengine/api";

export class LoadSceneAfterDelayComponent extends Component {
    static TypeName = "load-scene-after-delay";
    static Properties = {
        _mySceneToLoad: Property.string("scene-1.bin"),
        _myDelay: Property.float(2),
    };

    start() {
        this._myTimer = this._myDelay;
        this._myLoaded = false;
    }

    update(dt) {
        if (this._myLoaded) return;

        this._myTimer -= dt;
        if (this._myTimer <= 0) {
            this._myLoaded = true;
            this.engine.scene.load(this._mySceneToLoad);
        }
    }
}