import Phaser from 'phaser'

export default class EndScene extends Phaser.Scene { //File created by Braxton

    gameTitleText: string[] = []
    nextInstructionText: string[] = []
    timer: number = 20;

    constructor(){
        super("endGame");
    }

    create() {
        this.gameTitleText['GAME OVER'] = this.add.text(186,70,"GAME OVER");
        this.nextInstructionText['Left Click to Restart'] = this.add.text(136, 180,"Left Click to Restart");

        this.input.on('pointerup', function (pointer) {

            if(this.timer <= 0){
                this.scene.start('MainMenu');
            }

        }, this);
          // Left Click advances to next scene
    }

    update(){
        this.timer--;
    }
}