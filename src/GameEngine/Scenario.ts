import { IScenario } from './IScenario';
import { IResources } from './IResources';
import { Resources } from './Resources';

import { ICamera } from './Cameras/ICamera';
import { IThing } from './Things/IThing';
import { IUpdateContext } from './Utilities/IUpdateContext';
import { IGraphics } from './Primitives/IGraphics';

export class Scenario implements IScenario {
    public id: string;
    public resources: IResources;
    public things: Array<IThing>;
    public cameras: Array<ICamera>;

    constructor(id: string, ...cameras: Array<ICamera>) {
        this.id = id;
        this.things = [];
        this.cameras = cameras || [];
        this.resources = new Resources();
    }

    start(): void {
    }

    stop(): void {
    }

    update(graphics: IGraphics, context: IUpdateContext): void {
        graphics.clear();
        this.updateElements(graphics, context);
    }

    updateElements(graphics: IGraphics, context: IUpdateContext): void {
        this.things.forEach((sprite: IThing) => {
            sprite.update(context);
        });
        this.cameras.forEach((camera: ICamera) => {
            camera.update(context);
            camera.draw(graphics, this.things);
        });
    }
}
