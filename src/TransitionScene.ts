import 'phaser'
import players from './Player';
import { size } from './app';
import { textHandler } from './textHandler';

export class TransitionScene extends Phaser.Scene { //File created by Jason

    gameTitleText: string[] = []
    gamePlayerText: string[] = []
    nextInstructionText: string[] = []

    constructor(){
        super("transition");
    }

    create() {
        let state = players.findState();

        this.cameras.main.setRoundPixels(true);
        this.displayMessage(state);
        this.gamePlayerText['NEXT PLAYER'] = this.add.text(size.x/2, 100, "Player "+ players.getActiveID() + "'s Turn",textHandler.titleText).setOrigin();
        this.nextInstructionText['Please Pass the Device'] = this.add.text(size.x/2, 180,"Please Pass the Device",textHandler.mediumText).setOrigin();

        this.handleInteract(state);
    }

    update(){
    }

    handleInteract(state) {
        if (state == "Create") {
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('createPassword');
            }, this);
        } else if (state == "Chance") {
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('chance');
            }, this);
        } else {
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('guess');
            }, this);
        }
          // Left Click advances to next scene
    }

    displayMessage(state) {
        if (state == "Create") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "Create your password!",textHandler.titleText).setOrigin(); 
        } 
        else if (state == "Swap") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "Time to guess!",textHandler.titleText).setOrigin(); 
        }
        else if (state == "Guess" || state == "Chance") {
            this.gameTitleText['STATUS'] = this.add.text(size.x/2, 70, "INCORRECT!",textHandler.titleText).setOrigin(); 
        }
    }
}