import 'phaser'
import { size } from './app';

export class Tutorial extends Phaser.Scene {

    private gameText: Phaser.GameObjects.Text
    private tutorialImage1: Phaser.GameObjects.Image
    private tutorialImage2: Phaser.GameObjects.Image

    constructor(){
        super("tutorial");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        // Styling
        var style = { fontFamily: 'Arial', color: 'white', align: 'center', wordWrap: { width: size.x-40, useAdvancedWrap: true }};

        // Quick Greeting
        this.gameText = this.add.text(size.x/2,70,"Welcome players. This is just a quick tutorial to explain some things that aren't obvious. Click to see more.", style).setOrigin().setVisible(true).setFontSize(15);
            
        var count = 0;

        this.input.on('pointerdown', function (pointer) {
            count++

            if(count == 1){ // Colors Tutorial
                this.gameText.setVisible(false);

                this.gameText = this.add.text(size.x/2, 70, "After guessing, you will see the keywords you used with a new color. Red means they were not in the password. Yellow means they were in the password but not the right position. Green means they were in the password and in the right position.", style).setOrigin().setFontSize(15);

                this.tutorialImage1 = this.add.image(size.x * 1/5, size.y * 2/3, 'colorTutorialBefore').setOrigin();
                this.tutorialImage2 = this.add.image(size.x * 4/5, size.y * 2/3, 'colorTutorialAfter').setOrigin();
                this.tutorialImage1.setScale(.66);
                this.tutorialImage2.setScale(.66);
            }
            if(count == 2){ // Shop Tutorial
                this.gameText.setVisible(false);
                this.tutorialImage1.setVisible(false);
                this.tutorialImage2.setVisible(false);

                this.gameText = this.add.text(size.x/2, 70, "This is the shop. Here you can click a power up to buy it and get a leg up on your opponent. For every unique keyword guessed your opponent gets money. $1 for each unique keyword.", style).setOrigin().setFontSize(15);
                
                this.tutorialImage1 = this.add.image(size.x/2, size.y * 2/3, 'shopTutorial').setOrigin();
                this.tutorialImage1.setScale(.66);
            }
            if(count == 3){ // Remembering Password Tutorial
                this.gameText.setVisible(false);
                this.tutorialImage1.setVisible(false);

                this.gameText = this.add.text(size.x/2, 70, "Every 3 turns you will be shown this screen. If you remember your password and type it correctly, everything in the shop becomes cheaper.", style).setOrigin().setFontSize(15);
                
                this.tutorialImage1 = this.add.image(size.x/2, size.y * 2/3, "rememberingTutorial").setOrigin();
                this.tutorialImage1.setScale(.66);
            }
            if(count == 4){ // Send Off
                this.gameText.setVisible(false);
                this.tutorialImage1.setVisible(false);

                this.gameText= this.add.text(size.x/2, 70, "That's it!\nWhen you are ready, click once more to start the game.", style).setOrigin().setFontSize(15);
            }
            if(count == 5) // Transition
                this.scene.start('transition');
        }, this);
        // Left Click advances to next scene
    }

    update(){
    }
}