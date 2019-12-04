import * as Engine from '../GameEngine';
import { StartScene, ShooterGame, ShooterScenario, Player, Enemy, Shot, ExplosionType } from './Shooter';
import { KeyboardInput } from '../GameEngine/Inputs/Joystick/KeyboardInput';
import { TouchInput } from '../GameEngine';
import { IThing } from '../GameEngine/Things/IThing';

export class MyShooterGame extends ShooterGame {
    constructor(graphics: Engine.IGraphics, canvas: HTMLCanvasElement) {
        super(graphics);
        this.initialize(new MyStartScene(new TouchInput(canvas, false), this.camera), new MyShooterScenario(new TouchInput(canvas, true), this.camera));
    }
}

class MyStartScene extends StartScene {

    constructor(pad: Engine.IJoystickInput, camera: Engine.ICamera) {
        super(pad, camera);

        this.resources.loadImage('background', 'images/background.sketch.png');
        this.resources.loadAudio('background-music', 'sound/acapella-start.mp3');
        this.resources.preload(() => { this.createScene(); this.start(); });
    }

    createScene(): void {
        let transitionAnimation = new Engine.FadeInAnimation('transition', '#000000');
        let transitionSprite = new Engine.Sprite('transition', transitionAnimation);
        transitionSprite.position.x = 0;
        transitionSprite.position.y = 0;
        transitionSprite.size.width = this.width;
        transitionSprite.size.height = this.height;

        let bgAnimation = new Engine.StaticImageAnimation('background', this.resources.images.get('background'));
        let bgSprite = new Engine.Sprite('background', bgAnimation);
        bgSprite.position.x = 0;
        bgSprite.position.y = 0;
        bgSprite.size.width = this.width;
        bgSprite.size.height = this.height;

        let animation = new Engine.TextAnimation('title', 'Crappy Fighter', '#000000', 90, 'Sketch');
        let sprite = new Engine.Sprite('title', animation);
        sprite.size.width = 550;
        sprite.size.height = 100;
        sprite.position.x = (this.width - sprite.size.width) / 2;
        sprite.position.y = -100;

        this.things.push(bgSprite);
        this.things.push(sprite);
        this.things.push(transitionSprite);

        transitionAnimation.onEnd = () => sprite.move(new Engine.Point((this.width - sprite.size.width) / 2, (this.height - sprite.size.height) / 2),
                                                      new Engine.Point(120, 120),
                                                      () => this.ready());
    }

    ready(): void {
        let animation = new Engine.TextAnimation('title', 'Touch screen to start', '#000000', 40, 'Sketch');
        let sprite = new Engine.Sprite('title', animation);
        sprite.size.width = 360;
        sprite.size.height = 100;
        sprite.position.x = (this.width - sprite.size.width) / 2;
        sprite.position.y = -100;
        // sprite.speed = 90;

        this.things.push(sprite);
        sprite.move(new Engine.Point((this.width - sprite.size.width) / 2, (this.height - sprite.size.height) / 2 + 100), new Engine.Point(200, 200));
    }

    start(): void {
        this.resources.playAudioLoop('background-music');
        this.pad.start();
    }

    stop(): void {
        this.pad.stop();
        this.resources.stopAudioLoop('background-music');
        super.stop();
    }

