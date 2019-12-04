import { ISize } from "./ISize";

export class Size implements ISize {
    public width: number;
    public height: number;

    constructor();
    constructor(width: number, height: number);
    constructor(width?: any, height?: any) {
        this.width = width || 0;
        this.height = height || 0;
    }
}