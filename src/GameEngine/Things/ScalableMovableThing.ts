import { IScalableMovableThing } from "./IScalableMovableThing";
import { IPoint } from "../Primitives/IPoint";
import { ISize } from "../Primitives/ISize";
import { TransitionableThing } from "./TransitionableThing";
import { MoveTransition } from "./Transitions/MoveTransition";
import { MoveInTimeTransition } from "./Transitions/MoveInTimeTransition";
import { ScaleTransition } from "./Transitions/ScaleTransition";
import { ScaleInTimeTransition } from "./Transitions/ScaleInTimeTransition";

export class ScalableMovableThing extends TransitionableThing implements IScalableMovableThing {
    move(position: IPoint, pixelsPerSecond: IPoint): void;
    move(position: IPoint, pixelsPerSecond: IPoint, onMoved: () => void): void;
    move(position: any, pixelsPerSecond: any, onMoved?: any) {
        this.addTransition(new MoveTransition(position, pixelsPerSecond, onMoved));
    }
    
    moveInTime(position: IPoint, milliseconds: number): void;
    moveInTime(position: IPoint, milliseconds: number, onMoved: () => void): void;
    moveInTime(position: any, milliseconds: any, onMoved?: any) {
        this.addTransition(new MoveInTimeTransition(this, position, milliseconds, onMoved));
    }

    scale(size: ISize, pixelsPerSecond: IPoint): void;
    scale(size: ISize, pixelsPerSecond: IPoint, onScaled: () => void): void;
    scale(size: any, pixelsPerSecond: any, onScaled?: any) {
        this.addTransition(new ScaleTransition(size, pixelsPerSecond, onScaled));
    }

    scaleInTime(size: ISize, milliseconds: number): void;
    scaleInTime(size: ISize, milliseconds: number, onScaled: () => void): void;
    scaleInTime(size: any, milliseconds: any, onScaled?: any) {
        this.addTransition(new ScaleInTimeTransition(this, size, milliseconds, onScaled));
    }
    
}