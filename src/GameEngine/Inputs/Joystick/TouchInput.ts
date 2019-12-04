import { IJoystickInput } from "./IJoystickInput";

import { IThing } from "../../Things/IThing";
import { Thing } from "../../Things/Thing";
import { IDrawable } from "../../Things/IDrawable";

import { IPoint } from "../../Primitives/IPoint";
import { IGraphics } from "../../Primitives/IGraphics";
import { Point } from "../../Primitives/Point";
import { Size } from "../../Primitives/Size";

import { IUpdateContext } from "../../Utilities/IUpdateContext";
import { ICamera } from "../../Cameras/ICamera";

export class TouchInput extends Thing implements IThing, IDrawable, IJoystickInput {
    public up: boolean;
    public down: boolean;
    public left: boolean;
    public rigth: boolean;
    public onfire: () => void = () => {};

    private canvas: HTMLCanvasElement;
    private touchStartEventHandler: (e: any) => void;
    private touchMoveEventHandler: (e: any) => void;
    private touchEndEventHandler: (e: any) => void;

    private halfWidth: number;
    private activeTouchID: number;
    private leftTouchID: number;
    private leftTouchPos: IPoint;
    private leftTouchStartPos: IPoint;
    private leftVector: IPoint;
    private touches: any;

    constructor(canvas: HTMLCanvasElement, joystick: boolean = true) {
        super("touch-pad");
        this.up = false;
        this.down = false;
        this.left = false;
        this.rigth = false;
        this.position = new Point(0, 0);
        this.size = new Size(canvas.width, canvas.height);

        this.halfWidth = joystick ? canvas.width / 2 : 0;

        this.activeTouchID = -1;
        this.leftTouchID = -1;
        this.leftTouchPos = new Point(0, 0);
        this.leftTouchStartPos = new Point(0, 0);
        this.leftVector = new Point(0, 0);
        this.touches = [];

        this.canvas = canvas;
        this.touchStartEventHandler = (e: Event) => this.onTouchStart(e);
        this.touchMoveEventHandler = (e: Event) => this.onTouchMove(e);
        this.touchEndEventHandler = (e: Event) => this.onTouchEnd(e);
    }

    public start(): void {
        if (window.navigator.msPointerEnabled) {
            this.canvas.addEventListener("MSPointerDown", this.touchStartEventHandler, false);
            this.canvas.addEventListener("MSPointerMove", this.touchMoveEventHandler, false);
            this.canvas.addEventListener("MSPointerUp", this.touchEndEventHandler, false);
        }

        this.canvas.addEventListener("touchstart", this.touchStartEventHandler, false);
        this.canvas.addEventListener("touchmove", this.touchMoveEventHandler, false);
        this.canvas.addEventListener("touchend", this.touchEndEventHandler, false);
    }

    public stop(): void {
        if (window.navigator.msPointerEnabled) {
            this.canvas.removeEventListener("MSPointerDown", this.touchStartEventHandler, false);
            this.canvas.removeEventListener("MSPointerMove", this.touchMoveEventHandler, false);
            this.canvas.removeEventListener("MSPointerUp", this.touchEndEventHandler, false);
        }

        this.canvas.removeEventListener("touchstart", this.touchStartEventHandler, false);
        this.canvas.removeEventListener("touchmove", this.touchMoveEventHandler, false);
        this.canvas.removeEventListener("touchend", this.touchEndEventHandler, false);
    }

    public update(context: IUpdateContext): void {
        this.up = Math.abs(this.leftVector.y) >= 10 && this.leftVector.y < 0;
        this.down = Math.abs(this.leftVector.y) >= 10 && this.leftVector.y > 0;
        this.left = Math.abs(this.leftVector.x) >= 10 && this.leftVector.x < 0;
        this.rigth = Math.abs(this.leftVector.x) >= 10 && this.leftVector.x > 0;
    }
    
