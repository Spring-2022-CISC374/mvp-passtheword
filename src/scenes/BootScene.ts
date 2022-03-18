import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        // eslint-disable-next-line no-undef
        this.load.image("background", require('../../public/images/background.png'));
        // eslint-disable-next-line no-undef
        this.load.spritesheet("explosion", require('../../public/spritesheets/explosion.png'), {frameWidth: 16, frameHeight: 16});
        // eslint-disable-next-line no-undef
        this.load.spritesheet("orb", require("../../public/spritesheets/power-up.png"), {frameWidth: 16, frameHeight: 16});
        // eslint-disable-next-line no-undef
        this.load.spritesheet("player", require('../../public/images/paddle1.png'), {frameWidth: 64, frameHeight: 8});
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


        this.scene.start("playGame");
    }
}