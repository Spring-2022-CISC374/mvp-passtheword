import 'phaser'

export class MainMenuScene extends Phaser.Scene { // Created by Kyle Kontura

    gameTitleText: string[] = []
    nextInstructionText: string[] = []

    constructor(){
        super("MainMenu");
    }
    create(){
        this.gameTitleText['Pass The Word'] = this.add.text(176,70, "Pass The Word");
        this.nextInstructionText['Left Click to Begin'] = this.add.text(146,180,"Left Click to Begin");

        this.input.on('pointerup', function (pointer) {

            this.scene.start('guess');

        }, this);
          // Left Click advances to next scene
    }
}