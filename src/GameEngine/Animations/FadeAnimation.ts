import { IAnimation } from './IAnimation';

import { IRectangle } from '../Primitives/IRectangle';
import { IGraphics } from '../Primitives/IGraphics';

import { IUpdateContext } from '../Utilities/IUpdateContext';


export class FadeAnimation implements IAnimation {
    public id: string;
    public frameIndex: number;
    public frameCount: number;
    public speed: number;

    public onEnd!: () => void;

    private alpha: number;
    private ticks: number;

    constructor(id: string, public color: string, private out: boolean = false) {
        this.id = id;
        this.frameCount = 0;
        this.frameIndex = 0;
        this.color = color;
        this.alpha = out ? 0 : 1;
        this.speed = 50;
        this.ticks = 0;
    }

    public update(context: IUpdateContext): void {
        if ((!this.out && this.alpha <= 0) || (this.out && this.alpha >= 1)) { return; }

        this.ticks += context.ticks;
        if (this.ticks / (100 - this.speed) >= 1) {
            this.ticks = 0;
            this.alpha += this.out ? 0.1 : -0.1;
            if (!this.out && this.alpha <= 0) { this.alpha = 0; }
            if (this.out && this.alpha >= 1) { this.alpha = 1; }
            if ((this.alpha === 0 || this.alpha === 1) && this.onEnd) { this.onEnd(); }
        }
    }

    public draw(graphics: IGraphics, rect: IRectangle): void {
        graphics.save();
        graphics.setAlpha(this.alpha);
        graphics.drawFillRect(rect, this.color);
        graphics.restore();
    }
}
