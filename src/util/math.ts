/**
 * minMax
 * @param val
 * @param min
 * @param max
 */
export function minMax(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

/**
 * minMax 0 -> 1
 * @param val
 */
export function minMaxZeroOne(val: number): number {
    return minMax(val, 0, 1);
}
