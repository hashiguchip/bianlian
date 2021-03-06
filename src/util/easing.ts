export type EasingType = Exclude<keyof typeof EasingLibrary, 'prototype'>;

export class EasingLibrary {
    private constructor() {
        /* must not instantiate */
    }

    // no easing, no acceleration
    static linear(t): number {
        return t;
    }

    // accelerating from zero velocity
    static easeInQuad(t): number {
        return t * t;
    }

    // decelerating to zero velocity
    static easeOutQuad(t): number {
        return t * (2 - t);
    }

    // acceleration until halfway, then deceleration
    static easeInOutQuad(t): number {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // accelerating from zero velocity
    static easeInCubic(t): number {
        return t * t * t;
    }

    // decelerating to zero velocity
    static easeOutCubic(t): number {
        return --t * t * t + 1;
    }

    // acceleration until halfway, then deceleration
    static easeInOutCubic(t): number {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // accelerating from zero velocity
    static easeInQuart(t): number {
        return t * t * t * t;
    }

    // decelerating to zero velocity
    static easeOutQuart(t): number {
        return 1 - --t * t * t * t;
    }

    // acceleration until halfway, then deceleration
    static easeInOutQuart(t): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    }

    // accelerating from zero velocity
    static easeInQuint(t): number {
        return t * t * t * t * t;
    }

    // decelerating to zero velocity
    static easeOutQuint(t): number {
        return 1 + --t * t * t * t * t;
    }

    // acceleration until halfway, then deceleration
    static easeInOutQuint(t): number {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
}
