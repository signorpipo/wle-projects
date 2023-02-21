import * as glMatrix from 'gl-matrix';

WL.registerComponent('test-raycast', {
}, {
    init: function () {
    },
    start: function () {
        this.origin = new Float32Array(3);
        this.direction = new Float32Array(3);
    },
    update: function (dt) {
        for (let i = 0; i < 1000; i++) {
            this.origin[0] = Math.pp_random(-100, 100);
            this.origin[1] = Math.pp_random(-100, 100);
            this.origin[2] = Math.pp_random(-100, 100);

            this.direction[0] = Math.pp_random(-100, 100);
            this.direction[1] = Math.pp_random(-100, 100);
            this.direction[2] = Math.pp_random(-100, 100);

            glMatrix.vec3.normalize(this.direction, this.direction);

            let internalRaycastResults = WL.physics.rayCast(
                this.origin,
                this.direction,
                255,
                300);
        }
    },
});