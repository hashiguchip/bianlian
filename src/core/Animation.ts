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
    element: HTMLElement;
    direction: DIRECTION_TYPE;
    half?: () => void;
    finish?: () => void;
}

export class Animation {
    element: HTMLElement;

    progress: boolean;

    stopWatch = new StopWatch();

    animationParams: AnimationParams;

    static defaultParams: AnimationParams = {
        duration: 1000,
        easing: 'linear',
        element: null,
        direction: DIRECTION_TYPE.RIGHT,
    };

    constructor(params: Partial<AnimationParams>) {
        this.progress = false;
        this.element = params.element;
        this.animationParams = { ...Animation.defaultParams, ...this.paramsProcessor(params) };
        if (this.element) this.element.style.width = '100%';
    }

    // 引数の管理
    paramsProcessor(params: Partial<AnimationParams>): Partial<AnimationParams> {
        const paramsObj: Partial<AnimationParams> = {};
        if (params.duration) paramsObj.duration = params.duration;
        if (params.easing) paramsObj.easing = params.easing;
        if (params.direction) paramsObj.direction = params.direction;
        if (params.half) paramsObj.half = params.half;
        if (params.finish) paramsObj.finish = params.finish;
        return paramsObj;
    }

    // todo: math to better more
    // todo 0-1 range
    static getPercentage(current, goal): number {
        return minMaxZeroOne(current / goal);
    }

    start(params): Promise<void> {
        let yetHalf = false;
        return new Promise<void>(resolve => {
            this.stopWatch.play();
            const currentParams = { ...this.animationParams, ...this.paramsProcessor(params) };
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
                    element.style.transform = `translate3d(${percentage * 200}%, 0, 0)`;
                    element.style.opacity = `${1 - percentage}`;
                    if (percentage > 0.5) {
                        if (!yetHalf) {
                            currentParams.half();
                            yetHalf = true;
                        }
                        element.style.transform = `translate3d(-${(1 - percentage) * 200}%, 0, 0)`;
                        element.style.opacity = `${percentage}`;
                        if (percentage === 1) {
                            currentParams.finish();
                            resolve();
                        }
                    }
                } else if (currentParams.direction === DIRECTION_TYPE.LEFT) {
                    element.style.transform = `translate3d(-${percentage * 200}%, 0, 0)`;
                    element.style.opacity = `${1 - percentage}`;
                    if (percentage > 0.5) {
                        if (!yetHalf) {
                            currentParams.half();
                            yetHalf = true;
                        }
                        element.style.transform = `translate3d(${(1 - percentage) * 200}%, 0, 0)`;
                        element.style.opacity = `${percentage}`;
                        if (percentage === 1) {
                            currentParams.finish();
                            resolve();
                        }
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
        });
    }

    pause(): void {
        // TODO: TDW
        this.stopWatch.pause();
    }

    destroy(): void {
        this.element.style.transform = null;
    }
}
