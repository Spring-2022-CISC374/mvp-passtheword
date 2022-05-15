import { textHandler } from "./textHandler"

export class Button extends Phaser.GameObjects.Container{
    
    private upImage: Phaser.GameObjects.Image
    private overImage: Phaser.GameObjects.Image
    private downImage: Phaser.GameObjects.Image

    public text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y:number, textures:[string,string,string], text: string){
        super(scene, x, y)

        this.upImage = scene.add.image(0, 0, textures[0])
        this.overImage = scene.add.image(0, 0, textures[1])
        this.downImage = scene.add.image(0, 0, textures[2])
        this.text = scene.add.text(0, 0, text,textHandler.smallText).setOrigin(.5)

        this.add(this.upImage)
        this.add(this.overImage)
        this.add(this.downImage)
        this.add(this.text)

        this.upImage.setVisible(true)
        this.overImage.setVisible(false)
        this.downImage.setVisible(false)
        this.text.setVisible(true)

        this.upImage.scaleX = .5
        this.upImage.scaleY = .8

        this.overImage.scaleX = .5
        this.overImage.scaleY = .8

        this.downImage.scaleX = .5
        this.downImage.scaleY = .8

        this.setSize(this.upImage.width*.5, this.upImage.height*.8)

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if(this.upImage.visible && !this.overImage.visible && !this.downImage.visible){
                    this.upImage.setVisible(false)
                    this.overImage.setVisible(true)
                }
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                if(!this.upImage.visible && !this.overImage.visible && this.downImage.visible){
                    this.overImage.setVisible(true)
                    this.downImage.setVisible(false)
                }
                else if(!this.upImage.visible && this.overImage.visible && !this.downImage.visible){
                    this.overImage.setVisible(false)
                    this.downImage.setVisible(true)
                }
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                if(!this.upImage.visible && this.overImage.visible && !this.downImage.visible){
                    this.upImage.setVisible(true)
                    this.overImage.setVisible(false)
                }
            })
    }

    setText(newText: string){
        this.text.text = newText
    }

}