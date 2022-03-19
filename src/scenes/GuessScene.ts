import Phaser from 'phaser'
import { Player } from '../Player'

export default class GuessScene extends Phaser.Scene {

    currentGuess: string[] = []
    guessText: Phaser.GameObjects.Text
    keywords: { [text: string]: Phaser.GameObjects.Text } = {}

    constructor() {
        super("guess");
    }

    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text) {
        if (gameObject.type != "Text") { return }
        if (Object.keys(this.keywords).includes(gameObject.text)) {
            this.appendGuess(gameObject)
        }
        if (gameObject.text == "submit") {
            this.submit()
        }
    }

    appendGuess(keyword: Phaser.GameObjects.Text) {
        if (this.currentGuess.includes(keyword.text)) {
            this.currentGuess.splice(this.currentGuess.indexOf(keyword.text), 1)
        }
        else {
            this.currentGuess.push(keyword.text)
        }
        this.guessText.setText("Guess: " + this.currentGuess.toString())
        this.guessText.setColor("White")
    }

    submit() {
        if (Player.otherPlayer.guessPassword(this.currentGuess)) {
            this.guessText.setColor("Green")
        }
        else {
            this.guessText.setColor("Red")
        }
    }

    create() {
        var player1 = new Player(1)
        var player2 = new Player(2)
        player1.setPassword(['123'])
        player2.setPassword(['abc', '123'])
        Player.activePlayer = player1
        Player.otherPlayer = player2

        this.guessText = this.add.text(0, 150, "Guess: " + this.currentGuess.toString())
        this.add.text(0, 200, "submit").setInteractive()

        this.keywords['abc'] = this.add.text(20, 20, "abc");
        this.keywords['123'] = this.add.text(20, 20, "123").setPosition(70, 70);
        for (let text of Object.values(this.keywords)) {
            text.setInteractive()
        }

        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    update() {

    }


}