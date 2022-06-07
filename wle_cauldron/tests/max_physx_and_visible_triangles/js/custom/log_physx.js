WL.registerComponent('log-physx', {
}, {
    start: function () {
        let physx = this.object.pp_getComponent("physx");
        console.log(physx);
    },
    update: function (dt) {
    },
});