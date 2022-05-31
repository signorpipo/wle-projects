WL.registerComponent('link-on-click', {
    url: { type: WL.Type.String, default: "https://wonderlandengine.com/vr" },
    openInNewTab: { type: WL.Type.Bool, default: true },
}, {
    start: function () {
        let target = this.object.getComponent('cursor-target');

        target.addClickFunction(() => {
            if (WL.xrSession) {
                WL.xrSession.end();
            }

            if (this.openInNewTab) {
                window.open(this.url, "_blank");
            } else {
                window.location = this.url;
            }
        });
    }
});