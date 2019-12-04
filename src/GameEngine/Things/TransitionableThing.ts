import { Thing } from "./Thing";
import { IUpdateContext } from "../Utilities/IUpdateContext";
import { ITransition } from "./Transitions/ITransition";

export class TransitionableThing extends Thing {
    private transitions: ITransition[] = [];

    update(context: IUpdateContext): void {
        super.update(context);

        let finishedTransitions: ITransition[] = [];
        this.transitions.forEach(transition => {
            transition.update(this, context);
            if (transition.finished) {
                finishedTransitions.push(transition);
            }
        });

        finishedTransitions.forEach(transition => {
            this.removeTransition(transition);
        });
    }

    protected addTransition(transition: ITransition): void {
        this.clearTranstionsOfSameType(transition);
        this.transitions.push(transition);
    }

    protected removeTransition(transition: ITransition): void {
        let index = this.transitions.indexOf(transition);
        if (index >= 0) {
            this.transitions.splice(index, 1);
        }
    }

    protected clearTransitions(): void {
        this.transitions = [];
    }

    private clearTranstionsOfSameType(transition: ITransition) {
        this.transitions.some(t => {
            if (t.type == transition.type) {
                this.removeTransition(t);
                return true;
            }

            return false;
        });
    }
}