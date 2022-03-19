import Phaser from 'phaser'
import { text } from 'stream/consumers'

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
        if(this.password.length != input.length) {return false}
        for(var i = 0; i < input.length; i++){
            if(this.password[i] != input[i]){return false}
        }

        return true
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

    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text){
        if(gameObject.type != "Text"){ return }
        if(Object.keys(this.keywords).includes(gameObject.text)){
            this.appendGuess(gameObject)
        }
        if(gameObject.text == "submit"){
            this.submit()
        }
    }

    appendGuess(keyword: Phaser.GameObjects.Text){
        if(this.currentGuess.includes(keyword.text)){
            this.currentGuess.splice(this.currentGuess.indexOf(keyword.text),1)
        }
        else{
            this.currentGuess.push(keyword.text)
        }
        this.guessText.setText("Guess: " + this.currentGuess.toString())
        this.guessText.setColor("White")
    }

    submit(){
        console.log(this.otherPlayer.guessPassword(this.currentGuess))
        if(this.otherPlayer.guessPassword(this.currentGuess)){
            this.guessText.setColor("Green")
        }
        else{
            this.guessText.setColor("Red")
        }
    }

    create(){
        this.activePlayer = new player(1)
        this.otherPlayer = new player(2)
        this.activePlayer.setPassword(['123'])
        this.otherPlayer.setPassword(['abc','123'])

        this.guessText = this.add.text(0,150,"Guess: " + this.currentGuess.toString())

        this.add.text(0,200,"submit").setInteractive()

        this.keywords['abc'] = this.add.text(20,20,"abc");
        this.keywords['123'] = this.add.text(20,20,"123").setPosition(70,70);
        for (let text of Object.values(this.keywords)){
            text.setInteractive()
        }

        this.input.on('gameobjectdown',this.handleInteract, this)

    }

    update(){

    }


}