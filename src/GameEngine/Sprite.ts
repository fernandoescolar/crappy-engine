import { ISprite } from "./ISprite";

import { ICamera } from "./Cameras/ICamera";

import { Point } from "./Primitives/Point";
import { Size } from "./Primitives/Size";
import { Rectangle } from "./Primitives/Rectangle";
import { IGraphics } from "./Primitives/IGraphics";

import { SolidScalableMovableThing } from "./Things/SolidScalableMovableThing";

import { IAnimationCollection } from "./Animations/IAnimationCollection";
import { AnimationCollection } from "./Animations/AnimationCollection";
import { IAnimation } from "./Animations/IAnimation";

import { IUpdateContext } from "./Utilities/IUpdateContext";
import { IRectangle } from "../GameEngine";


export class Sprite extends SolidScalableMovableThing implements ISprite {

    public animations: IAnimationCollection;

    private currentKey: string;
    private screenRect: IRectangle;

    constructor(id: string, ...animations: Array<IAnimation>) {
        super(id);

        this.animations = new AnimationCollection();
        animations = animations || [];
        animations.forEach((animation: IAnimation) => { this.animations.add(animation.id, animation); });

        if (animations.length >= 1) {
            this.currentKey = animations[0].id;
        }
    }

    public get inScreenRect(): IRectangle {
        return this.screenRect;
    }

    public get currentAnimationKey(): string {
        return this.currentKey;
    }

    public set currentAnimationKey(key: string) {
        this.currentKey = key;
    }

    public get currentAnimation(): IAnimation {
        return this.animations.get(this.currentKey);
    }

    update(context: IUpdateContext): void {
        super.update(context);

        var currentAnimation: IAnimation = this.currentAnimation;
        if (currentAnimation) {
            currentAnimation.update(context);
        }
    }

    draw(graphics: IGraphics, camera: ICamera): void {
        var currentAnimation: IAnimation = this.currentAnimation;
        if (currentAnimation) {
            var x: number = (this.position.x - camera.position.x) * camera.zoom + camera.screenPosition.x;
            var y: number = (this.position.y - camera.position.y) * camera.zoom + camera.screenPosition.y;
            var w: number = this.size.width * camera.zoom;
            var h: number = this.size.height * camera.zoom;

            this.screenRect = new Rectangle(new Point(x, y), new Size(w, h));
            currentAnimation.draw(graphics, this.screenRect);
        }
    }
}