import 'phaser'
import players from './Player';
import { size } from './app';

export class TransitionScene extends Phaser.Scene { //File created by Jason

    gameTitleText: string[] = []
    gamePlayerText: string[] = []
    nextInstructionText: string[] = []

    constructor(){
        super("transition");
    }

    create() {
        this.cameras.main.setRoundPixels(true);
        this.displayMessage()
        this.gamePlayerText['NEXT PLAYER'] = this.add.text(size.x/2, 100, "Player "+ players.getActiveID() + "'s Turn").setOrigin();
        this.nextInstructionText['Please Pass the Device'] = this.add.text(size.x/2, 180,"Please Pass the Device").setOrigin();

        if (players.round < 1) {
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('createPassword');
            }, this);
        } else {
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('guess');
            }, this);
        }
          // Left Click advances to next scene
    }

    update(){
    }

    displayMessage() {
        let state = players.findState()
        console.log(state)
        if (state == "Create") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "Create your password!").setOrigin(); 
        } 
        else if (state == "Swap") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "Time to guess!").setOrigin(); 
        }
        else if (state == "Guess") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "INCORRECT!").setOrigin(); 
        }
    }
}