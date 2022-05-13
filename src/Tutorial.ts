import 'phaser'
import { size } from './app';

export class Tutorial extends Phaser.Scene {

    gameText: string[] = []

    constructor(){
        super("tutorial");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 
        this.gameText['Greeting'] = this.add.text(size.x/2,70,"Welcome players. We have a challange for both of you.").setOrigin();
        this.gameText['Greeting 2'] = this.add.text(size.x/2,70,"Welcome players. We have a challange for both of you.").setOrigin();
        this.gameText['Creation instruction'];
        this.gameText['Guessing instruction'];
        this.gameText['Color explanation'];
        this.gameText['Remember Password Explanation'];
        this.gameText['Power Up explanation'];
        this.gameText['Send Off'];
        

        // Most likely we just want a couple of screenshots with some text/drawings on it to show how the game is played
        // Key points to touch on:
        //  What each color means: Red, Yellow, Green
        //  How charges and power ups work:
        //   - Each unique word you guess gives the opposing player 1 charge
        //   - Charges can be spent in the shop in the side
        //   - On every 3rd turn, you can type in your password, and if you are correct every powerup costs 1 less, (minimum 1)
        //  REMEMBER your exact password when you make it, not just the position of the buttons but the letters (CAPS MATTER!)
        
        // If you don't get to it don't worry about it, we can work a bit before our session, or just omit it entirely 
        // ty in advance -jason and the rest who are 100% not angry



        this.input.on('pointerdown', function (pointer) {
            this.scene.start('transition');
        }, this);
        // Left Click advances to next scene
    }

    update(){
    }
}