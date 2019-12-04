import { ISolidScalableMovableThing } from "./Things/ISolidScalableMovableThing";
import { IDrawable } from "./Things/IDrawable";
import { IAnimationCollection } from "./Animations/IAnimationCollection";
import { IRectangle } from "../GameEngine";

export interface ISprite extends ISolidScalableMovableThing, IDrawable {
    readonly inScreenRect: IRectangle;
    animations: IAnimationCollection;
    currentAnimationKey: string;
}