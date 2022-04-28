import 'phaser'
import players from './Player';
import { size } from './app';

export class TransitionScene extends Phaser.Scene { //File created by Jason

    gameTitleText: string[] = []
    nextInstructionText: string[] = []

    constructor(){
        super("transition");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText['NEXT TURN'] = this.add.text(size.x/2,70,"Player "+ players.getActiveID() + "'s Turn!").setOrigin();
        this.nextInstructionText['Please Pass the Device'] = this.add.text(size.x/2, 180,"Please Pass the Device").setOrigin();

        if (players.getActiveID() == 2 && players.getActivePassword().length == 0) {
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
}