import Phaser from 'phaser'
import { CharacterSheet } from '../characterSheet'
//import { Keyword } from '../keyword'
import { Player } from '../Player'

export default class GuessScene extends Phaser.Scene {

    currentGuess: string[] = []
    guessText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text
    keywords: Phaser.GameObjects.Text[]

    constructor() {
        super("guess");
    }

    // calls diferent functions depending on what kind of object is clicked 
    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text) {
        if (gameObject.type != "Text") { return }
        if (this.keywords.includes(gameObject)) {
            this.appendGuess(gameObject)
        }
        if (gameObject.text == "submit") {
            this.submit()
        }
    }

    // when a keyword is clicked, that keyword is appended to the list of current guesses
    //  if the keyword is part of the guess, it is removed from the list
    appendGuess(keyword: Phaser.GameObjects.Text) {
        if (this.currentGuess.includes(keyword.text)) {
            this.currentGuess.splice(this.currentGuess.indexOf(keyword.text), 1)
            keyword.setColor("White")
        }
        else {
            this.currentGuess.push(keyword.text)
            keyword.setColor("Gray")
        }
        this.guessText.setText("Guess: " + this.currentGuess.toString().replace(/,/g,''))
        this.guessText.setColor("White")
    }

    // when submit is clicked, the guess is compared to the opponent's password, and the text color is changed accordingly,
    //  and then the turn is switched to the opponent and the current guess is cleared
    submit() {
        if (Player.otherPlayer.guessPassword(this.currentGuess)) {
            this.guessText.setColor("Green")
        }
        else {
            this.guessText.setColor("Red")
        }
        Player.switchTurn()
        this.turnText.setText("Player " + Player.activePlayer.id + "'s Turn")
        this.currentGuess = []
        this.guessText.setText("Guess: " + this.currentGuess.toString().replace(/,/g,''))
    }

    create() {

        // TODO: create and assign these players in the password creation phase
        //       Look at Player.ts to see how to use it
        // WARNING: The setPassword will have to be changed to be dynamic
        var player1 = new Player(1)
        var player2 = new Player(2)
        player1.setPassword(['123'])
        player2.setPassword(['abc', '123'])
        Player.activePlayer = player1
        Player.otherPlayer = player2

        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.guessText = this.add.text(0, 150, "Guess: " + this.currentGuess.toString())
        this.add.text(0, 200, "submit").setInteractive()
        this.turnText = this.add.text(150, 0, "Player " + Player.activePlayer.id + "'s Turn").setFontSize(12)

        // TODO:rewrite this keyword creation to involve less hard coded values
        //      and have automatic formating 
        //      (and maybe change the text objects to containers)
        // WARNING: currently, the strings used for the key must match the text exactly

        this.keywords = this.formKeywords();

        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    update() {

    }

    formKeywords(){
        var sampleSheet = new CharacterSheet("Tom", "Hardy", "4/25", ["Gloomtail", "sprinkles", "gum"], [])
        var words = sampleSheet.getWords();
        var keywords =  [];
        for (let i = 0; i<words.length; i++) {
            let newKeyword = this.add.text(10, 20*i, words[i]).setInteractive();
            keywords.push(newKeyword);
        }
        return keywords;
    }

}