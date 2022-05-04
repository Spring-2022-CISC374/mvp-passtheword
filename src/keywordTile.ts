export class keywordTile extends Phaser.GameObjects.Container{
    
    upImage: Phaser.GameObjects.Image
    overImage: Phaser.GameObjects.Image
    downImage: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y:number, text: string){
        super(scene, x, y)

        this.upImage = scene.add.image(0, 0, './assets/buttonTextures/ButtonUp.png')
        this.overImage = scene.add.image(0, 0, './assets/buttonTextures/ButtonOver.png')
        this.downImage = scene.add.image(0, 0, './assets/buttonTextures/ButtonDown.png')
        this.text = scene.add.text(0, 0, text).setOrigin(.5)

        this.add(this.upImage)
        this.add(this.overImage)
        this.add(this.downImage)
        this.add(this.text)

        this.setSize(this.upImage.width, this.upImage.height)

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.upImage.setVisible(false)
                this.overImage.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.overImage.setVisible(false)
                this.downImage.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.downImage.setVisible(false)
                this.overImage.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.overImage.setVisible(false)
                this.upImage.setVisible(true)
            })

    }

    setText(text: string){
        this.text = this.scene.add.text(0, 0, text).setOrigin(.5)
    }

}