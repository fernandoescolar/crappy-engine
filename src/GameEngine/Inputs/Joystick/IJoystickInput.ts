export interface IJoystickInput {
    up: boolean;
    down: boolean;
    left: boolean;
    rigth: boolean;
    onfire: () => void;

    start(): void;
    stop(): void;
}