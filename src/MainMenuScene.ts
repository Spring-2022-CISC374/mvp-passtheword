import 'phaser'
import { size } from './app';

export class MainMenuScene extends Phaser.Scene { // Created by Kyle Kontura

    gameTitleText: Phaser.GameObjects.Text
    nextInstructionText: Phaser.GameObjects.Text

    constructor(){
        super("MainMenu");
    }
    create(){
        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText = this.add.text(size.x/2,100, "Pass The Word",{font: '30px Mad Hacker', color: '#66ff00'}).setOrigin();
        this.nextInstructionText = this.add.text(size.x/2,180,"Left Click to Begin", {fontSize: '25px'}).setOrigin();

        this.input.on('pointerdown', function (pointer) {

            this.scene.start('guess');

        }, this);
          // Left Click advances to next scene
    }
}