    startGame(): void {
        let transitionAnimation = new Engine.FadeOutAnimation('transition', '#000000');
        let transitionSprite = new Engine.Sprite('transition', transitionAnimation);
        transitionSprite.position.x = 0;
        transitionSprite.position.y = 0;
        transitionSprite.size.width = this.width;
        transitionSprite.size.height = this.height;

        this.things.push(transitionSprite);
        transitionAnimation.onEnd = () => {
            super.startGame();
            setTimeout(() => {
                let index = this.things.indexOf(transitionSprite);
                this.things.splice(index, 1);
            }, 500);
        };
    }
}
class MyShooterScenario extends ShooterScenario {
    constructor(public pad: TouchInput, camera: Engine.ICamera) {
        super(pad, camera);

        this.resources.loadImage('background', 'images/background.sketch.png');
        this.resources.loadImage('background-paralax', 'images/starfield.png');
        this.resources.loadImage('player', 'images/player.sketch.64x25.png');
        this.resources.loadImage('live', 'images/live.sketch.png');
        this.resources.loadImage('enemy-1', 'images/enemy.sketch.40x30.png');
        this.resources.loadImage('enemy-2', 'images/enemy.sketch.40x30.png');
        this.resources.loadImage('enemy-3', 'images/enemy.sketch.40x30.png');
        this.resources.loadImage('enemy-4', 'images/enemy.sketch.40x30.png');
        this.resources.loadImage('shot', 'images/shot.sketch.png');
        this.resources.loadImage('enemy-shot', 'images/enemy-shot.sketch.png');
        this.resources.loadImage('explosion-enemy', 'images/explosion-enemy.sketch.png');
        this.resources.loadImage('explosion-enemy-destroy', 'images/explosion-enemy-destroy.sketch.png');
        this.resources.loadImage('explosion-player', 'images/explosion-player.sketch.png');
        this.resources.loadImage('explosion-player-destroy', 'images/explosion-player-destroy.sketch.png');

        this.resources.loadAudio('background-music', 'sound/acapella-music.mp3');
        this.resources.loadAudio('laser', 'sound/acapella-shot.mp3');
        this.resources.loadAudio('enemy-laser', 'sound/acapella-enemy-shot.mp3');
        this.resources.loadAudio('explosion', 'sound/acapella-explosion.mp3');
        this.resources.loadAudio('touched', 'sound/acapella-touched.mp3');
        this.resources.loadAudio('gameover', 'sound/acapella-gameover.mp3');
    }

    createBackgroundLayer(imgName: string, speed: number): Engine.Sprite {
        let animation = new Engine.ContinuousImageAnimation(imgName, this.resources.images.get(imgName));
        let sprite = new Engine.Sprite(imgName, animation);
        sprite.position.x = 0;
        sprite.position.y = 0;
        sprite.size.width = this.width;
        sprite.size.height = this.height;
        animation.speed = speed;

        return sprite;
    }

    createBackground(speed: number): Engine.Sprite {
        let sprite = this.createBackgroundLayer('background', speed);
        this.things.push(sprite);

        return this.createBackgroundLayer('background-paralax', speed + 20);
    }

    createScore(): Engine.TextAnimation {
        let animation = new Engine.TextAnimation('score', '', '#000000', 30, 'Sketch');
        let score = new Engine.Sprite('score', animation);
        score.position.x = 10;
        score.position.y = 30;

        this.things.push(score);

        return animation;
    }

    createPlayer(x?: number, y?: number): Player {
        let animation = new Engine.ImageSheetAnimation('player', this.resources.images.get('player'), new Engine.Size(64, 25), true);
        let player = new Player(this.pad, animation, 3, this.width, this.height);
        player.position.x = x || Math.random() * this.width;
        player.position.y = y || Math.random() * this.height;
        player.size.width = animation.imageSize.width;
        player.size.height = animation.imageSize.height;
        animation.speed = 60;

        return player;
    }

    createPlayerLive(): Engine.ISprite {
        let animation = new Engine.StaticImageAnimation('player-life', this.resources.images.get('live'));
        let sprite = new Engine.Sprite('player-life', animation);
        sprite.size = new Engine.Size(32, 16);
        return sprite;
    }

    createEnemy(): Enemy {
        let id = parseInt((Math.random() * 3).toFixed(0)) + 1;
        let animation = new Engine.ImageSheetAnimation('enemy', this.resources.images.get('enemy-' + id), new Engine.Size(40, 30));
        animation.speed = Math.random() * 50 + 40;

        let sprite = new Enemy(animation, 1);
        sprite.size.width = animation.imageSize.width;
        sprite.size.height = animation.imageSize.height;

        return sprite;
    }

