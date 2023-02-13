WL.registerComponent('object-to-string', {
}, {
    init: function () {
    },
    start: function () {
        console.error(this.object.pp_toStringExtended());
    },
    update: function (dt) {
    },
});