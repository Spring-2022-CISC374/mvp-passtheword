export class CharacterSheet {

    firstName: string
    lastName: string
    birthday: string
    likes: string[]
    misc: string[]

    constructor(firstName: string, lastName: string, birthday: string, likes: string[], misc: string[]){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.likes = likes;
        this.misc = misc;
    }

    getWords(){
        var sheetWords: string[] = [this.firstName, this.lastName, this.birthday].concat(this.likes).concat(this.misc);
        var basicWords: string[] = ["sword", "king", "bungie", "420", "69", "!", "@", "0", "?", "$", "#","&"];
        var totalWords: string[] = sheetWords.concat(basicWords);
        
        function shuffle(array) { // Fisher-Yates (aka Knuth) Shuffle: (https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]]; 
            }
          
            return array;
        }

        shuffle(totalWords);
        
        var randomWords: string[] = totalWords.slice(0, 9);

        return randomWords;
    }
}