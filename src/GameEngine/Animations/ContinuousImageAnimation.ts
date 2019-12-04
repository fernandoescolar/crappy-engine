import { IAnimation } from './IAnimation';
import { StaticImageAnimation } from './StaticImageAnimation';

import { ISize } from '../Primitives/ISize';
import { IRectangle } from '../Primitives/IRectangle';
import { IGraphics } from '../Primitives/IGraphics';
import { Size } from '../Primitives/Size';
import { Point } from '../Primitives/Point';
import { Rectangle } from '../Primitives/Rectangle';

import { IUpdateContext } from '../Utilities/IUpdateContext';

export class ContinuousImageAnimation extends StaticImageAnimation implements IAnimation {
    public speed: number;
    public imageSize: ISize;

    private offset: number;

    constructor(id: string, image: HTMLImageElement) {
        super(id, image);
        this.speed = 50;
        this.offset = 0;
        let w: number = image.width;
        let h: number = image.height;
        this.imageSize = new Size(w, h);
    }

    public update(context: IUpdateContext): void {
        super.update(context);
        let delta: number = context.ticks / (100 - this.speed);
        this.offset += delta;
        if (this.offset > this.imageSize.width) {
            this.offset = 0;
        }
    }

    internalDraw(graphics: IGraphics, image: HTMLImageElement, rect: IRectangle): void {
        if ((this.imageSize.width - this.offset) < rect.width) {
            let offsetA: number = this.imageSize.width - this.offset;
            let offsetB: number = this.imageSize.width - offsetA;
            graphics.drawImage(
                image,
                new Rectangle(new Point(this.offset, 0), new Size(offsetA, rect.height)),
                new Rectangle(new Point(rect.x, rect.y), new Size(offsetA, rect.height))
            );

            graphics.drawImage(
                image,
                new Rectangle(new Point(0, 0), new Size(offsetB, rect.height)),
                new Rectangle(new Point(offsetA, 0), new Size(offsetB, rect.height))
            );
        } else {
            graphics.drawImage(
                image,
                new Rectangle(new Point(this.offset, 0), new Size(rect.width, rect.height)),
                rect
            );
        }
    }
}
