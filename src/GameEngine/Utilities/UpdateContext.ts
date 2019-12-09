import { IUpdateContext } from './IUpdateContext';
import { IResources } from '../IResources';
import { ISize } from '../Primitives/ISize';

export class UpdateContext implements IUpdateContext {
    public resources!: IResources;
    constructor(public ticks: number, public fps: number, public screen: ISize) {
    }
}
