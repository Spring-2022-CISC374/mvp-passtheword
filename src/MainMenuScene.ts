import 'phaser'
import { size, musicConfig } from './app';
import players from './Player'

export class MainMenuScene extends Phaser.Scene { // Created by Kyle Kontura

    gameTitleText: Phaser.GameObjects.Text
    startBtn: Phaser.GameObjects.Text
    btnPressSound: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;

    constructor(){
        super("MainMenu");
    }

    preload(){
    }

    create(){
        this.btnPressSound = this.sound.add("btnPress");
        this.music = this.sound.add("music");

        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText = this.add.text(size.x/2,100, "Pass The Word",{fontFamily: 'MadHacker', color: '#66ff00', fontSize: "40px"}).setOrigin();
        this.startBtn = this.add.text(size.x/2,180,"Start Game", {fontFamily: 'BlockCode',color: '#000000',fontSize: "30px", backgroundColor: '#D3D3D3'})
        .setOrigin()
        .setInteractive()
        .setPadding(8)
        .on('pointerdown', () => (this.scene.start('transition'), this.btnPressSound.play()))
        .on('pointerover', () => this.startBtn.setStyle({ color: '#66ff00'}))
        .on('pointerout', () => this.startBtn.setStyle({ color: '#000000' }) );

        players.resetPlayers()

        this.game.sound.stopAll();
        this.music.play(musicConfig);
    }
}