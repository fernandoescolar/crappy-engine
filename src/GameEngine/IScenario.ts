import { IResources } from './IResources';
import { IThing } from './Things/IThing';
import { IGraphics } from './Primitives/IGraphics';
import { IUpdateContext } from './Utilities/IUpdateContext';
import { ICamera } from './Cameras/ICamera';

export interface IScenario {
    resources: IResources;
    things: Array<IThing>;
    id: string;
    cameras: Array<ICamera>;

    start(): void;
    update(graphics: IGraphics, updateContext: IUpdateContext): void;
    stop(): void;
}
