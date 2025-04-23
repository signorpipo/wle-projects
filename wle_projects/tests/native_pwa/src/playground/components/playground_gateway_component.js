import { Component } from "@wonderlandengine/api";
import { initPlayground } from "../init_playground.js";

let _myRegisteredEngines = new WeakMap();

export class PlaygroundGatewayComponent extends Component {
    static TypeName = "playground-gateway";

    static onRegister(engine) {
        if (!_myRegisteredEngines.has(engine)) {
            _myRegisteredEngines.set(engine, null);
            initPlayground(engine);
        }
    }
}