import { detectCollision } from './collisionDetection.js';
import * as collisionSound from './sounds.js';

export class Letter{
    constructor(game) {
        //use random number generator for these:
        //set starting position of letter
        //set downward speed for letter

        let letter_arr = game.phrase.split('');
        this.letter_pool = letter_arr.filter((letter)=>letter != ' ');
        let arr_length = this.letter_pool.length;
        let rand_index = Math.floor(Math.random() * arr_length);        
        //console.log(this.letter_pool);
        this.letter = this.letter_pool[rand_index];
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;
        this.position = this.setPosition();
        this.speed = Math.floor(Math.random()*100) + 100;
        this.out_of_screen = false;
        this.caught = false;
        this.hit = false;
        this.game = game;
        let measure = this.ctx.measureText(this.letter);
        let width = measure.width;
        this.letter_width = width;
        this.letter_height = measure.actualBoundingBoxAscent;
        //this.letter_width = this.ctx.measureText(this.letter).width;
        this.successful_catch = new collisionSound.Sounds('./assets/sounds/Yeah.wav');
        this.bad_catch = new collisionSound.Sounds('./assets/sounds/error.wav');
        this.hit_sound = new collisionSound.Sounds('./assets/sounds/Rainbow-collision.wav');
        // console.log(this.letter_width);
        //set font size of letter
    }

    setPosition() {
        //choose random position within the gameWidth
        let letter_width = this.ctx.measureText(this.letter).width;
        let x_pos = Math.floor(Math.random() * (this.gameWidth-letter_width));
        let y_pos = 0;
        this.width = letter_width;
        return {x: x_pos, y: y_pos};

    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillText(this.letter, this.position.x, this.position.y);
    }

    update(deltaTime) {
        this.position.y += ((deltaTime/1000) * this.speed);
        if(this.position.y >= this.gameHeight-15)
            this.out_of_screen = true;
        // if(this.position.y >= this.game.sack.position.y 
        //     && (this.position.x + this.letter_width >= this.game.sack.position.x || this.position.x >= this.game.sack.position.x)
        //     && (this.position.x + this.letter_width <= (this.game.sack.position.x + this.game.sack.width) || this.position.x <= (this.game.sack.position.x + this.game.sack.width))
        //     ) {
        //     if(Math.abs(this.position.y - this.game.sack.position.y) <= 2 
        //     || Math.abs(this.position.y + this.letter_height - this.game.sack.position.y) <= 2 
        //     || Math.abs(this.position.y + this.letter_height - this.game.sack.position.y) <= 2 
        //     ) {
        //         this.caught = true;
        //         if(this.letter === this.game.phrase[this.game.game_phrase.current_index]) {
        //             //we have a hit
        //             //make sound, change Game_Phrase letters, to reflect catch
        //             this.game.game_phrase.set_success();
        //         }
        //         else {
        //             //change Game_Phrase letters, to reflect an incorrect catch
        //             this.game.game_phrase.set_failure();
        //         }
        //         this.game.game_phrase.update();
        //     }
                
        // }
        if(detectCollision(this, this.game.sack, true, this.game)) {
                this.caught = true;
                if(this.letter === this.game.phrase[this.game.game_phrase.current_index]) {
                    //we have a hit
                    //make sound, change Game_Phrase letters, to reflect catch
                    this.successful_catch.play();
                    this.game.game_phrase.set_success();
                }
                else {
                    //change Game_Phrase letters, to reflect an incorrect catch
                    this.bad_catch.play();
                    this.game.game_phrase.set_failure();
                }
                this.game.game_phrase.update();
            }
                
        }
        //console.log(this.game.sack.position.y);
    }
