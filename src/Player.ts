class Player {
    constructor(id: number) {
        this.id = id
        if(id == 2){
            this.buttons = ['upTexture2', 'overTexture2', 'downTexture2']
            this.charges = 1
        }
    }
    id: number
    keywords: string[]
    password: string[] = []
    history: [string,string][][] = []
    colorMap = {}
    turn = 0
    charges = 0
    discount = 0
    buttons: [string,string,string] = ['upTexture', 'overTexture', 'downTexture']

    getKeywords() {
        return this.keywords
    }

    setKeywords(input: string[]) {
        this.keywords = input
    }

    setPassword(input: string[]) {
        this.password = input
    }

    guessPassword(input: string[]): boolean {
        if (this.password.length != input.length) { return false }
        for (var i = 0; i < input.length; i++) {
            if (this.password[i] != input[i]) { return false }
        }
        return true
    }
    appendToHistory(input: [string,string][]){
        this.history.push(input)
        input.forEach(
            function(value){
                if(this.colorMap[value[0]] == "Green"){return}
                this.colorMap[value[0]] = value[1]
            }.bind(this)
        )
    }
    getHistory(){
        return this.history
    }
}

class Players {
    activePlayer: Player
    otherPlayer: Player
    round: number

    constructor() {
        this.activePlayer = new Player(1)
        this.otherPlayer = new Player(2)
        this.round = -1
    }

    resetPlayers() {
        this.activePlayer = new Player(1);
        this.otherPlayer = new Player(2);
    }

    getActivePassword(): string{
        return this.activePlayer.password.join('');
    }
    getOtherPassword(): string{
        return this.otherPlayer.password.join('')
    }

    getActiveID() {
        return this.activePlayer.id;
    }

    getKeywords() {
        return this.activePlayer.getKeywords();
    }

    setKeywords(input: string[]) {
        this.activePlayer.setPassword(input);
    }

    setPassword(input: string[]) {
        this.activePlayer.setPassword(input);
    }

    guessPassword(input: string[]): boolean {
        return this.activePlayer.guessPassword(input);
    }

    switchTurn(): number{
        this.activePlayer.turn += 1
        let tempPlayer = this.otherPlayer
        this.otherPlayer = this.activePlayer
        this.activePlayer = tempPlayer
        return this.activePlayer.id
    }

    findState(): string{
        if (this.activePlayer.turn < 1) {
            return "Create"
        } else if (this.activePlayer.turn == 1 && this.activePlayer.id == 1) {
            return "Swap"
        } else if (this.activePlayer.turn % 3 == 0 && this.activePlayer.turn != 0) {
            return "Chance"
        } else {
            return "Guess"
        }
    }
}

let players = new Players();

export default players;