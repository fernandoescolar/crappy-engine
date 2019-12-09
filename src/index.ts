import { MyShooterGame } from './CrappyFighter/MyShooter';
import { Graphics } from './GameEngine';

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game');
    const graphics = new Graphics(canvas);
    const shooterGame = new MyShooterGame(graphics, canvas);

    shooterGame.start(60);
};
