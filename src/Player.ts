export class Player {
    constructor(id: number) {
        this.id = id
    }
    id: number
    password: string[] = []
    charges = 0

    setPassword(input: string[]) {
        this.password = input
    }
    guessPassword(input: string[]) {
        if (this.password.length != input.length) { return false }
        for (var i = 0; i < input.length; i++) {
            if (this.password[i] != input[i]) { return false }
        }
        return true
    }
}