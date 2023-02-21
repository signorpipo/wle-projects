WL.registerComponent("activate-on-session", {
}, {
    start: function () {
        if (WL.xrSession) {
            this._onXRSessionStart(WL.xrSession);
        }
        WL.onXRSessionStart.push(this._onXRSessionStart.bind(this));
    },
    _onXRSessionStart: function () {
        this.object.pp_setActive(true);
    }
});