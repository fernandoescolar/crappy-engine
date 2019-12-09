import { ICamera } from './ICamera';

import { IDrawable } from '../Things/IDrawable';

import { IPoint } from '../Primitives/IPoint';
import { Point } from '../Primitives/Point';
import { ISize } from '../Primitives/ISize';
import { Size } from '../Primitives/Size';
import { IRectangle } from '../Primitives/IRectangle';
import { Rectangle } from '../Primitives/Rectangle';
import { IGraphics } from '../Primitives/IGraphics';
import { IUpdateContext } from '../Utilities/IUpdateContext';

import { Utilities } from '../Utilities/Utilities';
import { ScalableMovableThing } from '../Things/ScalableMovableThing';

export class Camera extends ScalableMovableThing implements ICamera {
    public screenPosition: IPoint;
    public screenSize: ISize;

    private internalZoom: number;

    public get screenRect(): IRectangle {
        return new Rectangle(this.screenPosition, this.screenSize);
    }

    public set screenRect(r: IRectangle) {
        this.screenPosition.x = r.x;
        this.screenPosition.y = r.y;
        this.screenSize.width = r.width;
        this.screenSize.height = r.height;
    }

    public get zoom(): number {
        return this.internalZoom;
    }

    public set zoom(z: number) {
        this.size = new Size(this.screenSize.width / z, this.screenSize.height / z);
    }

    constructor(id: string, position: IPoint, size: ISize);
    constructor(id: string, position: IPoint, size: ISize, vpPosition: IPoint, vpSize: ISize);
    constructor(id: string, position: IPoint, size: ISize, vpPosition?: any, vpSize?: any) {
        super(id, position, size);
        this.screenPosition = vpPosition || new Point(position.x, position.y);
        this.screenSize = vpSize || new Size(size.width, size.height);
        this.internalZoom = 1.0;
    }

    update(context: IUpdateContext): void {
        super.update(context);

        this.internalZoom = this.screenSize.width / this.size.width;
    }

    public makeZoom(z: number, pixelsPerSecond: IPoint): void {
        this.scale(new Size(this.screenSize.width / z, this.screenSize.height / z), pixelsPerSecond);
    }


    public makeZoomInTime(z: number, milliseconds: number): void {
        this.scaleInTime(new Size(this.screenSize.width / z, this.screenSize.height / z), milliseconds);
    }

    public draw(graphics: IGraphics, drawables: Array<any>): void {
        for (let i: number = 0; i < drawables.length; i++) {
            if (Utilities.isVisibleInCamera(this, drawables[i])) {
                if (drawables[i].draw) {
                    const drawable: IDrawable = <IDrawable>drawables[i];
                    drawable.draw(graphics, this);
                }
            }
        }
    }
}
