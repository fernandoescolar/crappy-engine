import { IThing } from "../IThing";
import { IUpdateContext } from "../../Utilities/IUpdateContext";

export interface ITransition {
    readonly type: string;
    readonly finished: boolean;
    update(thing: IThing, context: IUpdateContext): void;
}