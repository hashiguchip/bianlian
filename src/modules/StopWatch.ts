import { convertMsToSeconds } from './util/DateTime';

interface TimerHistory {
    start: number;
    stop: number;
}
export class StopWatch {
    static readonly default = 0;

    private playing = false;

    private start: number;

    private history: TimerHistory[] = [];

    public play(): void {
        if (this.playing) return;
        this.playing = true;
        this.start = StopWatch.getNow();
    }

    public pause(): void {
        if (!this.playing) return;
        this.playing = false;
        this.history.push(StopWatch.createHistoryObj(this.start, StopWatch.getNow()));
    }

    // todo: add args to options params like a date format
    public getElapsedTime(): number {
        if (!this.history) {
            return StopWatch.default;
        }
        return convertMsToSeconds(
            this.history.reduce<number>((accumulation: number, currentValue: TimerHistory): number => {
                return accumulation + currentValue.stop - currentValue.start;
            }, 0)
        );
    }

    static getNow(): number {
        return new Date().getTime();
    }

    static createHistoryObj(start: number, stop: number): TimerHistory {
        return { start, stop };
    }
}
