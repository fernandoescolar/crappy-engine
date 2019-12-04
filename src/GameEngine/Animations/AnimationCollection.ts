import { IAnimation } from "./IAnimation";
import { IAnimationCollection } from "./IAnimationCollection";
import { NamedCollection } from "../Utilities/NamedCollection";

export class AnimationCollection extends NamedCollection<IAnimation> implements IAnimationCollection {
}