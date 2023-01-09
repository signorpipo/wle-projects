WL.registerComponent("reset-view-bug", {
    _myText: { type: WL.Type.Object }
}, {
    init() {
        this._myLastPosition = [0, 0, 0];
        this._myLastLastPosition = [0, 0, 0];
        this._myTextComponent = this._myText.getComponent("text");
    },
    start() {
        if (WL.xrSession) {
            this._onXRSessionStart(WL.xrSession);
        }
        WL.onXRSessionStart.push(this._onXRSessionStart.bind(this));
        WL.onXRSessionEnd.push(this._onXRSessionEnd.bind(this));
    },
    update(dt) {
        this._myLastLastPosition[0] = this._myLastPosition[0];
        this._myLastLastPosition[1] = this._myLastPosition[1];
        this._myLastLastPosition[2] = this._myLastPosition[2];

        let xrFrame = Module['webxr_frame'];
        if (xrFrame) {
            let xrPose = null;
            try {
                xrPose = xrFrame.getViewerPose(this._myReferenceSpace);;
            } catch (error) {
                // not handled, pose will be null
            }

            if (xrPose) {
                this._myLastPosition[0] = xrPose.transform.position.x;
                this._myLastPosition[1] = xrPose.transform.position.y;
                this._myLastPosition[2] = xrPose.transform.position.z;
            }
        }
    },
    _onXRSessionStart(session) {
        session.requestReferenceSpace(WebXR.refSpace).then(function (referenceSpace) {
            this._myReferenceSpace = referenceSpace;

            if (referenceSpace.addEventListener != null) {
                referenceSpace.addEventListener("reset", this._onViewReset.bind(this));
            }
        }.bind(this));
    },
    _onXRSessionEnd() {
        this._myReferenceSpace = null;
    },
    _onViewReset() {
        let text = "";
        text = text.concat("Last Last: [", this._myLastLastPosition[0].toFixed(4), ", ", this._myLastLastPosition[1].toFixed(4), ", ", this._myLastLastPosition[2].toFixed(4), "]\n");
        text = text.concat("Last: [", this._myLastPosition[0].toFixed(4), ", ", this._myLastPosition[1].toFixed(4), ", ", this._myLastPosition[2].toFixed(4), "]\n");
        this.update(0);
        text = text.concat("After View Reset: [", this._myLastPosition[0].toFixed(4), ", ", this._myLastPosition[1].toFixed(4), ", ", this._myLastPosition[2].toFixed(4), "]\n");
        this._myTextComponent.text = text;
    }
});