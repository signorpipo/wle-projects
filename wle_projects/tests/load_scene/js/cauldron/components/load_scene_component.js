import { Component } from "@wonderlandengine/api";
import { Globals } from "../../pp/pp/globals";
import { GamepadButtonID } from "../../pp/input/gamepad/gamepad_buttons";

export class LoadSceneComponent extends Component {
    static TypeName = "load-scene";
    static Properties = {};

    update(dt) {
        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd()) {
            Globals.getScene(this.engine).load("scene-1.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SQUEEZE).isPressEnd()) {
            Globals.getScene(this.engine).load("scene-2.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.TOP_BUTTON).isPressEnd()) {
            Globals.getScene(this.engine).load("load-scene.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.BOTTOM_BUTTON).isPressEnd()) {
            Globals.getScene(this.engine).load("scene-2-streamable-no-view.bin");
        }

        if (Globals.getRightGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd()) {
            Globals.getScene(this.engine).load("scene-3-skin.bin");
        }
    }
}