import { IPoint } from "../Primitives/IPoint";
import { ISize } from "../Primitives/ISize";
import { IRectangle } from "../Primitives/IRectangle";
import { IGraphics } from "../Primitives/IGraphics";
import { IMovableThing } from "../Things/IMovableThing";

export interface ICamera extends IMovableThing {
    screenPosition: IPoint;
    screenSize: ISize;
    screenRect: IRectangle;
    zoom: number;
    draw(graphics: IGraphics, drawables: Array<any>): void;
    makeZoom(z: number, pixelsPerSecond: IPoint): void;
    makeZoomInTime(z: number, milliseconds: number): void;
}