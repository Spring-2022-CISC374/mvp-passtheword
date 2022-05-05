import 'phaser'
import players from './Player';
import { size } from './app';

export class ChargeScreen extends Phaser.Scene { //File created by Jason

    gameTitleText: Phaser.GameObjects.Text
    instructionText: Phaser.GameObjects.Text
    passwordInput: Phaser.GameObjects.DOMElement
    returnKey: Phaser.Input.Keyboard.Key

    constructor(){
        super("chance");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        this.gameTitleText = this.add.text(size.x/2, size.y/4, "Player " + players.getActiveID() + ", this is your chance!").setOrigin();
        this.instructionText = this.add.text(size.x/2, size.y/3, "Type in your password:").setOrigin();
        console.log(players.getActivePassword())

        this.passwordInput = this.add.dom(size.x/2, size.y * 3/4).createFromCache('form');

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let password = (<HTMLInputElement>this.passwordInput.getChildByName("password"));
            if(password.value != "") {
                this.handleSubmit(password.value);
            }
        });
      
    }

    update(){
    }

    handleSubmit(password) {
        if (password == players.getActivePassword()) {
            this.instructionText.setText("Success You gained a PowerUP charge!")
            players.activePlayer.charges += 1
        } else {
            this.instructionText.setText("Incorrect! That was not your password.")
        }

        this.returnKey.removeAllListeners("down");

        this.input.on('pointerdown', function (pointer) {
            this.scene.start('guess');
        }, this); // Left Click advances to next scene

    }
}