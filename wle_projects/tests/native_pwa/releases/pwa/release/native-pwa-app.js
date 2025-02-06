// src/app.ts
import { loadRuntime, LogLevel } from "@wonderlandengine/api";
var waitWindowLoad = new Promise((resolve) => {
  if (document.readyState == "complete") {
    resolve();
  } else {
    window.addEventListener("load", resolve, { once: true });
  }
});
await waitWindowLoad;
var Constants = {
  ProjectName: "native-pwa",
  RuntimeBaseName: "WonderlandRuntime",
  WebXRRequiredFeatures: ["local"],
  WebXROptionalFeatures: ["local", "local-floor", "hand-tracking"]
};
var RuntimeOptions = {
  physx: true,
  loader: false,
  xrFramebufferScaleFactor: 1,
  xrOfferSession: {
    mode: "auto",
    features: Constants.WebXRRequiredFeatures,
    optionalFeatures: Constants.WebXROptionalFeatures
  },
  canvas: "canvas"
};
var disableEngineLogs = false;
if (disableEngineLogs) {
  RuntimeOptions.logs = [LogLevel.Error];
}
var engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);
engine.onLoadingScreenEnd.once(() => {
  engine.requestXRSession("immersive-vr", Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures).catch((e) => console.error(e));
  const el = document.getElementById("version");
  if (el)
    setTimeout(() => el.remove(), 2e3);
});
function requestSession(mode) {
  engine.requestXRSession(mode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures).catch((e) => console.error(e));
}
function setupButtonsXR() {
  const arButton = document.getElementById("ar-button");
  if (arButton) {
    arButton.dataset.supported = engine.arSupported;
    arButton.addEventListener("click", () => requestSession("immersive-ar"));
  }
  const vrButton = document.getElementById("vr-button");
  if (vrButton) {
    vrButton.dataset.supported = engine.vrSupported;
    vrButton.addEventListener("click", () => requestSession("immersive-vr"));
  }
}
setupButtonsXR();
var sceneLoadDelaySeconds = 0;
if (sceneLoadDelaySeconds > 0) {
  await new Promise((resolve) => setTimeout(resolve, sceneLoadDelaySeconds * 1e3));
}
try {
  await engine.loadMainScene(`${Constants.ProjectName}.bin`);
} catch (error) {
  console.error(error);
  window.alert(`Failed to load ${Constants.ProjectName}.bin: ` + error);
}
//# sourceMappingURL=native-pwa-app.js.map
