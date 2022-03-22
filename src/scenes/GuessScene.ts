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
        this.guessText = this.add.text(10, 180, "Guess: " + this.currentGuess.toString())
        this.add.text(10, 230, "submit").setInteractive()
        this.turnText = this.add.text(150, 10, "Player " + Player.activePlayer.id + "'s Turn").setFontSize(12)

        // Keyword Formation created by Braxton (thank you Eddie)

        //sets the keywords for the scene
        this.keywords = this.formKeywords();

        // TODO: Make an input screen for chractersheet info. Created by Braxton

        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    update() {

    }

    // this turns all the keyword strings from the charactersheet into Phaser.GameObjects.Text objects and returns them in an array
    formKeywords(){
        var sampleSheet = new CharacterSheet("Tom", "Hardy", "4/25", ["Gloomtail", "sprinkles", "gum"], [])
        var words = sampleSheet.getWords();
        var keywords = [];
        var widthIncrement = 10;
        var heightIncrement = 30;
        
        for (let i = 0; i<words.length; i++) {
            if(heightIncrement%150 == 0){
                widthIncrement = widthIncrement + 100;
                heightIncrement += 30;
            }
            let newKeyword = this.add.text(widthIncrement%(256*5), heightIncrement%150, words[i]).setInteractive();
            keywords.push(newKeyword);
            heightIncrement += 20;
        }
        return keywords;
    }

}