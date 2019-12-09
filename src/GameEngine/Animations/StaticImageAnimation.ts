import { IAnimation } from './IAnimation';

import { IRectangle } from '../Primitives/IRectangle';
import { IGraphics } from '../Primitives/IGraphics';


import { IUpdateContext } from '../Utilities/IUpdateContext';

export class StaticImageAnimation implements IAnimation {
    public id: string;
    public frameIndex: number;
    public frameCount: number;

    private image: HTMLImageElement;

    constructor(id: string, image: HTMLImageElement) {
        this.id = id;
        this.image = image;
        this.frameIndex = 0;
        this.frameCount = 1;
    }

    public update(context: IUpdateContext): void {
        return;
    }

    public draw(graphics: IGraphics, rect: IRectangle): void {
        this.internalDraw(graphics, this.image, rect);
    }

    internalDraw(graphics: IGraphics, image: HTMLImageElement, rect: IRectangle): void {
        graphics.drawImage(image, rect);
    }
}
