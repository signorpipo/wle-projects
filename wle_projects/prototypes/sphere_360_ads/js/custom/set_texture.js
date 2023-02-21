WL.registerComponent('set-texture', {
    texture: { type: WL.Type.Texture }
}, {
    start: function () {
        this.timer = new PP.Timer(1);
    },
    update(dt) {
        if (this.timer.isRunning()) {
            this.timer.update(dt);
            if (this.timer.isDone()) {
                //this.texture.update();
                let mesh = this.object.pp_getComponent("mesh");
                mesh.material = mesh.material.clone();
                mesh.material.flatTexture = this.texture;
            }
        }
    }
});