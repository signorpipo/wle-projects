WL.registerComponent('deactivate-after-delay', {
    delay: { type: WL.Type.Float, default: 1.25 }
}, {
    start() {
        this.timer = new PP.Timer(this.delay);
    },
    update(dt) {
        if (this.timer.isRunning()) {
            this.timer.update(dt);
            if (this.timer.isDone()) {
                this.object.pp_setActive(false);
            }
        }
    }
});