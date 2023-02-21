WL.registerComponent('open-link', {
}, {
    init() {
    },
    start() {
        this._myTimer = 0;
        if (WL.xrSession) {
            this._onXRSessionStart(WL.xrSession);
        }
        WL.onXRSessionStart.push(this._onXRSessionStart.bind(this));
    },
    update(dt) {
        if (this._myTimer > 0) {
            this._myTimer -= dt;
            if (this._myTimer <= 0) {
                WL.xrSession.end();
                window.open("https://heyvr.io/game/labyroots", "_blank");
            }
        }
    },
    _onXRSessionStart(session) {
        this._myTimer = 2;
        session.addEventListener("selectend", this._openLink.bind(this));
        session.addEventListener("squeezeend", this._openLink.bind(this));
    },
    _openLink() {
        this._myTimer = 2;
    }
});