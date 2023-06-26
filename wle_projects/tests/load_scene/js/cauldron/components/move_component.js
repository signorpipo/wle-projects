import { Component, Property } from "@wonderlandengine/api";

export class MoveComponent extends Component {
    static TypeName = "move";
    static Properties = {
        _mySpeed: Property.float(5)
    };

    start() {
        this._myElapsedTime = 0;
    }

    update(dt) {
        this._myElapsedTime += dt;

        this.object.resetPosition();

        let currentTranslation = Math.sin(this._myElapsedTime * this._mySpeed);
        this.object.translateLocal([0, currentTranslation, 0]);
    }
}