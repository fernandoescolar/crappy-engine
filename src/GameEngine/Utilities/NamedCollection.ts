import { INamedCollection } from './INamedCollection';

export class NamedCollection<T> implements INamedCollection<T> {
    private items!: { [key: string]: T };
    private count!: number;

    constructor() {
        this.clear();
    }

    public get length(): number {
        return this.getLength();
    }

    public getLength(): number {
        return this.count;
    }

    public get(key: string): T {
        return this.items[key];
    }

    public add(key: string, element: T): void {
        if (!this.containsKey(key)) {
            this.count++;
        }

        this.items[key] = element;
    }

    public remove(key: string): void {
        if (this.containsKey(key)) {
            delete this.items[key];
            this.count--;
        }
    }

    public containsKey(key: string): boolean {
        return (typeof this.items[key]) !== 'undefined';
    }

    public clear(): void {
        this.items = {};
        this.count = 0;
    }

    public forEach(callback: (key: string, value: T) => any): void {
        for (const name in this.items) {
            if (this.items.hasOwnProperty(name)) {
                const element: T = this.items[name];
                const ret: any = callback(name, element);
                if (ret === false) {
                    return;
                }
            }
        }
    }
}
