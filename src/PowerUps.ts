import players from './Player'

export class PowerUps extends Phaser.GameObjects.Container{
    heading: Phaser.GameObjects.Text    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y)

        this.scene = scene
        this.x = x
        this.y = y
        this.heading = this.scene.add.text(0,0,"You have " + players.activePlayer.charges + " charges")
        this.add(this.heading)
        this.add(new PowerUp(this.scene,20,"Log Message", 3, function() {console.log("testing 123");}))
        this.add(new PowerUp(this.scene,40,"Do Nothing", 1, function() {}))

        this.scene.add.existing(this)
    }
    updateHeading() {
        this.remove(this.heading,true)
        this.heading = this.scene.add.text(0,0,"You have " + players.activePlayer.charges + " charges")
        this.add(this.heading)
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
        this.power = function() {
            if(players.activePlayer.charges >= cost){
                power();
                players.activePlayer.charges-=cost;
            }
        }
        this.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.power, this)
        this.type = "Powerup"
        this.scene.add.existing(this)
        
    }
    

}
