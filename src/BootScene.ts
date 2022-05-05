import 'phaser'

export class BootScene extends Phaser.Scene { //Most scenes were made by Kyle Kontura
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image('upTexture', './assets/icons/buttonTextures/ButtonUp.png')
        this.load.image('overTexture', './assets/icons/buttonTextures/ButtonOver.png')
        this.load.image('downTexture', './assets/icons/buttonTextures/ButtonDown.png')
        this.load.audio('btnPress', 'assets/buttonPress.mp3'); //Loads button press sound
        this.load.audio('music', 'assets/music.mp3'); // Loads background music
        this.load.html('form', 'assets/input.html'); // Loads in HTML user input
    }
    
    create() {
        
        this.add.text(20,20,"Loading game...");

        this.scene.start("MainMenu");
    }
}