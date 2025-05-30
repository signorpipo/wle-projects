/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 */

import { WonderlandEngine } from '@wonderlandengine/api';

/* wle:auto-imports:start */
import {Cursor} from '@wonderlandengine/components';
import {FixedFoveation} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {TargetFramerate} from '@wonderlandengine/components';
import {ConsoleVRToolComponent} from './pp/index.js';
import {EasyTuneToolComponent} from './pp/index.js';
import {FingerCursorComponent} from './pp/index.js';
import {GamepadMeshAnimatorComponent} from './pp/index.js';
import {GrabberHandComponent} from './pp/index.js';
import {PPGatewayComponent} from './pp/index.js';
import {PlayerLocomotionComponent} from './pp/index.js';
import {ResetLocalTransformComponent} from './pp/index.js';
import {SetHandLocalTransformComponent} from './pp/index.js';
import {SetHeadLocalTransformComponent} from './pp/index.js';
import {ShowXRButtonsComponent} from './pp/index.js';
import {SpatialAudioListenerComponent} from './pp/index.js';
import {SwitchHandObjectComponent} from './pp/index.js';
import {ToolCursorComponent} from './pp/index.js';
import {TrackedHandDrawAllJointsComponent} from './pp/index.js';
import {VirtualGamepadComponent} from './pp/index.js';
/* wle:auto-imports:end */

export default function (engine: Readonly<WonderlandEngine>): void {
/* wle:auto-register:start */
engine.registerComponent(Cursor);
engine.registerComponent(FixedFoveation);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(TargetFramerate);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(FingerCursorComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(ResetLocalTransformComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(ShowXRButtonsComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
/* wle:auto-register:end */
}