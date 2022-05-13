import players from './Player'
import { textHandler } from './textHandler'

export class PowerUps extends Phaser.GameObjects.Container{
    heading: Phaser.GameObjects.Text    
    constructor(scene: Phaser.Scene, x: number, y: number, discount: number){
        super(scene, x, y)

        this.scene = scene
        this.x = x
        this.y = y
        this.add(this.scene.add.rectangle(0,0,240,200,0x282c34).setOrigin(0,0))
        this.add(this.scene.add.text(0,0,"Power Ups",textHandler.largeText))
        this.heading = this.scene.add.text(0,30,"You have $" + players.activePlayer.charges,textHandler.mediumText)
        this.add(this.heading)
        // Add Additional PowerUps Here
        this.add(new PowerUp(this.scene,50,"Show First Keyword", Math.max(1, 4 - discount), this.showFirstKeyword))
        this.add(new PowerUp(this.scene,70,"Remove Wrong Answer", Math.max(1, 3 - discount), this.removeWrongAnswer))
        this.add(new PowerUp(this.scene,90,"Show Password Length", Math.max(1, 3 - discount), this.showPasswordLength))

        this.scene.add.existing(this)
    }
    updateHeading() {
        this.remove(this.heading,true)
        this.heading = this.scene.add.text(0,30,"You have $" + players.activePlayer.charges,)
        this.add(this.heading)
    }
    private showFirstKeyword: ()=>void = function(){
        players.activePlayer.appendToHistory([[players.otherPlayer.password[0], "green"]])
    }
    private removeWrongAnswer: ()=>void = function(){
        let filteredArray = players.otherPlayer.getKeywords().filter(value => !players.getOtherPassword().includes(value));
        filteredArray = filteredArray.filter(value => !players.activePlayer.colorMap[value]);
        if(filteredArray.length > 0){
            let randomIndex = Math.floor(Math.random() * filteredArray.length);
            players.activePlayer.appendToHistory([[filteredArray[randomIndex], "Red"]])
        }
    }
    private showPasswordLength: ()=>void = function(){
        this.add(this.scene.add.text(0,110,"Password has " + players.otherPlayer.password.length + " keywords",textHandler.mediumText))
    }.bind(this)

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
        this.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.setBackgroundColor("#444444")
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.setBackgroundColor("grey")
        })
        this.scene.add.existing(this)
        
    }
    

}
