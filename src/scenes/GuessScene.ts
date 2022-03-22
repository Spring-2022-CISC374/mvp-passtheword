import Phaser from 'phaser'
import { CharacterSheet } from '../characterSheet'
//import { Keyword } from '../keyword'
import { Players } from '../Player'

export default class GuessScene extends Phaser.Scene {

    currentPassword: string[] = []
    userText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text
    keywords: Phaser.GameObjects.Text[]
    mode: string
    players: Players

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
        if (this.currentPassword.includes(keyword.text)) {
            this.currentPassword.splice(this.currentPassword.indexOf(keyword.text), 1)
            keyword.setColor("White")
        }
        else {
            this.currentPassword.push(keyword.text)
            keyword.setColor("Gray")
        }
        if (this.mode == "Create") {
            this.userText.setText("Create Your Password: " + this.currentPassword.toString().replace(/,/g,''))
        } else if (this.mode == "Guess") {
            this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''))
        }
        this.userText.setColor("White")
    }

    createPassword() {
        this.players.setPassword(this.currentPassword)
        this.currentPassword = []

        if (this.players.activePlayer.id == 2) {
            this.mode = "Guess"
            this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''))
        } else {
            this.userText.setText("Create Your Password: " + this.currentPassword.toString().replace(/,/g,''))
        }

        this.players.switchTurn()
        this.turnText.setText("Player " + this.players.activePlayer.id + "'s Turn")

    }

    // when submit is clicked, the guess is compared to the opponent's password, and the text color is changed accordingly,
    //  and then the turn is switched to the opponent and the current guess is cleared
    submit() {
        if (this.mode == "Create") {
            this.createPassword()
        } else if (this.mode == "Guess") {

            if (this.players.otherPlayer.guessPassword(this.currentPassword)) {
                this.userText.setColor("Green")
            }
            else {
                this.userText.setColor("Red")
            }
            this.players.switchTurn()
            this.turnText.setText("Player " + this.players.activePlayer.id + "'s Turn")
            this.currentPassword = []
            this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''))

        }
        
    }

    create() {

        // TODO: create and assign these players in the password creation phase
        //       Look at Player.ts to see how to use it
        // WARNING: The setPassword will have to be changed to be dynamic
        this.mode = "Create"
        this.players = new Players(1, 2)

        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.userText = this.add.text(10, 180, "Create Your Password: " + this.currentPassword.toString())
        this.turnText = this.add.text(150, 10, "Player " + this.players.activePlayer.id + "'s Turn").setFontSize(12)
        this.add.text(10, 230, "submit").setInteractive()

        // Keyword Formation

        this.keywords = this.formKeywords();

        // TODO: Make an input screen for chractersheet info.

        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    update() {

    }

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