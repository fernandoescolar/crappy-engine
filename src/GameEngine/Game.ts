import { IGame } from './IGame';
import { IScenario } from './IScenario';
import { IScenarioCollection } from './IScenarioCollection';
import { ScenarioCollection } from './ScenarioCollection';

import { ICamera } from './Cameras/ICamera';
import { Camera } from './Cameras/Camera';

import { IUpdateContext } from './Utilities/IUpdateContext';
import { UpdateContext } from './Utilities/UpdateContext';

import { IGraphics } from './Primitives/IGraphics';
import { Point } from './Primitives/Point';

export class Game implements IGame {
    public scenarios: IScenarioCollection;
    public graphics: IGraphics;

    private currentKey: string = '';
    private framesPerSecond: number = 0;
    private fpsInterval: number = 0;
    private lastTime: number;
    private isRunning: boolean = false;
    private loopHandler: number = -1;

    constructor(graphics: IGraphics, ...scenarios: Array<IScenario>) {
        this.graphics = graphics;
        this.scenarios = new ScenarioCollection();
        scenarios = scenarios || [];
        scenarios.forEach((scenario: IScenario) => { this.scenarios.add(scenario.id, scenario); });

        if (scenarios.length >= 1) {
            this.currentKey = scenarios[0].id;
        }

        this.lastTime = 0;
    }

    public get currentScenarioKey(): string {
        return this.currentKey;
    }

    public set currentScenarioKey(key: string) {
        if (this.currentKey)
            this.currentScenario.stop();

        this.currentKey = key;
        this.currentScenario.start();
    }

    public get currentScenario(): IScenario {
        return this.scenarios.get(this.currentKey);
    }

    public createDefaultCamera(): ICamera {
        return new Camera('default', new Point(0, 0), this.graphics.screenSize);
    }

    public start(framesPerSecond: number): void {
        if (this.isRunning) { return; }
        this.isRunning = true;
        this.framesPerSecond = framesPerSecond;
        this.fpsInterval = 1000 / framesPerSecond;
        this.lastTime = Date.now();

        const update = () => {
            this.update();
            this.loopHandler = window.requestAnimationFrame(update);
        };

        update();
    }

    public stop(): void {
        if (!this.isRunning) { return; }
        this.isRunning = false;
        window.cancelAnimationFrame(this.loopHandler);
    }

    public updateState(): void {
        return;
    }

    public update(): void {
        const now: number = Date.now();
        let ticks: number = now - this.lastTime;
        ticks = ticks <= 0 ? 1 : ticks;

        if (!this.isRunning) { return; }
        if (this.fpsInterval > ticks) { return; }

        this.updateState();
        this.lastTime = now;
        const context: IUpdateContext = new UpdateContext(ticks, this.framesPerSecond, this.graphics.screenSize);
        this.currentScenario.update(this.graphics, context);
    }
}
