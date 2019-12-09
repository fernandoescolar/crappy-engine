import { IAnimation } from './IAnimation';

import { IRectangle } from '../Primitives/IRectangle';
import { IGraphics } from '../Primitives/IGraphics';

import { IUpdateContext } from '../Utilities/IUpdateContext';

export class TextAnimation implements IAnimation {
    public id: string;
    public text: string;
    public color: string;
    public fontSize: number;
    public font: string;
    public frameIndex: number;
    public frameCount: number;

    constructor(id: string, text: string, color: string, fontSize?: number, font?: string) {
        this.id = id;
        this.frameCount = 0;
        this.frameIndex = 0;
        this.text = text;
        this.fontSize = fontSize || 10;
        this.font = font || 'Arial';
        this.color = color;
    }

    public update(context: IUpdateContext): void {
        return;
    }

    public draw(graphics: IGraphics, rect: IRectangle): void {
        graphics.drawText(rect, this.text, this.color, this.fontSize, this.font);
    }
}
