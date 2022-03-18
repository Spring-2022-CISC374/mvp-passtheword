import Phaser from 'phaser'
import { config, gameSettings } from '../main';

export default class PlayScene extends Phaser.Scene {

    background: Phaser.GameObjects.TileSprite;
    scoreBoard: Phaser.GameObjects.Text
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    orbs: Phaser.Physics.Arcade.Group;
    timeCounter: number = 0;
    score: number = 0;
    lives: number = gameSettings.startingLives;

    constructor() {
        super("playGame");

    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
        this.scoreBoard = this.add.text(20, 20, "Score: 0\nLives: " + gameSettings.startingLives);
        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.orbs = this.physics.add.group();
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.background.setOrigin(0, 0);
        this.player.setCollideWorldBounds(true);
    }

    destroyOrb(player: Phaser.GameObjects.GameObject, orb: Phaser.GameObjects.GameObject) {
        let explosion = this.add.sprite(orb.body.position.x, orb.body.position.y, "exlposion");
        explosion.play("explode");
        orb.destroy();
        this.score++;
        this.scoreBoard.setText('Score: ' + this.score + "\nLives: " + this.lives)

    }

    movePlayerManager() {
        this.player.setVelocity(0, 0);
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed - Math.sqrt(this.timeCounter));
        }
        if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed + Math.sqrt(this.timeCounter));
        }
    }

    spawnOrb() {
        var orb = this.physics.add.sprite(16, 16, "orb");
        orb.setRandomPosition(0, 0, config.width, 0);
        this.orbs.add(orb);
        orb.play("gray");
        orb.setCollideWorldBounds(false);
        orb.setVelocityY(gameSettings.enemySpeed + ((Math.random() * 16) - 8) + Math.sqrt(this.timeCounter))
        this.physics.add.overlap(this.player, orb, this.destroyOrb, undefined, this)
    }

    update() {
        this.timeCounter++;
        if (this.timeCounter % (gameSettings.spawnRate - Math.floor(Math.sqrt(this.timeCounter))) == 0) {
            this.spawnOrb()
        }


        this.movePlayerManager();
        this.player.y = config.height - 64;
        this.background.tilePositionY -= 0.5;

        for (const orb of this.orbs.children.entries) {
            if (orb.body.position.y >= config.height) {
                this.lives--;
                orb.destroy();
                this.scoreBoard.setText('Score: ' + this.score + "\nLives: " + this.lives)
            }
        }
        if (this.lives <= 0) {
            this.scene.start("bootGame");
        }

    }
}