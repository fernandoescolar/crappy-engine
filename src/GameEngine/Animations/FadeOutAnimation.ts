import { FadeAnimation } from './FadeAnimation';

export class FadeOutAnimation extends FadeAnimation {

    constructor(id: string, color: string) {
        super(id, color, true);
    }
}
