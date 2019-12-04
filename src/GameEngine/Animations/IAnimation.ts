import { IUpdateContext } from "../Utilities/IUpdateContext";
import { IRectangle } from "../Primitives/IRectangle";
import { IGraphics } from "../Primitives/IGraphics";

export interface IAnimation {
    id: string;
    frameIndex: number;
    frameCount: number;
    update(context: IUpdateContext): void;
    draw(graphics: IGraphics, rect: IRectangle): void;
}