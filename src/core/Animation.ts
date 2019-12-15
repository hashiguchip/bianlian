import { minMaxZeroOne } from '../util/math';
import { StopWatch } from '../modules/StopWatch';
import { EasingLibrary, EasingType } from '../util/easing';

export enum DIRECTION_TYPE {
    RIGHT,
    LEFT,
}

export interface AnimationParams {
    duration: number;
    easing: EasingType;
    direction: DIRECTION_TYPE;
}

export class Animation {
    element: HTMLElement;

    progress: boolean;

    stopWatch = new StopWatch();

    animationParams: AnimationParams;

    static defaultParams: AnimationParams = {
        duration: 1000,
        easing: 'linear',
        direction: DIRECTION_TYPE.RIGHT,
    };

    constructor(element: Animation['element'], params: Partial<AnimationParams>) {
        this.progress = false;
        this.element = element;
        const initParams = this.paramsProcessor(params);
        this.animationParams = initParams;
    }

    // 引数の管理
    paramsProcessor(params: Partial<AnimationParams>): AnimationParams {
        const paramsObj = { ...Animation.defaultParams };
        if (params.duration) paramsObj.duration = params.duration;
        if (params.easing) paramsObj.easing = params.easing;
        if (params.direction) paramsObj.direction = params.direction;
        return paramsObj;
    }

    // todo: math to better more
    // todo 0-1 range
    static getPercentage(current, goal): number {
        return minMaxZeroOne(current / goal);
    }

    start(params): void {
        this.stopWatch.play();
        const currentParams = { ...this.paramsProcessor(params), ...this.animationParams };
        const { element } = this;
        let start = null;
        // 自分自身を引数に
        const step = (timestamp: number): void => {
            if (!start) start = timestamp;
            const progressTime = timestamp - start;
            const percentage = EasingLibrary[currentParams.easing](
                Animation.getPercentage(progressTime, currentParams.duration)
            );
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

    pause(): void {
        this.stopWatch.pause();
        // this.stopWatch.getElapsedTime();
    }

    // ../util/math

    destroy(): void {
        this.element.style.transform = null;
    }
}
