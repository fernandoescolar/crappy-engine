import { IThing } from "./IThing";
import { ISize } from "../Primitives/ISize";
import { IPoint } from "../Primitives/IPoint";

export interface IScalableThing extends IThing {
    
    scale(size: ISize, pixelsPerSecond: IPoint): void;
    scale(size: ISize, pixelsPerSecond: IPoint, onScaled: () => void): void;

    scaleInTime(size: ISize, milliseconds: number): void;
    scaleInTime(size: ISize, milliseconds: number, onScaled: () => void): void;
}