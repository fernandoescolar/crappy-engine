import { MyShooterGame } from "./CrappyFighter/MyShooter";
import { Graphics } from "./GameEngine";

window.onload = () => {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");
    let graphics = new Graphics(canvas);
    let shooterGame = new MyShooterGame(graphics, canvas);

    shooterGame.start(60);
};
