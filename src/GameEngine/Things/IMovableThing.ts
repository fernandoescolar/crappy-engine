import { IThing } from "./IThing";
import { IPoint } from "../Primitives/IPoint";

export interface IMovableThing extends IThing {
    
    move(position: IPoint, pixelsPerSecond: IPoint): void;
    move(position: IPoint, pixelsPerSecond: IPoint, onMoved: () => void): void;

    moveInTime(position: IPoint, milliseconds: number): void;
    moveInTime(position: IPoint, milliseconds: number, onMoved: () => void): void;
}