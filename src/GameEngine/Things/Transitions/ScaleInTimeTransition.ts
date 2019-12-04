import { ScaleTransition } from "./ScaleTransition";
import { IThing } from "../IThing";
import { ISize } from "../../Primitives/ISize";
import { Utilities } from "../../Utilities/Utilities";

export class ScaleInTimeTransition extends ScaleTransition {
    
    constructor(thing: IThing, targetSize: ISize, milliseconds: number, callback?: () => void) {
        super(targetSize, Utilities.calculateSizePixelsPerSecond(thing.size, targetSize, milliseconds), callback);
    }
}