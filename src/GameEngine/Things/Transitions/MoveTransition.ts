import { ITransition } from './ITransition';
import { IThing } from '../IThing';
import { IPoint } from '../../Primitives/IPoint';
import { Utilities } from '../../Utilities/Utilities';
import { IUpdateContext } from '../../Utilities/IUpdateContext';

export class MoveTransition implements ITransition {
    private hasFinished: boolean = false;

    public get type(): string {
        return 'move';
    }

    public get finished(): boolean {
        return this.hasFinished;
    }

    constructor(private targetPosition: IPoint, private pixelsPerSecond: IPoint, private callback?: () => void) {
    }

    update(thing: IThing, context: IUpdateContext): void {
        const delta: IPoint = Utilities.calculateDelta(context.ticks, this.pixelsPerSecond);
        if (this.targetPosition) {
            Utilities.moveThing(thing, this.targetPosition, delta);
            if (this.targetPosition.x === thing.position.x && this.targetPosition.y === thing.position.y) {
                this.targetPosition = null as any;
                if (this.callback) {
                    this.callback();
                    this.callback = null as any;
                }

                this.hasFinished = true;
            }
        }
    }
}
