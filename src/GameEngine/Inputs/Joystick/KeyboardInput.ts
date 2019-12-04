import { IJoystickInput } from "./IJoystickInput";

export class KeyboardInput implements IJoystickInput {
    private keyDownEventHandler: (ev: KeyboardEvent) => void;
    private keyUpEventHandler: (ev: KeyboardEvent) => void;

    public up: boolean;
    public down: boolean;
    public left: boolean;
    public rigth: boolean;
    public space: boolean;
    public onfire: () => void;

    constructor() {
        this.keyDownEventHandler = (ev: KeyboardEvent) => { this.onKeyDown(ev); };
        this.keyUpEventHandler = (ev: KeyboardEvent) => { this.onKeyUp(ev); };

        this.up = false;
        this.down = false;
        this.left = false;
        this.rigth = false;
        this.space = false;
    }

    public start(): void {
        document.addEventListener("keydown", this.keyDownEventHandler, true);
        document.addEventListener("keyup", this.keyUpEventHandler, true);
    }

    public stop(): void {
        document.removeEventListener("keydown", this.keyDownEventHandler, true);
        document.removeEventListener("keyup", this.keyUpEventHandler, true);
    }

    onKeyDown(ev: KeyboardEvent): boolean {
        ev.preventDefault();

        if (ev.keyCode === 38) {
            this.up = true;
        } else if (ev.keyCode === 40) {
            this.down = true;
        } else if (ev.keyCode === 39) {
            this.rigth = true;
        } else if (ev.keyCode === 37) {
            this.left = true;
        } else if (ev.keyCode === 32) {
            if (!this.space) {
                if (this.onfire) {
                    this.onfire();
                }
            }
            this.space = true;
        }

        return false;
    }

    onKeyUp(ev: KeyboardEvent): boolean {
        ev.preventDefault();

        if (ev.keyCode === 38) {
            this.up = false;
        } else if (ev.keyCode === 40) {
            this.down = false;
        } else if (ev.keyCode === 39) {
            this.rigth = false;
        } else if (ev.keyCode === 37) {
            this.left = false;
        } else if (ev.keyCode === 32) {
            this.space = false;
        }

        return false;
    }
}
