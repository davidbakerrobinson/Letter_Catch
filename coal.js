import { detectCollision } from './collisionDetection.js';
import * as collisionSound from './sounds.js';

export class Coal {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;
        this.out_of_screen = false;
        this.caught = false;
        this.hit = 0;
        this.coal_image = document.getElementById('coal_piece');
        this.width = 30;
        this.height = 30;
        let x_pos = Math.floor(Math.random() * (this.gameWidth-this.width));
        let y_pos = 0 - this.height;
        this.position = {
            x: x_pos,
            y: y_pos
        };
        this.speed = 150; //eventually maybe influence by difficulty
    }

    update(deltaTime) {
        this.position.y += ((deltaTime/1000) * this.speed);
        if(this.position.y >= this.gameHeight-15) {
            this.out_of_screen = true;
        }
        if(detectCollision(this, this.game.sack, false, this.game)) {
            this.caught = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.coal_image,this.position.x,this.position.y, this.width, this.height);
    }
}