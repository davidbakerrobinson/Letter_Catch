import { detectCollision } from './collisionDetection.js';
import * as myCoal from './coal.js';

export class Coal_Pieces {
    constructor(game) {
        this.coal_arr = [];
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.timeElapsed = 0;
        this.ctx = game.ctx;
        this.game = game;
    }

    update(deltaTime) {
        this.timeElapsed += deltaTime;      
        this.coal_arr = this.coal_arr
        .filter((coal)=>coal.out_of_screen===false && coal.caught === false)
        .filter((coal)=> coal.hit === false)
        .map((object)=> { 
            object.update(deltaTime);
            return object;
        });
        if(Math.floor(this.timeElapsed) >= 300) {
            //create a new letter, and add it to the array
            let new_piece = new myCoal.Coal(this.game);
            this.coal_arr.push(new_piece);
            //reset timeElapsed
            this.timeElapsed = 0;
        }
    }

    draw(ctx) {
        this.coal_arr.forEach((object)=>{
            object.draw(ctx);
        });
    }
    clearAll() {
        this.coal_arr = [];
    }
}

