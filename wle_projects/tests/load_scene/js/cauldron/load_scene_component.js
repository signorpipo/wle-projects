import { Component } from "@wonderlandengine/api";
import { Globals } from "../pp/pp/globals";
import { GamepadButtonID } from "../pp/input/gamepad/gamepad_buttons";

export class LoadSceneComponent extends Component {
    static TypeName = "load-scene";
    static Properties = {};

    update(dt) {
        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd()) {
            Globals.getScene(this.engine).load("wle_pplayground_unbundled.bin");
        }
    }
}