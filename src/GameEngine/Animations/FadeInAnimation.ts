import { FadeAnimation } from "./FadeAnimation";

export class FadeInAnimation extends FadeAnimation {

    constructor(id: string, color: string) {
        super(id, color, false);
    }
}