import 'phaser'

export class CreatePassScene extends Phaser.Scene {
    enterPasswordText: string[] = []

    constructor(){
        super("createPassword");
    }

    create(){
        this.enterPasswordText['Select keywords to create password'] = this.add.text(40,40,"Select keywords \n to create password").setPosition(40,70); // Password creation mechanics done by Jason He
        this.input.on('pointerup', function (pointer) {

            this.scene.start('guess');

        }, this);
        // Left Click advances to next scene

    }
    
}