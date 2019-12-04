import { ScalableMovableThing } from "./ScalableMovableThing";
import { ISolidScalableMovableThing } from "./ISolidScalableMovableThing";
import { IThing } from "./IThing";
import { Utilities } from "../Utilities/Utilities";
import { Direction } from "../Utilities/Direction";

export class SolidScalableMovableThing extends ScalableMovableThing implements ISolidScalableMovableThing {
    collision(obj: IThing): boolean {
        return Utilities.collisionDetection(this, obj);
    }
    collisionDirection(obj: IThing): Direction {
        return Utilities.collisionDirection(this, obj);
    }
}