class Player {
    constructor(id: number) {
        this.id = id
    }
    id: number
    keywords: string[]
    password: string[] = []
    charges = 0

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
}

export class Players {
    constructor(id: number, id2: number) {
        this.activePlayer = new Player(id)
        this.otherPlayer = new Player(id2)
    }
    activePlayer = new Player(1)
    otherPlayer = new Player(2)

    static winner: Player

    getKeywords() {
        return this.activePlayer.getKeywords()
    }

    setKeywords(input: string[]) {
        this.activePlayer.setPassword(input)
    }

    setPassword(input: string[]) {
        this.activePlayer.setPassword(input)
    }

    guessPassword(input: string[]): boolean {
        return this.activePlayer.guessPassword(input)
    }

    switchTurn(): Number{
        let tempPlayer = this.otherPlayer
        this.otherPlayer = this.activePlayer
        this.activePlayer = tempPlayer
        return this.activePlayer.id
    }
}