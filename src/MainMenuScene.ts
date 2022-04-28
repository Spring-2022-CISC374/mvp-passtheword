import 'phaser'
import { size } from './app';
import players from './Player'

export class MainMenuScene extends Phaser.Scene { // Created by Kyle Kontura

    gameTitleText: Phaser.GameObjects.Text
    nextInstructionText: Phaser.GameObjects.Text

    constructor(){
        super("MainMenu");
    }
    create(){
        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText = this.add.text(size.x/2,70, "Pass The Word").setOrigin();
        this.nextInstructionText = this.add.text(size.x/2,180,"Left Click to Begin").setOrigin();
        players.resetPlayers()

        this.input.on('pointerdown', function (pointer) {

            this.scene.start('createPassword');

        }, this);
          // Left Click advances to next scene
    }
}