    createEnemyShot(): Enemy {
        let animation = new Engine.ImageSheetAnimation('enemy-shoot', this.resources.images.get('enemy-shot'), new Engine.Size(16, 16));
        animation.speed = 60;

        let sprite = new Enemy(animation, 3);
        sprite.size.width = animation.imageSize.width;
        sprite.size.height = animation.imageSize.height;

        if (!this.resources.onlyOneAudio)
            this.resources.playAudio('enemy-laser');

        return sprite;
    }

    createShot(): Shot {
        let animation = new Engine.ImageSheetAnimation('shot', this.resources.images.get('shot'), new Engine.Size(16, 16), true);
        let shot = new Shot(950, animation);
        shot.position.x = this.player.position.x + 60;
        shot.position.y = this.player.position.y + 7;
        shot.size.width = animation.imageSize.width;
        shot.size.height = animation.imageSize.height;

        this.resources.playAudio('laser');

        return shot;
    }

    createExplosion(explosionType: ExplosionType): Engine.Sprite {
        let sprite: Engine.Sprite;
        if (explosionType === ExplosionType.Player) {
            let animation = new Engine.ImageSheetAnimation('explosion', this.resources.images.get('explosion-player'), new Engine.Size(16, 16), false);
            animation.speed = 50;
            sprite = new Engine.Sprite('explosion', animation);
            sprite.size.width = animation.imageSize.width;
            sprite.size.height = animation.imageSize.height;
            this.resources.playAudio('touched');
        }
        if (explosionType === ExplosionType.PlayerDestroyed) {
            let animation = new Engine.ImageSheetAnimation('explosion', this.resources.images.get('explosion-player-destroy'), new Engine.Size(64, 20), false);
            animation.speed = 50;
            sprite = new Engine.Sprite('explosion', animation);
            sprite.size.width = animation.imageSize.width;
            sprite.size.height = animation.imageSize.height;
            this.resources.playAudio('explosion');
        }
        if (explosionType === ExplosionType.Enemy) {
            let animation = new Engine.ImageSheetAnimation('explosion', this.resources.images.get('explosion-enemy'), new Engine.Size(16, 16), false);
            animation.speed = 50;
            sprite = new Engine.Sprite('explosion', animation);
            sprite.size.width = animation.imageSize.width;
            sprite.size.height = animation.imageSize.height;
            this.resources.playAudio('touched');
        }
        if (explosionType === ExplosionType.EnemyDestroyed) {
            let animation = new Engine.ImageSheetAnimation('explosion', this.resources.images.get('explosion-enemy-destroy'), new Engine.Size(60, 60), false);
            animation.speed = 50;
            sprite = new Engine.Sprite('explosion', animation);
            sprite.size.width = animation.imageSize.width;
            sprite.size.height = animation.imageSize.height;
            this.resources.playAudio('explosion');
        }

        return sprite;
    }

    createGameover(): Engine.Sprite {
        let animation = new Engine.TextAnimation('gameover', 'GAME OVER', '#000000', 80, 'Sketch');
        let sprite = new Engine.Sprite('gameover', animation);
        sprite.size.width = 380;
        sprite.size.height = 80;
        sprite.position.x = (this.width - sprite.size.width) / 2;
        return sprite;
    }

    deletePlayerLife(sprite: Engine.ISprite, index: number) {
        this.playerLive.splice(index, 1);

        sprite.move(new Engine.Point(sprite.position.x - 16, sprite.position.y - 8), new Engine.Point(90, 90));
        sprite.scale(new Engine.Size(64, 32), new Engine.Point(90, 90), () => this.deleteThing(sprite));
    }

    gameover(): void {
        this.resources.stopAudioLoop('background-music');
        this.resources.playAudio('gameover');
        super.gameover();
    }
    start(): void {
        this.pad.start();
        super.start();
        this.things.push(this.pad);
    }

    stop(): void {
        this.pad.stop();
        super.stop();
    }
}
