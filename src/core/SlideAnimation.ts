import { Animation, ACTION_TYPE, DIRECTION_TYPE, AnimationParams } from './Animation';

export class SlideAnimation extends Animation {
    constructor(element, params: Partial<AnimationParams>) {
        super(element, params);
    }

    prev(): void {
        this.start({
            duration: 1000,
            action: ACTION_TYPE.FadeOutAndFadeIn,
            direction: DIRECTION_TYPE.LEFT,
        });
    }

    next(): void {
        this.start({
            duration: 1000,
            action: ACTION_TYPE.FadeOutAndFadeIn,
            direction: DIRECTION_TYPE.RIGHT,
        });
    }
}
