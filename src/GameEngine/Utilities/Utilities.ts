import { ISize } from "../Primitives/ISize";
import { IPoint } from "../Primitives/IPoint";
import { Point } from "../Primitives/Point";

import { IThing } from "../Things/IThing";
import { IMovableThing } from "../Things/IMovableThing";
import { IScalableThing } from "../Things/IScalableThing";

import { ICamera } from "../Cameras/ICamera";

import { Direction } from "./Direction";

export class Utilities {
    static collisionDetection(a: IThing, b: IThing): boolean {
        return Utilities.intersect(
            a.position.x, a.position.y, a.size.width, a.size.height,
            b.position.x, b.position.y, b.size.width, b.size.height);
    }

    static isVisibleInCamera(cam: ICamera, thg: IThing): boolean {
        return Utilities.intersect(
            cam.position.x, cam.position.y, cam.size.width, cam.size.height,
            thg.position.x, thg.position.y, thg.size.width, thg.size.height);
    }

    static intersect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
        return x1 <= (x2 + w2)
            && x2 <= (x1 + w1)
            && y1 <= (y2 + h2)
            && y2 <= (y1 + h1);
    }

    static collisionDirection(a: IThing, b: IThing): Direction {
        var aBottom: number = a.position.y + a.size.height;
        var bBottom: number = b.position.y + b.size.height;
        var aRight: number = a.position.x + a.size.width;
        var bRight: number = b.position.x + b.size.width;

        var bCollision: number = bBottom - a.position.y;
        var tCollision: number = aBottom - b.position.y;
        var lCollision: number = aRight - b.position.x;
        var rCollision: number = bRight - a.position.x;

        if (tCollision < bCollision && tCollision < lCollision && tCollision < rCollision) {
            return Direction.Up;
        }
        if (bCollision < tCollision && bCollision < lCollision && bCollision < rCollision) {
            return Direction.Down;
        }
        if (lCollision < rCollision && lCollision < tCollision && lCollision < bCollision) {
            return Direction.Left;
        }
        if (rCollision < lCollision && rCollision < tCollision && rCollision < bCollision) {
            return Direction.Right;
        }
        if (Utilities.collisionDetection(a, b)) {
            return Direction.All;
        }
        return Direction.None;
    }

    static calculateStep(from: number, to: number, delta: number): number {
        if (from === to) {
            return from;
        } else if (from < to) {
            return Math.min(from + delta, to);
        } else {
            return Math.max(from - delta, to);
        }
    }

    static calculateDelta(ticks: number, pixelsPerSecond: IPoint): IPoint {
        return new Point(ticks * pixelsPerSecond.x / 1000, ticks * pixelsPerSecond.y / 1000);
    }

    static moveCamera(cam: ICamera, target: IPoint, delta: IPoint): void {
        cam.screenPosition.x = Utilities.calculateStep(cam.screenPosition.x, target.x, delta.x);
        cam.screenPosition.y = Utilities.calculateStep(cam.screenPosition.y, target.y, delta.y);
    }

    static moveThing(obj: IThing, target: IPoint, delta: IPoint): void {
        obj.position.x = Utilities.calculateStep(obj.position.x, target.x, delta.x);
        obj.position.y = Utilities.calculateStep(obj.position.y, target.y, delta.y);
    }

    static scaleThing(obj: IThing, target: ISize, delta: IPoint): void {
        var width = Utilities.calculateStep(obj.size.width, target.width, delta.x);
        var height = Utilities.calculateStep(obj.size.height, target.height, delta.y);
        //var deltaW = (width - obj.size.width) / 2;
        //var deltaH = (height - obj.size.height) / 2;
        obj.size.width = width;
        obj.size.height = height;
        //obj.position.x = obj.position.x - deltaW;
        //obj.position.y = obj.position.y - deltaH;
    }

    static calculatePointPixelsPerSecond(pointA: IPoint, pointB: IPoint, milliseconds: number): IPoint {
        let x = (pointB.x - pointA.x) / milliseconds * 1000;
        let y = (pointB.y - pointA.y) / milliseconds * 1000;
        return new Point(Math.abs(x), Math.abs(y));
    }

    static calculateSizePixelsPerSecond(sizeA: ISize, sizeB: ISize, milliseconds: number): IPoint {
        let x = (sizeB.width - sizeA.width) / milliseconds * 1000;
        let y = (sizeB.height - sizeA.height) / milliseconds * 1000;
        return new Point(Math.abs(x), Math.abs(y));
    }
}