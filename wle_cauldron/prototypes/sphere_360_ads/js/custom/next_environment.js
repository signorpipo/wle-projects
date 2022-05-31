WL.registerComponent('next-environment', {
    environment: { type: WL.Type.Object },
}, {
    start() {
        let target = this.object.getComponent('cursor-target');

        this.parentEnvironment = this.object.parent;

        target.addClickFunction(() => {
            this.parentEnvironment.pp_setActive(false);
            this.environment.pp_setActive(true);
        });
    }
});