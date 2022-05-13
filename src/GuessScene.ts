import 'phaser'
import { CharacterSheet } from './characterSheet'
import { Button } from './keywordTile'
import players from './Player'
import { PowerUp, PowerUps } from './PowerUps'
import { textHandler } from './textHandler'

export class GuessScene extends Phaser.Scene {

    currentPassword: string[] = []
    userText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text
    keywords: Button[]
    coordinates: Button[][]
    mode: string

    lastGuess: Phaser.GameObjects.Container
    powerups: PowerUps

    constructor() {
        super("guess");
    }

    // calls submit function if the submit text object is clicked
    // Created by Eddie Levin
    handleInteract(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        if(gameObject instanceof Button){
            if (gameObject.text.text == "Submit"){
                this.submit()
            }
            else {this.appendGuess(gameObject.text)}
        }
        if (gameObject instanceof PowerUp){
            gameObject.power()
            this.powerups.updateHeading()
        }
        if (gameObject instanceof Phaser.GameObjects.Text){

        }
        // refreshes keyword colors
        this.keywords.forEach(element => {
            let kw = element.text
            let color = "White"
            if(players.activePlayer.colorMap[kw.text]){
                color = players.activePlayer.colorMap[kw.text]
            }
            if(this.currentPassword.includes(kw.text)){color = "Black"}
            kw.setColor(color)
        });
    }


    // when a keyword is clicked, that keyword is appended to the list of current guesses
    //  if the keyword is part of the guess, it is removed from the list
    // Created by Eddie Levin
    appendGuess(keyword: Phaser.GameObjects.Text) {
        if (this.currentPassword.includes(keyword.text)) {
            this.currentPassword.splice(this.currentPassword.indexOf(keyword.text), 1)
        }
        else if(this.currentPassword.length <= 4){
            this.currentPassword.push(keyword.text)
        }
        this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''))
    }


    // when submit is clicked, the guess is compared to the opponent's password, and the text color is changed accordingly,
    //  and then the turn is switched to the opponent and the current guess is cleared
    // Created Eddie Levin
    submit() {
        if (players.otherPlayer.guessPassword(this.currentPassword)) {
            this.userText.setColor("Green")
            this.currentPassword = []
            this.scene.start("endGame");
        }
        else {
            this.userText.setColor("Red")
            this.addGuessToHistory(this.currentPassword)
            players.switchTurn()
            this.currentPassword = []
            this.scene.start("transition");
        }
    }

    create() {
        this.cameras.main.setRoundPixels(true); 
        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.userText = this.add.text(10, 180, "Guess: " + this.currentPassword.toString(),textHandler.largeText)
        this.turnText = this.add.text(150, 10, "Player " + players.getActiveID() + "'s Turn",textHandler.largeText)
        this.add.existing(new Button(this,55,230, 'upTexture', 'overTexture', 'downTexture',"Submit").setInteractive())
        this.setLastGuessText()

        // Keyword Formation created by Braxton Madara
        this.keywords = this.formKeywords();

        // TODO: Make an input screen for chractersheet info.

        this.input.on('gameobjectdown', this.handleInteract, this)

        this.powerups = new PowerUps(this, 550,10)

    }

    update() {
    }

    // Converts the charactersheet data into buttons
    // Created by Braxton Madara

    formKeywords(){
        var words = players.otherPlayer.getKeywords()
        var keywordTiles: Button[] = [] // Return value
        var outerArray = []
        let k = 0 // word count
        for(let i = 55; i<462; i+=100){ // iterates along the width of the screen
            if(words[k]) // If there are still words left make another innerArray
                var innerArray = []
            for(let j = 60; j<180; j+=45){ // iterates along the height given
                if(!words[k])
                    break // Stops creating buttons if we are out of words
                let color = "white"
                if(players.activePlayer.colorMap[words[k]]){
                    color = players.activePlayer.colorMap[words[k]]
                }
                var button = new Button(this, i, j, 'upTexture', 'overTexture', 'downTexture', words[k])
                button.text.setColor(color)
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

    // Created by Eddie Levin
    setLastGuessText() {
        this.lastGuess = this.add.container(110, 230 ,this.add.text(0,0,"Last Guess: ",textHandler.mediumText))
        let position = "Last Guess: ".length
        let guessNum = players.activePlayer.getHistory().length 
        if (guessNum == 0) { return }
        var prevGuess = players.activePlayer.getHistory()[guessNum-1]
        for (let tuple of prevGuess) {
            let word = tuple[0], color = tuple[1]
            this.lastGuess.add(this.add.text(position*13,0,word,textHandler.smallText).setColor(color))
            position += word.length
        }
    } 

    addGuessToHistory(guess: string[]) {
        var colors: [string, string][] = []
        for(var i=0; i < this.currentPassword.length; i++){
            var color = ""
            color = "Red" 
            if (players.otherPlayer.password.includes(guess[i])){ color = "Yellow" }
            if(i < players.otherPlayer.password.length){
                if(guess[i] == players.otherPlayer.password[i]){ color = "Green" }
            }
            colors.push([this.currentPassword[i],color])
        }
        players.activePlayer.appendToHistory(colors)
    }
}