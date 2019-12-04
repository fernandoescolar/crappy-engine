import { ICamera } from "./ICamera";
import { Camera } from "./Camera";

import { IThing } from "../Things/IThing";

import { IPoint } from "../Primitives/IPoint";
import { ISize } from "../Primitives/ISize";

import { IUpdateContext } from "../Utilities/IUpdateContext";

export class FollowCamera extends Camera implements ICamera {

    public thingToFollow: IThing;

    constructor(id: string, position: IPoint, size: ISize, thingToFollow?: IThing);
    constructor(id: string, position: IPoint, size: ISize, vpPosition?: IPoint, vpSize?: ISize, thingToFollow?: IThing);
    constructor(id: string, position: IPoint, size: ISize, vpPosition?: any, vpSize?: any, thingToFollow?: IThing) {
        super(id, position, size, vpPosition, vpSize);

        if (thingToFollow) this.follow(thingToFollow);
    }

    public follow(thing: IThing) {
        this.thingToFollow = thing;
    }

    public unfollow() {
        this.thingToFollow = null;
    }

    public update(context: IUpdateContext): void {
        if (this.thingToFollow)
            this.moveInTime(this.thingToFollow.position, 500);
        else
            super.update(context);
    }
}