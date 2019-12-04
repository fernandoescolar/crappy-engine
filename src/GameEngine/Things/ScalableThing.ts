import { IScalableThing } from './IScalableThing';
import { ISize } from '../Primitives/ISize';
import { IPoint } from '../Primitives/IPoint';
import { TransitionableThing } from './TransitionableThing';
import { ScaleTransition } from './Transitions/ScaleTransition';
import { ScaleInTimeTransition } from './Transitions/ScaleInTimeTransition';

export class ScalableThing extends TransitionableThing implements IScalableThing {
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
