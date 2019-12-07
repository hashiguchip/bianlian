import { AnimationHandler, ACTION_TYPE, DIRECTION_TYPE } from './AnimationHandler';

export class SlideAnimation extends AnimationHandler {
    constructor(element) {
        super(element);
    }
    prev() {
        this.start({
            duration: 1000,
            action: ACTION_TYPE.FadeOutAndFadeIn,
            direction: DIRECTION_TYPE.LEFT,
        });
    }

    next() {
        this.start({
            duration: 1000,
            action: ACTION_TYPE.FadeOutAndFadeIn,
            direction: DIRECTION_TYPE.RIGHT,
        });
    }
}
