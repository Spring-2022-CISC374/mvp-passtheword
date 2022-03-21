export class CharacterSheet {
    constructor(firstName: string, lastName: string, birthday: string, likes: string[], misc: string[]){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.likes = likes;
        this.misc = misc;
    }

    firstName: string
    lastName: string
    birthday: string
    likes: string[]
    misc: string[]

    getWords(){
        var words: string[] = [this.firstName, this.lastName, this.birthday].concat(this.likes).concat(this.misc);
        var basicWords: string[] = ["123", "159", "420", "0", "@", "!", "?", "$"];
        words = words.concat(basicWords);
        return words;
    }
}