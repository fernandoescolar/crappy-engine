import { IThing } from "./IThing";
import { Thing } from "./Thing";
import { ISolidThing } from "./ISolidThing";
import { Utilities } from "../Utilities/Utilities";
import { Direction } from "../Utilities/Direction";

export class SolidThing extends Thing implements ISolidThing {
    collision(obj: IThing): boolean {
        return Utilities.collisionDetection(this, obj);
    }
    collisionDirection(obj: IThing): Direction {
        return Utilities.collisionDirection(this, obj);
    }
}