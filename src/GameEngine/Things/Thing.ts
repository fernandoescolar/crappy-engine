import { IThing } from "./IThing";
import { IPoint } from "../Primitives/IPoint";
import { ISize } from "../Primitives/ISize";
import { IRectangle } from "../Primitives/IRectangle";
import { Point } from "../Primitives/Point";
import { Size } from "../Primitives/Size";
import { Rectangle } from "../Primitives/Rectangle";
import { IUpdateContext } from "../Utilities/IUpdateContext";

export class Thing implements IThing {
    public id: string;
    public position: IPoint;
    public size: ISize;
    public get rect(): IRectangle {
        return new Rectangle(this.position, this.size);
    }
    public set rect(r: IRectangle) {
        this.position.x = r.x;
        this.position.y = r.y;
        this.size.width = r.width;
        this.size.height = r.height;
    }

    constructor(id: string, position: IPoint, size: ISize);
    constructor(id: string);
    constructor(id: string, position?: any, size?: any) {
        this.id = id;
        this.position = position || new Point(0, 0);
        this.size = size || new Size(0, 0);
    }

    update(context: IUpdateContext): void {
        return;
    }
}