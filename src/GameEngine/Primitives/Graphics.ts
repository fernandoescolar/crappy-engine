import { IPoint } from "./IPoint";
import { ISize } from "./ISize";
import { IRectangle } from "./IRectangle";
import { IGraphics } from "./IGraphics";

import { Point } from "./Point";
import { Size } from "./Size";
import { Rectangle } from "./Rectangle";

export class Graphics implements IGraphics {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private usingFastRender: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    public get screenSize(): ISize{
        return new Size(this.canvas.width, this.canvas.height);
    }

    public set screenSize(size: ISize) {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
    }

    public useFastRender(b: boolean): void {
        this.usingFastRender = b;
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public save(): void {
        this.context.save();
    }

    public restore(): void {
        this.context.restore();
    }

    public setAlpha(alpha: number): void {
        this.context.globalAlpha = alpha;
    }

    public drawImage(image: HTMLImageElement, canvasRect: IRectangle): void;
    public drawImage(image: HTMLImageElement, offsetRect: IRectangle, canvasRect: IRectangle): void;
    public drawImage(image: HTMLImageElement, rect: IRectangle, canvasRect?: IRectangle): void {
        var or: IRectangle = canvasRect ? rect : new Rectangle(new Point(0, 0), new Size(image.width, image.height));
        var cr: IRectangle = canvasRect || rect;
        or = this.fastRoundRect(or);
        cr = this.fastRoundRect(cr);
        this.context.drawImage(image, or.x, or.y, or.width, or.height, cr.x, cr.y, cr.width, cr.height);
    };

    public drawLine(p1: IPoint, p2: IPoint, width: number, color: string): void {
        p1 = this.fastRoundPoint(p1);
        p2 = this.fastRoundPoint(p2);

        this.save();
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawFullPath(backColor: string, lineWidth: number, lineColor: string, points: IPoint[]): void {
        let moved = false;
        
        this.save();
        this.context.beginPath();
        this.context.fillStyle = backColor;
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColor;
        points.forEach(p => {
            p = this.fastRoundPoint(p);
            if (moved) {
                this.context.lineTo(p.x, p.y);
                return;
            }

            this.context.moveTo(p.x, p.y);
            moved = true;
        });
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawFillPath(color: string, points: IPoint[]): void {
        let moved = false;

        this.save();
        this.context.beginPath();
        this.context.fillStyle = color;
        points.forEach(p => {
            p = this.fastRoundPoint(p);
            if (moved) {
                this.context.lineTo(p.x, p.y);
                return;
            }

            this.context.moveTo(p.x, p.y);
            moved = true;
        });
        this.context.fill();
        this.context.closePath();
        this.restore();
    }

    public drawPath(width: number, color: string, points: IPoint[]): void {
        let moved = false;
        
        this.save();
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        points.forEach(p => {
            p = this.fastRoundPoint(p);
            if (moved) {
                this.context.lineTo(p.x, p.y);
                return;
            }

            this.context.moveTo(p.x, p.y);
            moved = true;
        });
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawNeonPath(width: number, color: string, points: IPoint[]): void {
        let moved = false;
        
        this.save();
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.shadowBlur = 20;
        this.context.shadowColor = "white";
        points.forEach(p => {
            p = this.fastRoundPoint(p);
            if (moved) {
                this.context.lineTo(p.x, p.y);
                return;
            }

            this.context.moveTo(p.x, p.y);
            moved = true;
        });
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }


    public drawFullRect(r: IRectangle, backColor: string, lineWidth: number, lineColor: string): void {
        r = this.fastRoundRect(r);
        this.save();
        this.context.beginPath();
        this.context.fillStyle = backColor;
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColor;
        this.context.fillRect(r.x, r.y, r.width, r.height);
        this.context.rect(r.x, r.y, r.width, r.height);
        this.context.stroke();
        this.context.closePath();
        this.restore();
        // this may be slower:
        // this.drawFillRect(r, backColor);
        // this.drawStrokeRect(r, lineWidth, lineWidth);
    };

    public drawFillRect(r: IRectangle, color: string): void {
        r = this.fastRoundRect(r);

        this.save();
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.fillRect(r.x, r.y, r.width, r.height);
        this.context.closePath();
        this.restore();
    };

    public drawRect(r: IRectangle, width: number, color: string): void {
        r = this.fastRoundRect(r);

        this.save();
        this.context.beginPath();
        this.context.rect(r.x, r.y, r.width, r.height);
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.closePath();
        this.restore();
    };

    public drawFullTriangle(p1: IPoint, p2: IPoint, p3: IPoint, backColor: string, lineWidth: number, lineColor: string): void {
        p1 = this.fastRoundPoint(p1);
        p2 = this.fastRoundPoint(p2);
        p3 = this.fastRoundPoint(p3);

        this.save();
        this.context.beginPath();
        this.context.fillStyle = backColor;
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColor;
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.lineTo(p3.x, p3.y);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawFillTriangle(p1: IPoint, p2: IPoint, p3: IPoint, color: string): void {
        p1 = this.fastRoundPoint(p1);
        p2 = this.fastRoundPoint(p2);
        p3 = this.fastRoundPoint(p3);

        this.save();
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.lineTo(p3.x, p3.y);
        this.context.fill();
        this.context.closePath();
        this.restore();
    }

    public drawTriangle(p1: IPoint, p2: IPoint, p3: IPoint, width: number, color: string): void {
        p1 = this.fastRoundPoint(p1);
        p2 = this.fastRoundPoint(p2);
        p3 = this.fastRoundPoint(p3);

        this.save();
        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.lineTo(p3.x, p3.y);
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawFullCircle(p: IPoint, radious: number, backColor: string, lineWidth: number, lineColor: string): void {
        p = this.fastRoundPoint(p);

        this.save();
        this.context.beginPath();
        this.context.fillStyle = backColor;
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColor;
        this.context.arc(p.x, p.y, radious, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawFillCircle(p: IPoint, radious: number, color: string): void {
        p = this.fastRoundPoint(p);

        this.save();
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(p.x, p.y, radious, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.closePath();
        this.restore();
    }

    public drawCircle(p: IPoint, radious: number, width: number, color: string): void {
        p = this.fastRoundPoint(p);

        this.save();
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.arc(p.x, p.y, radious, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.closePath();
        this.restore();
    }

    public drawText(p: IPoint, text: string, color: string, fontSize: number, font: string): void {
        p = this.fastRoundPoint(p);

        this.save();
        this.context.fillStyle = color;
        this.context.font = fontSize + "px " + font;
        this.context.fillText(text, p.x, p.y);
        this.restore();
    };

    public drawCenteredText(r: IRectangle, text: string, color: string, fontSize: number, font: string): void {
        r = this.fastRoundRect(r);

        var measure: TextMetrics = this.context.measureText(text);
        this.save();
        this.context.fillStyle = color;
        this.context.font = fontSize + "px " + font;
        this.context.fillText(text, r.x + (r.width - measure.width) / 2, r.y + (r.height + fontSize / 2) / 2);
        this.restore();
    };


    private fastRoundRect(r: IRectangle): IRectangle {
        if (!this.usingFastRender) return r;
        r.x = this.fastRound(r.x);
        r.y = this.fastRound(r.y);
        r.width = this.fastRound(r.width);
        r.height = this.fastRound(r.height);

        return r;
    }

    private fastRoundPoint(r: IPoint): IPoint {
        if (!this.usingFastRender) r;
        r.x = this.fastRound(r.x);
        r.y = this.fastRound(r.y);

        return r;
    }

    private fastRound(number: number): number {
        return ~~(0.5 + number);
    }
}