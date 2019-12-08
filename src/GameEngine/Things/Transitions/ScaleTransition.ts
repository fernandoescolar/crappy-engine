import { ITransition } from './ITransition';
import { IThing } from '../IThing';
import { IPoint } from '../../Primitives/IPoint';
import { ISize } from '../../Primitives/ISize';
import { Utilities } from '../../Utilities/Utilities';
import { IUpdateContext } from '../../Utilities/IUpdateContext';

export class ScaleTransition implements ITransition {
    private hasFinished: boolean = false;

    public get type(): string {
        return 'scale';
    }

    public get finished(): boolean {
        return this.hasFinished;
    }

    constructor(private targetSize: ISize, private pixelsPerSecond: IPoint, private callback?: () => void) {
    }

    update(thing: IThing, context: IUpdateContext): void {
        const delta: IPoint = Utilities.calculateDelta(context.ticks, this.pixelsPerSecond);
        if (this.targetSize) {
            Utilities.scaleThing(thing, this.targetSize, delta);
            if (this.targetSize.width === thing.size.width && this.targetSize.height === thing.size.height) {
                this.targetSize = null as any;
                if (this.callback) {
                    this.callback();
                    this.callback = null as any;
                }

                this.hasFinished = true;
            }
        }
    }
}
