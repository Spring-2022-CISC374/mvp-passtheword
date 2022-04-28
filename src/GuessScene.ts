import 'phaser'
import { CharacterSheet } from './characterSheet'
import { Players } from './Player'
import { size } from './app'

export class GuessScene extends Phaser.Scene {

    currentPassword: string[] = []
    userText: Phaser.GameObjects.Text
    turnText: Phaser.GameObjects.Text
    keywords: Phaser.GameObjects.Text[]
    borders: Phaser.GameObjects.Shape[]
    mode: string
    players: Players

    constructor() {
        super("guess");
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

    // when a keyword is clicked, that keyword is appended to the list of current guesses
    //  if the keyword is part of the guess, it is removed from the list
    // Created by Eddie Levin
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

    // Created by Jason He
    createPassword() {
        this.players.setPassword(this.currentPassword)
        this.currentPassword = []

        if (this.players.activePlayer.id == 2) {
            this.mode = "Guess";
            this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''));
        } else {
            this.userText.setText("Create Your Password: " + this.currentPassword.toString().replace(/,/g,''));
        }

        this.players.switchTurn();
        this.swapKeywords();
        this.turnText.setText("Player " + this.players.activePlayer.id + "'s Turn");

    }

    // when submit is clicked, the guess is compared to the opponent's password, and the text color is changed accordingly,
    //  and then the turn is switched to the opponent and the current guess is cleared
    // Created Eddie Levin
    submit() {
        if (this.mode == "Create") {
            this.createPassword();
        } else if (this.mode == "Guess") {

            if (this.players.otherPlayer.guessPassword(this.currentPassword)) {
                Players.winner = this.players.activePlayer;
                this.userText.setColor("Green");
                this.scene.start("endGame");
            }
            else {
                this.userText.setColor("Red");
            }
            this.players.switchTurn();
            this.turnText.setText("Player " + this.players.activePlayer.id + "'s Turn");
            this.currentPassword = [];
            this.userText.setText("Guess: " + this.currentPassword.toString().replace(/,/g,''));

        }
        for(var kw of this.keywords){kw.setColor("White")}
            this.swapKeywords();
    }

    create() {
        this.cameras.main.setRoundPixels(true); 

        // Created by Jason He
        this.mode = "Create";
        this.players = new Players(1, 2);

        // WARNING: if the text in the submit button is changed, handleInteract must also be changed
        this.userText = this.add.text(10, 180, "Create Your Password: " + this.currentPassword.toString());
        this.turnText = this.add.text(150, 10, "Player " + this.players.activePlayer.id + "'s Turn").setFontSize(12);
        this.add.text(10, 230, "submit").setInteractive();

        // Keyword Formation created by Braxton Madara
        this.keywords = this.formKeywords();

        // Border Formation created by Braxton Madara
        this.borders = this.formBorders(this.keywords);
        

        // TODO: Make an input screen for chractersheet info.

        this.input.on('gameobjectdown', this.handleInteract, this)
    }

    update() {
    }

    formBorders(keywords: Phaser.GameObjects.Text[]){
        var borders = [];
        for(let i=0; i<keywords.length; i++){
            var newBorder = this.add.rectangle(keywords[i].width,keywords[i].height).setOrigin(0,0).setFillStyle();
            borders.push(newBorder);
        }
        return borders;
    }

    // Converts the charactersheet data into keywords
    // Created by Braxton Madara
    formKeywords(){
        var sampleSheet = new CharacterSheet("Tom", "Hardy", "425", ["Gloomtail", "sprinkles", "gum"], [])
        this.players.activePlayer.setKeywords(sampleSheet.getWords());
        this.players.otherPlayer.setKeywords(sampleSheet.getWords());

        var words = this.players.activePlayer.getKeywords();
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


    // Obtains the keywords that should be displayed at the moment
    // Adjusted by Jason He
    swapKeywords(){
        var words: string[];
        if (this.mode == "Create" || this.mode == "Enter") {
            words = this.players.activePlayer.getKeywords();
        } else if (this.mode == "Guess") {
            words = this.players.otherPlayer.getKeywords();
        }
        
        for (let i = 0; i<words.length; i++) {
            this.keywords[i].setText(words[i]);
        }
    }

}