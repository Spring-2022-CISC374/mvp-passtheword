import 'phaser'
import { size } from './app';

export class Tutorial extends Phaser.Scene {

    private gameText: Phaser.GameObjects.Text
    private tutorialImage: Phaser.GameObjects.Image

    constructor(){
        super("tutorial");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        // Text
            // Greeting
            //this.gameText['Greeting'] = this.add.text(size.x/2,70,"Welcome players. We have a challenge for both of you.").setOrigin().setVisible(true);
            //this.gameText['Greeting 2'] = this.add.text(size.x/2,20,"Your task is to figure out your opponent's password before they figure out yours.").setOrigin().setVisible(true);
            // Creation
            //this.gameText['Creation instruction'] = this.add.text(size.x/2, 70, "To create your password you must click these buttons to form your password.").setOrigin().setVisible(false);
            //this.gameText['Creation instruction 2'] = this.add.text(size.x/2, 90, "The most keywords you can use for your password is five. Submit it when you are ready to face your opponent.").setOrigin().setVisible(false);
            // Guessing
            //this.gameText['Guessing instruction'] = this.add.text(size.x/2, 110, "This will start with Player 1. Try and form your opponents password and submit it to see if you are correct.").setOrigin().setVisible(false);
            // Color Explanation
            //this.gameText['Color explanation'] = this.add.text(size.x/2, 70, "If one of the keywords you used becomes red, then it is not in your opponent's password.").setOrigin().setVisible(false);
            //this.gameText['Color explanation 2'] = this.add.text(size.x/2, 90, "If one of the keywords you used becomes yellow, then it is in your opponent's password but not where you guessed.").setOrigin().setVisible(false);    
            //this.gameText['Color explanation 3'] = this.add.text(size.x/2, 110, "If one of the keywords you used becomes green, then it is in your opponent's password and you guessed where it is correctly.").setOrigin().setVisible(false);
            var style = { fontFamily: 'Arial', color: 'white', align: 'center', wordWrap: { width: size.x-40, useAdvancedWrap: true }};
            // Quick Greeting
            this.gameText = this.add.text(size.x/2,70,"Welcome players. This is just a quick tutorial to explain some things that aren't obvious. Click to see more.", style).setOrigin().setVisible(true).setFontSize(15);
            // Shop & PowerUps
           
            // Remember
            
            // Send Off
            

        // Pictures
        
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

        var count = 0;

        this.input.on('pointerdown', function (pointer) {
            count++
            if(count == 1){
                this.gameText.setVisible(false);
                this.gameText = this.add.text(size.x/2, 70, "This is the shop. Here you can click a power up to buy it and get a leg up on your opponent.\nEvery time you guess part of the opponent's password they get money for the shop. $1 for each keyword you guess correctly.", style).setOrigin().setFontSize(15);
                this.add.image(size.x/2, size.y/2, 'shopTutorial').setOrigin();
            }
            if(count == 2){
                this.gameText.setVisible(false);
                this.gameText = this.add.text(size.x/2, 70, "Every 3 turns you will be shown this screen. If you remember your password and type it correctly, everything in the shop becomes cheaper.", style).setOrigin().setFontSize(15);
            }
            if(count == 3){
                this.gameText.setVisible(false);
                this.gameText= this.add.text(size.x/2, 70, "When you are ready click once more to start the game.", style).setOrigin().setFontSize(15);
            }
            if(count == 4)
                this.scene.start('transition');
        }, this);
        // Left Click advances to next scene
    }

    update(){
    }
}