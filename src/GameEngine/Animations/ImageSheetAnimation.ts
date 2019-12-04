import { IAnimation } from './IAnimation';
import { StaticImageAnimation } from './StaticImageAnimation';

import { ISize } from '../Primitives/ISize';
import { IGraphics } from '../Primitives/IGraphics';
import { IRectangle } from '../Primitives/IRectangle';
import { Point } from '../Primitives/Point';
import { Size } from '../Primitives/Size';
import { Rectangle } from '../Primitives/Rectangle';

import { IUpdateContext } from '../Utilities/IUpdateContext';

export class ImageSheetAnimation extends StaticImageAnimation implements IAnimation {
    public loop: boolean;
    public imageSize: ISize;
    public speed: number;
    public hasEnd: boolean;

    private ticks: number;
    private frames: Array<IRectangle> = [];

    constructor(id: string, image: HTMLImageElement, frameSize: ISize, loop?: boolean, frameIndexes?: Array<number>) {
        super(id, image);

        this.loop = (typeof loop === 'undefined') ? true : loop;
        this.speed = 50;
        this.ticks = 0;
        this.hasEnd = false;

        let columns: number = image.width / frameSize.width;
        let rows: number = image.height / frameSize.height;
        this.frameCount = (typeof frameIndexes === 'undefined') ? columns * rows : frameIndexes.length;
        this.imageSize = frameSize;
        this.initializeFrames(columns, rows, frameIndexes);
    }

    public update(context: IUpdateContext): void {
        super.update(context);
        this.ticks += context.ticks;
        if (this.ticks / (100 - this.speed) >= 1) {
            this.ticks = 0;
            if (this.frameIndex < this.frameCount - 1) {
                this.frameIndex += 1;
            } else if (this.loop) {
                this.frameIndex = 0;
            } else {
                this.hasEnd = true;
            }
        }
    }

    internalDraw(graphics: IGraphics, image: HTMLImageElement, rect: IRectangle): void {
        let frameRect: IRectangle = this.frames[this.frameIndex];

        graphics.drawImage(
            image,
            frameRect,
            rect
        );
    }

    initializeFrames(columns: number, rows: number, frameIndexes?: Array<number>): void {
        if (typeof frameIndexes === 'undefined') {
            for (let i: number = 0; i < this.frameCount; i++) {
                this.addFrame(i, columns, rows);
            }
        } else {
            frameIndexes.forEach( (i: number) => {
                this.addFrame(i, columns, rows);
            });
        }
    }

    addFrame(index: number, columns: number, rows: number): void {
        let row: number = Math.ceil(index / columns);
        let column: number = Math.ceil(index % columns);

        this.frames.push(new Rectangle(new Point(column * this.imageSize.width, row * this.imageSize.height), this.imageSize));
    }
}
