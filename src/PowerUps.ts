import players from './Player'
type item = {powerUp: PowerUp;  owned: boolean}

export class PowerUps extends Phaser.GameObjects.Container{    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y)

        this.scene = scene
        this.x = x
        this.y = y
        this.add(new PowerUp(this.scene,0,"Log Message", 3, function() {console.log("testing 123")}))
        this.add(new PowerUp(this.scene,20,"Do Nothing", 1, function() {}))

        this.scene.add.existing(this)
    }

}
export class PowerUp extends Phaser.GameObjects.Text{
    cost: number;
    text: string;
    power: () => void;
    constructor(scene: Phaser.Scene, y: number, text: string, cost: number, power: () => void){
        super(scene,0 ,y, text + ": $" + cost,{backgroundColor: "grey"})
        this.cost = cost
        this.text = text + ": $" + cost
        this.power = power
        this.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.power, this)
        this.type = "Powerup"
        this.scene.add.existing(this)
        
    }
    

}