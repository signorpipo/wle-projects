WL.registerComponent('move-away-and-back', {
}, {
    start() {
        this.timer = new PP.Timer(1.5);
        this.object.pp_setPositionLocal([0, 10000, 0]);
    },
    update(dt) {
        if (this.timer.isRunning()) {
            this.timer.update(dt);
            if (this.timer.isDone()) {
                this.object.pp_resetTransformLocal();
                console.error("CIAO");
            }
        }
    }
});