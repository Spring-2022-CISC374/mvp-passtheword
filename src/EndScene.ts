import 'phaser'
import players from './Player';
import { size } from './app';
import { textHandler } from './textHandler';

export class EndScene extends Phaser.Scene { //File created by Braxton

    gameTitleText: string[] = []
    nextInstructionText: string[] = []
    turnCountText: string[] = []

    constructor(){
        super("endGame");
    }

    create() {
        this.cameras.main.setRoundPixels(true); 
        this.gameTitleText['GAME OVER'] = this.add.text(size.x/2,70,"Player "+ players.getActiveID() + " Wins!",textHandler.titleText).setOrigin();
        this.nextInstructionText['Turn Count'] = this.add.text(size.x/2, 100,"You guessed the password in " + players.activePlayer.turn + " turn(s)!",textHandler.mediumText).setOrigin();

        this.nextInstructionText['Left Click to Restart'] = this.add.text(size.x/2, 180,"Left Click to Restart",textHandler.mediumText).setOrigin();

        this.input.on('pointerdown', function (pointer) {
                this.scene.start('MainMenu');
        }, this);
          // Left Click advances to next scene
    }

    update(){
    }
}