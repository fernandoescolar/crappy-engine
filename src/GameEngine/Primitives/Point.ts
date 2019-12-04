import { IPoint } from './IPoint';

export class Point implements IPoint {

    public x: number;
    public y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: any, y?: any) {
        this.x = x || 0;
        this.y = y || 0;
    }
}
