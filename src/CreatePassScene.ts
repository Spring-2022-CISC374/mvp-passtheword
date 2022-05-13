import 'phaser'
import players from './Player';
import { CharacterSheet } from './characterSheet';
import { Button } from './keywordTile';
import { textHandler } from './textHandler';

export class CreatePassScene extends Phaser.Scene {
    enterPasswordText: string[] = []
    currentPassword: string[] = []
    keywords: Button[]
    coordinates: Button[][]
    userText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text

    constructor(){
        super("createPassword");
    }

    // calls diferent functions depending on what kind of object is clicked 
    // Created by Eddie Levin
    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        if(gameObject instanceof Button){
            if(gameObject.text.text == "Submit"){
                this.submit()
            }
            else {this.appendGuess(gameObject.text)}
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
            keyword.setColor("Black")
        }

        this.userText.setText("Create Your Password: " + this.currentPassword.toString().replace(/,/g,''))

        this.userText.setColor("White")
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        // Created by Jason He

        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.userText = this.add.text(10, 180, "Create Your Password: " + this.currentPassword.toString(),textHandler.largeText)
        this.turnText = this.add.text(150, 10, "Player " + players.getActiveID() + "'s Turn",textHandler.largeText)
        this.add.existing(new Button(this,55,230, 'upTexture', 'overTexture', 'downTexture',"Submit").setInteractive())

        // Keyword Formation created by Braxton Madara
        this.keywords = this.formKeywords();

        // TODO: Make an input screen for chractersheet info.


        this.input.on('gameobjectdown', this.handleInteract, this)

    }

    // Converts the charactersheet data into buttons
    // Created by Braxton Madara
    formKeywords(){
        var sampleSheet = new CharacterSheet("Tom", "Hardy", "425", ["Gloomtail", "sprinkles", "gum"], [])
        players.activePlayer.setKeywords(sampleSheet.getWords());
        
        var words = players.activePlayer.getKeywords()
        var keywordTiles: Button[] = [] // Return value
        var outerArray = []
        let k = 0 // word count

        for(let i = 55; i<462; i+=100){ // iterates along the width of the screen
            if(words[k]) // If there are still words left make another innerArray
                var innerArray = []
            for(let j = 60; j<180; j+=45){ // iterates along the height given
                if(!words[k])
                    break // Stops creating buttons if we are out of words
                var button = new Button(this, i, j, 'upTexture', 'overTexture', 'downTexture', words[k])
                innerArray.push(button)
                keywordTiles.push(button)
                k++
            }
            outerArray.push(innerArray)
        }
        
        this.coordinates = outerArray

        // Makes each button appear and call handleButtonClick when pressed
        keywordTiles.forEach((button) => {
            this.add.existing(button)
            button.setInteractive()
        })

        return keywordTiles;
    }
    
}