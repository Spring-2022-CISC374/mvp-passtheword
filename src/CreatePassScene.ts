import 'phaser'
import players from './Player';
import { CharacterSheet } from './characterSheet';

export class CreatePassScene extends Phaser.Scene {
    enterPasswordText: string[] = []
    currentPassword: string[] = []
    keywords: Phaser.GameObjects.Text[]
    userText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text

    constructor(){
        super("createPassword");
    }

    // calls diferent functions depending on what kind of object is clicked 
    // Created by Eddie Levin
    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Text) {
        if (gameObject.type != "Text") { return }
        if (this.keywords.includes(gameObject)) {
            this.appendGuess(gameObject)
        }
        if (gameObject.text == "submit") {
            this.submit()
        }
    }

    // when submit is clicked, the turn swaps to the opponent and the current password is cleared
    // Created by Jason He
    submit() {
        if (this.currentPassword.length == 0) {
            this.userText.setText("Please enter a password: " + this.currentPassword.toString().replace(/,/g,''))
        } else {
            players.setPassword(this.currentPassword)
            this.currentPassword = []
            players.switchTurn();

            this.scene.start("transition");
        }
    }


    // when a keyword is clicked, that keyword is appended to the list of current guesses
    //  if the keyword is part of the guess, it is removed from the list
    // Created by Eddie Levin
    appendGuess(keyword: Phaser.GameObjects.Text) {
        if (this.currentPassword.includes(keyword.text)) {
            this.currentPassword.splice(this.currentPassword.indexOf(keyword.text), 1)
            keyword.setColor("White")
        }
        else if(this.currentPassword.length <= 4){
            this.currentPassword.push(keyword.text)
            keyword.setColor("Gray")
        }

        this.userText.setText("Create Your Password: " + this.currentPassword.toString().replace(/,/g,''))

        this.userText.setColor("White")
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        // Created by Jason He

        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.userText = this.add.text(10, 180, "Create Your Password: " + this.currentPassword.toString())
        this.turnText = this.add.text(150, 10, "Player " + players.getActiveID() + "'s Turn").setFontSize(12)
        this.add.text(10, 230, "submit").setInteractive()

        // Keyword Formation created by Braxton Madara
        this.keywords = this.formKeywords();

        // TODO: Make an input screen for chractersheet info.


        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    // Converts the charactersheet data into keywords
    // Created by Braxton Madara
    formKeywords(){
        if (!players.activePlayer.keywords) {
            var sampleSheet = new CharacterSheet("Tom", "Hardy", "425", ["Gloomtail", "sprinkles", "gum"], [])
            players.activePlayer.setKeywords(sampleSheet.getWords());
            players.otherPlayer.setKeywords(sampleSheet.getWords());
        }

        var words = players.activePlayer.getKeywords()
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