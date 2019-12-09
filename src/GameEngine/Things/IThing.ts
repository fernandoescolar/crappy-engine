import { IPoint } from '../Primitives/IPoint';
import { ISize } from '../Primitives/ISize';
import { IRectangle } from '../Primitives/IRectangle';
import { IUpdateContext } from '../Utilities/IUpdateContext';

export interface IThing {
    id: string;
    position: IPoint;
    size: ISize;
    rect: IRectangle;

    update(context: IUpdateContext): void;
}
