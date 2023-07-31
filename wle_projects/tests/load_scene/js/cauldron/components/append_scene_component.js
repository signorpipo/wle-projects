import { Component } from "@wonderlandengine/api";
import { Globals } from "../../pp/pp/globals";
import { GamepadButtonID } from "../../pp/input/gamepad/gamepad_buttons";

export class AppendSceneComponent extends Component {
    static TypeName = "append-scene";
    static Properties = {};

    update(dt) {
        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd()) {
            Globals.getScene(this.engine).append("scene-2-streamable-no-view.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SQUEEZE).isPressEnd()) {
            Globals.getScene(this.engine).append("scene-2-streamable.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.TOP_BUTTON).isPressEnd()) {
            Globals.getScene(this.engine).append("scene-2.bin");
        }

        if (Globals.getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.BOTTOM_BUTTON).isPressEnd()) {
            Globals.getScene(this.engine).append("load-scene.bin");
        }

        if (Globals.getRightGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd()) {
            Globals.getScene(this.engine).append("scene-2-streamable-no-view-skin.bin");
        }

        if (Globals.getRightGamepad(this.engine).getButtonInfo(GamepadButtonID.SQUEEZE).isPressEnd()) {
            Globals.getScene(this.engine).append("load-scene-no-view.bin");
        }

        if (Globals.getRightGamepad(this.engine).getButtonInfo(GamepadButtonID.TOP_BUTTON).isPressEnd()) {
            Globals.getScene(this.engine).append("scene-4.bin");
        }
    }
}