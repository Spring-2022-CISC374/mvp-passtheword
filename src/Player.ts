class Player {
    constructor(id: number) {
        this.id = id
    }
    id: number
    keywords: string[]
    password: string[] = []
    history: [string,string][][] = []
    charges = 10

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
        this.round = -1
    }

    getActivePassword() {
        return this.activePlayer.password
    }
    getOtherPassword() {
        return this.otherPlayer.password
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
        let tempPlayer = this.otherPlayer
        this.otherPlayer = this.activePlayer
        this.activePlayer = tempPlayer
        this.round += 1
        return this.activePlayer.id
    }

    findState(): string{
        if (this.round < 1) {
            return "Create"
        } else if (this.round == 1) {
            return "Swap"
        } else {
            return "Guess"
        }
    }
}

let players = new Players();

export default players;