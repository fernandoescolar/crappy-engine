import { IPoint } from "./IPoint";
import { ISize } from "./ISize";
import { IRectangle } from "./IRectangle";

export class Rectangle implements IRectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor();
    constructor(p: IPoint, s: ISize);
    constructor(p?: any, s?: any) {
        this.x = p.x;
        this.y = p.y;
        this.width = s.width;
        this.height = s.height;
    }
}