    public draw(graphics: IGraphics, camera: ICamera): void {
        for (var i: number = 0; i < this.touches.length; i++) {
            var touch: any = this.touches[i];
            if (touch.identifier === this.leftTouchID) {
                graphics.drawCircle(this.leftTouchStartPos, 40, 6, "cyan");
                graphics.drawCircle(this.leftTouchStartPos, 60, 2, "cyan");
                graphics.drawCircle(this.leftTouchPos, 40, 2, "cyan");
            } else {
                graphics.drawCircle(new Point(touch.clientX, touch.clientY), 40, 6, "red");
                // graphics.drawText(new Point(touch.clientX + 30, touch.clientY - 30),
                //                  "touch id : " + touch.identifier + " x:" + touch.clientX + " y:" + touch.clientY,
                //                  "white",
                //                  14,
                //                  "Verdana");
            }
        }
    }

    private getWindowsPhoneTouchEvent(e: any): any {
        return {
            identifier: e.pointerId,
            clientX: e.clientX,
            clientY: e.clientY
        };
    }

    private getWindowsPhoneStartTouchEvent(e: any): any {
        if (!this.touches) { this.touches = []; }
        var event: any = this.getWindowsPhoneTouchEvent(e);
        if (this.leftTouchID >= 0 && event.clientX < this.halfWidth) {
            this.touches = [];
            this.leftTouchID = -1;
        }

        this.touches.push(event);
        return event;
    }

    private getWindowsPhoneEndTouchEvent(e: any): any {
        var event: any = this.getWindowsPhoneTouchEvent(e);
        this.touches.forEach((touch: any, index: number) => {
            if (touch.identifier === event.identifier) {
                this.touches.splice(index, 1);
                return false;
            }
        });
        return event;
    }

    private onTouchStart(e: any): void {
        var changedTouches: any = e.changedTouches || [this.getWindowsPhoneStartTouchEvent(e)];
        for (var i: number = 0; i < changedTouches.length; i++) {
            var touch: any = changedTouches[i];
            if ((this.leftTouchID < 0) && (touch.clientX < this.halfWidth)) {
                this.leftTouchID = touch.identifier;
                this.leftTouchStartPos = new Point(touch.clientX, touch.clientY);
                this.leftTouchPos = new Point(touch.clientX, touch.clientY);
                this.leftVector = new Point(0, 0);
                continue;
            }

            if (this.onfire) {
                this.position = new Point(touch.clientX, touch.clientY);
                this.size = new Size(1, 1);
                this.activeTouchID = touch.identifier;
                this.onfire();
            }
        }

        this.touches = e.touches || this.touches;
    }

    private onTouchMove(e: any): void {
        e.preventDefault();

        var changedTouches: any = e.changedTouches || [this.getWindowsPhoneTouchEvent(e)];
        for (var i: number = 0; i < changedTouches.length; i++) {
            var touch: any = changedTouches[i];
            if (this.leftTouchID === touch.identifier) {
                this.leftTouchPos = new Point(touch.clientX, touch.clientY);
                this.leftVector = new Point(touch.clientX, touch.clientY);
                this.leftVector.x -= this.leftTouchStartPos.x;
                this.leftVector.y -= this.leftTouchStartPos.y;
                break;
            }
        }

        this.touches = e.touches || this.touches;
    }

    private onTouchEnd(e: any): void {
   	    this.touches = e.touches || this.touches;
        var changedTouches: any = e.changedTouches || [this.getWindowsPhoneEndTouchEvent(e)];
        for (var i: number = 0; i < changedTouches.length; i++) {
            var touch: any = changedTouches[i];
            if (this.leftTouchID === touch.identifier) {
                this.leftTouchID = -1;
                this.leftVector = new Point(0, 0);
            }

            if (this.activeTouchID === touch.identifier) {
                this.activeTouchID = -1;
                this.position = new Point(0, 0);
                this.size = new Size(0, 0);
            }
        }
    }
}