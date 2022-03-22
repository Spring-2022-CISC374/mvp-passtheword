import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene { //Most scenes were made by Kyle Kontura
    constructor(){
        super("bootGame");
    }

    preload(){
        
    }
    
    create() {
        this.add.text(20,20,"Loading game...");

        this.scene.start("MainMenu");
    }
}