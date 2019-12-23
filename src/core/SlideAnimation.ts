import { Animation, DIRECTION_TYPE, AnimationParams } from './Animation';

interface SlideAnimationParams {
    half?: AnimationParams['half'];
    finish?: AnimationParams['finish'];
}

export class SlideAnimation extends Animation {
    constructor(params: Partial<AnimationParams>) {
        super(params);
    }

    prev(events: SlideAnimationParams): Promise<void> {
        return this.start({
            direction: DIRECTION_TYPE.LEFT,
            half: events.half,
            finish: events.finish,
        });
    }

    next(events: SlideAnimationParams): Promise<void> {
        return this.start({
            direction: DIRECTION_TYPE.RIGHT,
            half: events.half,
            finish: events.finish,
        });
    }
}
