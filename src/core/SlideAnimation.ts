import { Animation, DIRECTION_TYPE, AnimationParams } from './Animation';

export class SlideAnimation extends Animation {
    constructor(element, params: Partial<AnimationParams>) {
        super(element, params);
    }

    prev(): void {
        this.start({
            direction: DIRECTION_TYPE.LEFT,
        });
    }

    next(): void {
        this.start({
            direction: DIRECTION_TYPE.RIGHT,
        });
    }
}
