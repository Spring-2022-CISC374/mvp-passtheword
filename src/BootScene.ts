import 'phaser'

export class BootScene extends Phaser.Scene { //Most scenes were made by Kyle Kontura
    constructor(){
        super("bootGame");
    }

    preload(){
        // Images
        this.load.image('upTexture', './assets/icons/buttonTextures/ButtonUp.png') // Blue Button Unpressed
        this.load.image('overTexture', './assets/icons/buttonTextures/ButtonOver.png') // Blue Button Hovered Over
        this.load.image('downTexture', './assets/icons/buttonTextures/ButtonDown.png') // Blue Button Pressed
        this.load.image('upTexture2', './assets/icons/buttonTextures/ButtonUp2.png') // Purple Button Unpressed
        this.load.image('overTexture2', './assets/icons/buttonTextures/ButtonOver2.png') // Purple Button Hovered Over
        this.load.image('downTexture2', './assets/icons/buttonTextures/ButtonDown2.png') // Purple Button Pressed
        this.load.image('shopTutorial', './assets/icons/tutorialScreenshots/ShopTutorial.png')

        // Audio
        this.load.audio('btnPress', 'assets/buttonPress.mp3'); //Loads button press sound
        this.load.audio('music', 'assets/music.mp3'); // Loads background music

        this.load.html('form', 'assets/input.html'); // Loads in HTML user input
    }
    
    create() {
        
        this.add.text(20,20,"Loading game...");

        this.scene.start("MainMenu");
    }
}