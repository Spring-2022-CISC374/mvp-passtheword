import 'phaser'
import players from './Player';
import { size } from './app';
import { textHandler } from './textHandler';
import { Button } from './keywordTile';

export class ChargeScreen extends Phaser.Scene { //File created by Jason

    gameTitleText: Phaser.GameObjects.Text
    instructionText: Phaser.GameObjects.Text
    passwordInput: Phaser.GameObjects.DOMElement
    returnKey: Phaser.Input.Keyboard.Key
    submitButton: Button;

    constructor(){
        super("chance");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        this.gameTitleText = this.add.text(size.x/2, size.y/4, "Player " + players.getActiveID() + ", this is your chance!",textHandler.titleText).setOrigin();
        this.instructionText = this.add.text(size.x/2, size.y/3, "Type in your password:",textHandler.mediumText).setOrigin();
        console.log(players.getActivePassword())

        this.passwordInput = this.add.dom(size.x/2, size.y * 3/4).createFromCache('form');

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.once("down", event => {
            let password = (<HTMLInputElement>this.passwordInput.getChildByName("password"));
            if(password.value != "") {
                this.handleSubmit(password.value);
            }
        });

        this.submitButton = this.add.existing(new Button(this, size.x * 3 / 4, size.y * 3 / 4, players.activePlayer.buttons, "Submit")).setInteractive()
        this.input.once('gameobjectdown',
            function () {
                let password = (<HTMLInputElement>this.passwordInput.getChildByName("password"))
                this.handleSubmit(password.value);
            }
            , this)
      
    }

    update(){
    }

    handleSubmit(password) {
        if (password == players.getActivePassword()) {
            this.gameTitleText.setText("Success! Your Power Ups now cost less.");
            players.activePlayer.discount += 1;
        } else {
            this.gameTitleText.setText("Incorrect! That was not your password.");
        }

        this.submitButton.setText("Continue")

        this.instructionText.setText("Please click Continue to continue, Player" + players.getActiveID());

        this.returnKey.removeAllListeners("down");
        this.input.removeAllListeners()
        this.input.on('gameobjectdown', function (pointer) {
            this.scene.start('guess');
        }, this); // Left Click advances to next scene

    }
}