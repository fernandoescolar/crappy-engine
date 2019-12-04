import { MoveTransition } from './MoveTransition';
import { IThing } from '../IThing';
import { IPoint } from '../../Primitives/IPoint';
import { Utilities } from '../../Utilities/Utilities';

export class MoveInTimeTransition extends MoveTransition {

    constructor(thing: IThing, targetPosition: IPoint, milliseconds: number, callback?: () => void) {
        super(targetPosition, Utilities.calculatePointPixelsPerSecond(thing.position, targetPosition, milliseconds), callback);
    }
}
