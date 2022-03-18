import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", '../images/background.png');
        this.load.spritesheet("explosion", '../spritesheets/explosion.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("orb", "../spritesheets/power-up.png", {frameWidth: 16, frameHeight: 16});
        this.load.image("player", '../images/paddle1.png');
    }
    
    create() {
        this.add.text(20,20,"Loading game...");


        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("orb", {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("orb", {start: 2, end: 3}),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {}),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });


        this.scene.start("guess");
    }
}