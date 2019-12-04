import { IScenario } from './IScenario';
import { IScenarioCollection } from './IScenarioCollection';
import { IGraphics } from './Primitives/IGraphics';

export interface IGame {
    scenarios: IScenarioCollection;
    graphics: IGraphics;
    currentScenarioKey: string;
    currentScenario: IScenario;

    updateState(): void;
    update(): void;
}
