import { IScenario } from './IScenario';
import { IScenarioCollection } from './IScenarioCollection';
import { NamedCollection } from './Utilities/NamedCollection';

export class ScenarioCollection extends NamedCollection<IScenario> implements IScenarioCollection {
}
