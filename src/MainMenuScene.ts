import 'phaser'
import { size } from './app';
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
        this.load.audio('btnPress', 'assets/buttonPress.mp3'); //Loads button press sound
        this.load.audio('music', 'assets/music.mp3'); // Loads background music

    }

    create(){
        this.btnPressSound = this.sound.add("btnPress");
        this.music = this.sound.add("music");

        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText = this.add.text(size.x/2,100, "Pass The Word",{font: '40px Mad Hacker', color: '#66ff00'}).setOrigin();
        this.startBtn = this.add.text(size.x/2,180,"Start Game", {font: '30px Block Code',color: '#000000', backgroundColor: '#D3D3D3'})
        .setOrigin()
        .setInteractive()
        .setPadding(8)
        .on('pointerdown', () => (this.scene.start('transition'), this.btnPressSound.play()))
        .on('pointerover', () => this.startBtn.setStyle({ color: '#66ff00'}))
        .on('pointerout', () => this.startBtn.setStyle({ color: '#000000' }) );

        players.resetPlayers()

        const musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
          }
          this.music.play(musicConfig);
    }
}