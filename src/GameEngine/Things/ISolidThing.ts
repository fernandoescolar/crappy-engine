import { IThing } from './IThing';
import { Direction } from '../Utilities/Direction';

export interface ISolidThing extends IThing {
    collision(obj: IThing): boolean;
    collisionDirection(obj: IThing): Direction;
}
