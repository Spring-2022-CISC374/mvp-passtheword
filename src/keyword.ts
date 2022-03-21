import Phaser from "phaser";
export class Keyword extends Phaser.GameObjects.Text{
    constructor(scene, x, y, text, style){
        super(scene, x, y, text, style);
        this.setInteractive();
    }
}