import { IAnimation } from "./IAnimation";
import { IRectangle } from "../Primitives/IRectangle";
import { IGraphics } from "../Primitives/IGraphics";
import { IUpdateContext } from "../Utilities/IUpdateContext";

export class StaticColorAnimation implements IAnimation {
    public id: string;
    public color: string;
    public frameIndex: number;
    public frameCount: number;

    constructor(id: string, color: string) {
        this.id = id;
        this.color = color;
        this.frameIndex = 0;
        this.frameCount = 1;
    }

    public update(context: IUpdateContext): void {
        return;
    }

    public draw(graphics: IGraphics, rect: IRectangle): void {
        graphics.drawFillRect(rect, this.color);
    }
}