import { minMaxZeroOne } from '../util/math';

export const ACTION_TYPE = {
    FadeOutAndFadeIn: Symbol('fadeOutAndFadeIn'),
    FOO: Symbol('foo'),
};

export const DIRECTION_TYPE = {
    RIGHT: Symbol('right'),
    LEFT: Symbol('left'),
};

export class AnimationHandler {
    constructor(element) {
        this.progress = false;
        this.element = element;
        // 初期値
        this.DEFAULT_PARAMS = {
            duration: 1000,
            easing: 'linear',
            action: ACTION_TYPE.FadeOutAndFadeIn,
            direction: DIRECTION_TYPE.RIGHT,
        };
    }

    // 引数の管理
    paramsProcessor(params) {
        const paramsObj = { ...this.DEFAULT_PARAMS };
        if (params.duration) paramsObj.duration = params.duration;
        if (params.easing) paramsObj.easing = params.easing;
        if (params.action) paramsObj.action = params.action;
        if (params.direction) paramsObj.direction = params.direction;
        return paramsObj;
    }

    // todo: math to better more
    // todo 0-1 range
    static getPercentage(current, goal) {
        return minMaxZeroOne(current / goal);
    }

    start(params) {
        const currentParams = this.paramsProcessor(params);
        const { element } = this;
        let start = null;
        // 自分自身を引数に
        const step = timestamp => {
            if (!start) start = timestamp;
            const progressTime = timestamp - start;
            const percentage = this.getPercentage(progressTime, currentParams.duration);
            // element.style.transform = `translate3d(-${progressTime / 2}px, 0, -${progressTime / 10}px)`;
            // 一旦Z軸のことは難しいので忘れる
            // 折り返すので200
            if (currentParams.direction === DIRECTION_TYPE.RIGHT) {
                element.style.transform = `translate3d(${percentage * 200}vw, 0, 0)`;
                element.style.opacity = `${1 - percentage}`;
                if (percentage > 0.5) {
                    element.style.transform = `translate3d(-${(1 - percentage) * 200}vw, 0, 0)`;
                    element.style.opacity = `${percentage}`;
                }
            } else if (currentParams.direction === DIRECTION_TYPE.LEFT) {
                element.style.transform = `translate3d(-${percentage * 200}vw, 0, 0)`;
                element.style.opacity = `${1 - percentage}`;
                if (percentage > 0.5) {
                    element.style.transform = `translate3d(${(1 - percentage) * 200}vw, 0, 0)`;
                    element.style.opacity = `${percentage}`;
                }
            }
            if (progressTime <= currentParams.duration) {
                if (!this.progress) this.progress = true;
                window.requestAnimationFrame(step.bind(this));
            } else {
                this.progress = false;
            }
        };
        window.requestAnimationFrame(step.bind(this));
    }

    // ../util/math

    destroy() {
        this.element.style.transform = null;
    }
}
