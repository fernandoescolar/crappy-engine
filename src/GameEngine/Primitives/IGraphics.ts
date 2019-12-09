import { IPoint } from './IPoint';
import { ISize } from './ISize';
import { IRectangle } from './IRectangle';

export interface IGraphics {
    screenSize: ISize;

    clear(): void;
    save(): void;
    restore(): void;
    setAlpha(alpha: number): void;

    drawImage(image: HTMLImageElement, canvasRect: IRectangle): void;
    drawImage(image: HTMLImageElement, offsetRect: IRectangle, canvasRect: IRectangle): void;
    drawImage(image: HTMLImageElement, rect: IRectangle, canvasRect?: IRectangle): void;

    drawLine(p1: IPoint, p2: IPoint, width: number, color: string): void;

    drawFullPath(backColor: string, lineWidth: number, lineColor: string, points: IPoint[]): void;

    drawFillPath(color: string, points: IPoint[]): void;

    drawPath(width: number, color: string, points: IPoint[]): void;

    drawNeonPath(width: number, color: string, points: IPoint[]): void;

    drawFullRect(r: IRectangle, backColor: string, lineWidth: number, lineColor: string): void;

    drawFillRect(r: IRectangle, color: string): void;

    drawRect(r: IRectangle, width: number, color: string): void;

    drawFullTriangle(p1: IPoint, p2: IPoint, p3: IPoint, backColor: string, lineWidth: number, lineColor: string): void;

    drawFillTriangle(p1: IPoint, p2: IPoint, p3: IPoint, color: string): void;

    drawTriangle(p1: IPoint, p2: IPoint, p3: IPoint, width: number, color: string): void;

    drawFullCircle(p: IPoint, radious: number, backColor: string, lineWidth: number, lineColor: string): void;

    drawFillCircle(p: IPoint, radious: number, color: string): void;

    drawCircle(p: IPoint, radious: number, width: number, color: string): void;

    drawText(p: IPoint, text: string, color: string, fontSize: number, font: string): void;

    drawCenteredText(r: IRectangle, text: string, color: string, fontSize: number, font: string): void;
}
