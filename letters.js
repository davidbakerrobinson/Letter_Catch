import { detectCollision } from './collisionDetection.js';
import * as myLetter from './letter.js';


export class Letters {
    constructor(game) {
        this.letter_arr = [];
        //console.log("This is the letter arr" + this.letter_arr);
        this.phrase = game.phrase;
        this.phrase_length = game.phrase.length;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.timeElapsed = 0;
        this.ctx = game.ctx;
        this.game = game;
    }


    update(deltaTime) {
        this.timeElapsed += deltaTime;
        this.letter_arr = this.letter_arr
        .filter((letter)=>letter.out_of_screen===false && letter.caught === false)
        .filter((letter)=> letter.hit === false)
        .map((object)=> { 
            object.update(deltaTime);
            return object;
        });
        
        if(Math.floor(this.timeElapsed) >= 300) {
            //create a new letter, and add it to the array
            let new_letter = new myLetter.Letter(this.game);
            this.letter_arr.push(new_letter);
            //reset timeElapsed
            this.timeElapsed = 0;
        }
    }

    draw(ctx) {
        this.letter_arr.forEach((object)=>{
            object.draw(ctx);
        });
    }
    set_letters(phrase) {
        //let phrase_copy = [...phrase];
        let phrase_array = phrase.split('');
        let shuffled = phrase_array.filter((letter)=>{
            return letter!=' ';
        })
        .map((letter)=>{
            return ({value: letter, sort: Math.random()});
        })
        .sort((a,b)=>a.sort-b.sort)
        .map((letter)=> letter.value);
        return shuffled;
    }
    check_for_hit() {

    }
}