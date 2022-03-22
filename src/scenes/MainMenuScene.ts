import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {

    gameTitleText: string[] = []
    nextInstructionText: string[] = []

    constructor(){
        super("MainMenu");
    }
    create(){
        this.gameTitleText['Pass The Word'] = this.add.text(40,40,"Pass The Word").setPosition(70,70);
        this.nextInstructionText['Left Click to Begin'] = this.add.text(40,40,"Left Click to Begin").setPosition(40,180);

        this.input.on('pointerup', function (pointer) {

            this.scene.start('guess');

        }, this);
          // Left Click advances to next scene
    }
}