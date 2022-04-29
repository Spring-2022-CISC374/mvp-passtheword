import 'phaser'
import { size } from './app';

export class MainMenuScene extends Phaser.Scene { // Created by Kyle Kontura

    gameTitleText: Phaser.GameObjects.Text
    startBtn: Phaser.GameObjects.Text

    constructor(){
        super("MainMenu");
    }
    create(){
        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText = this.add.text(size.x/2,100, "Pass The Word",{font: '30px Mad Hacker', color: '#66ff00'}).setOrigin();
        this.startBtn = this.add.text(size.x/2,180,"Start Game", {font: '30px Block Code',color: '#000000', backgroundColor: '#D3D3D3'})
        .setOrigin()
        .setInteractive()
        .setPadding(8)
        .on('pointerdown', () => this.scene.start('guess'))
        .on('pointerover', () => this.startBtn.setStyle({ color: '#66ff00'}))
        .on('pointerout', () => this.startBtn.setStyle({ color: '#000000' }) );

        // this.input.on('pointerdown', function (pointer) {

        //     this.scene.start('guess');

        // }, this);
          // Left Click advances to next scene
    }
}