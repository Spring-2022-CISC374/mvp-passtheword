import Phaser from 'phaser'

class player{
    constructor(id: number){
        this.id = id
        this.password = []
    }
    id: number
    password: string[]
    charges = 0

    setPassword(input: string[]){
        this.password = input
    }
    guessPassword(input: string[]){
        return (this.password == input)
    }
}

export default class GuessScene extends Phaser.Scene {

    activePlayer: player
    otherPlayer: player
    currentGuess: string[] = []
    guessText: Phaser.GameObjects.Text
    keywords: {[text: string]: Phaser.GameObjects.Text} = {}

    constructor(){
        super("guess");
    }

    appendGuess(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text){
        if(this.currentGuess.includes(gameObject.text)){
            this.currentGuess.splice(this.currentGuess.indexOf(gameObject.text),1)
        }
        else{
            this.currentGuess.push(gameObject.text)
        }
        this.updateGuessText()
    }
    updateGuessText(){
        this.guessText.setText("Guess: " + this.currentGuess.toString())
        this.guessText.setPosition(0,150)
        console.log(this.currentGuess)
    }

    create(){
        this.activePlayer = new player(1)
        this.otherPlayer = new player(2)
        this.activePlayer.setPassword(["abc","123"])

        this.guessText = this.add.text(0,150,"Guess: " + this.currentGuess.toString())

        this.keywords['abc'] = this.add.text(20,20,"abc");
        this.keywords['123'] = this.add.text(20,20,"123").setPosition(70,70);
        for (let text of Object.values(this.keywords)){
            text.setInteractive()
        }

        this.input.on('gameobjectdown',this.appendGuess, this)

    }

    update(){

    }


}