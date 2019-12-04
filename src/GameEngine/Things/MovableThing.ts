import { IMovableThing } from "./IMovableThing";
import { IPoint } from "../Primitives/IPoint";
import { TransitionableThing } from "./TransitionableThing";
import { MoveTransition } from "./Transitions/MoveTransition";
import { MoveInTimeTransition } from "./Transitions/MoveInTimeTransition";


export class MovableThing extends TransitionableThing implements IMovableThing {
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
}