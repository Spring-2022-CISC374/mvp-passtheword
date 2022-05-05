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
        // Add Additional PowerUps Here
        this.add(new PowerUp(this.scene,20,"Show First Keyword", 3, this.showFirstKeyword))
        this.add(new PowerUp(this.scene,40,"Remove Wrong Answer", 2, this.removeWrongAnswer))
        this.add(new PowerUp(this.scene,60,"Show Password Length", 2, this.showPasswordLength.bind(this)))

        this.scene.add.existing(this)
    }
    updateHeading() {
        this.remove(this.heading,true)
        this.heading = this.scene.add.text(0,0,"You have " + players.activePlayer.charges + " charges")
        this.add(this.heading)
    }
    private showFirstKeyword(){
        players.activePlayer.appendToHistory([[players.getOtherPassword()[0], "green"]])
    }
    private removeWrongAnswer(){
        let filteredArray = players.activePlayer.getKeywords().filter(value => !players.getOtherPassword().includes(value));
        filteredArray = filteredArray.filter(value => !players.activePlayer.colorMap[value]);
        if(filteredArray.length > 0){
            let randomIndex = Math.floor(Math.random() * filteredArray.length);
            players.activePlayer.appendToHistory([[filteredArray[randomIndex], "Red"]])
        }
    }
    private showPasswordLength(){
        this.add(this.scene.add.text(0,80,"Password has " + players.otherPlayer.password.length + " keywords"))
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
        this.setInteractive()
        this.scene.add.existing(this)
        
    }
    

}
