import { Component } from '@wonderlandengine/api';

export class RaycastPerfSpikes extends Component {
    static TypeName = 'raycast-perf-spikes';


    private frameCount = 0;
    private averageTime = 0;
    private origin = [2, -1, 3];
    private direction = [0, 1, 0];

    update(dt: number) {
        const physics = this.engine.physics

        const now = window.performance.now();

        for (let i = 0; i < 100; i++) {
            physics.rayCast(this.origin, this.direction, 255, 10);
        }

        const then = window.performance.now();

        const timeElapsed = (then - now);
        if (timeElapsed > this.averageTime * 2) {
            console.error("spike: " + timeElapsed.toFixed(3) + "ms - average: " + this.averageTime.toFixed(3) + "ms - frame between spikes: " + this.frameCount);
            this.frameCount = 0;
        }

        this.averageTime = (this.averageTime + timeElapsed) / 2;
        this.frameCount++;
    }
}
