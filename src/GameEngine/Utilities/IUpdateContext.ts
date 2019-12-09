import { ISize } from '../Primitives/ISize';
import { IResources } from '../IResources';

export interface IUpdateContext {
    ticks: number;
    fps: number;
    screen: ISize;
    resources: IResources;
}
