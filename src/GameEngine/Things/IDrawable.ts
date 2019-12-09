import { IGraphics } from '../Primitives/IGraphics';
import { ICamera } from '../Cameras/ICamera';

export interface IDrawable {
    draw(graphics: IGraphics, camera: ICamera): void;
}
