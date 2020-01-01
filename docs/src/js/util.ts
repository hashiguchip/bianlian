declare global {
    interface Array<T> {
        deepCopy(): Array<T>;
    }
}
Array.prototype.deepCopy = function() {
    return this.slice();
};

export class ToggleColors {
    private readonly master = [];
    private colors = [];
    public constructor(args: string[]) {
        this.master = args;
        this.colors = this.master.deepCopy();
    }
    public getColor() {
        if (this.master.length === 0) {
            throw new Error('colors is empty');
        }
        const result = this.colors.shift();
        if (result !== undefined) return result;
        this.colors = this.master.deepCopy();
        return this.getColor();
    }
}
