import { minMaxZeroOne } from '../util/math';
import { StopWatch } from '../modules/StopWatch';

export enum ACTION_TYPE {
    FadeOutAndFadeIn,
    FOO,
}

export enum DIRECTION_TYPE {
    RIGHT,
    LEFT,
}

interface IAnimationParams {
    duration: number;
    easing: string;
    action: ACTION_TYPE;
    direction: DIRECTION_TYPE;
}

export class AnimationHandler {
    element: HTMLElement;
    progress: boolean;
    stopWatch = new StopWatch();
    static defaultParams: IAnimationParams = {
        duration: 1000,
        easing: 'linear',
        action: ACTION_TYPE.FadeOutAndFadeIn,
        direction: DIRECTION_TYPE.RIGHT,
    };
    constructor(element) {
        this.progress = false;
        this.element = element;
    }

    // 引数の管理
    paramsProcessor(params: Partial<IAnimationParams>): IAnimationParams {
        const paramsObj = { ...AnimationHandler.defaultParams };
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
        this.stopWatch.play();
        const currentParams = this.paramsProcessor(params);
        const { element } = this;
        let start = null;
        // 自分自身を引数に
        const step = timestamp => {
            if (!start) start = timestamp;
            const progressTime = timestamp - start;
            const percentage = AnimationHandler.getPercentage(progressTime, currentParams.duration);
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

    pause() {
        this.stopWatch.pause();
        const aaa = this.stopWatch.getElapsedTime();
        console.log(aaa);
    }

    // ../util/math

    destroy() {
        this.element.style.transform = null;
    }
}
