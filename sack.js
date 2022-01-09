import * as myRainbows from './rainbows.js';

export class Sack {
    constructor(game) {
        //need to calculate paddle width based on letter width
        //this.letter_width = game.ctx.measureText('H');
        this.sack_image = document.getElementById("sack");
        this.width = 175;
        this.height = 175;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        //this.width = game.phrase.length * this.letter_width.width;
        //console.log(game.phrase.length);
        //this.height = 20;
        this.rainbows = new myRainbows.Rainbows(game);
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10,
        };
        this.maxSpeed = 800;
        this.speed = 0;
    }
    draw(ctx) {
        ctx.fillStyle = '#00F';
        // console.log(`x cord of paddle: ${this.position.x}
        // y cor of paddle: ${this.position.y}
        // width of paddle: ${this.width}
        // sack_image: ${this.sack_image.width}
        // `);
        ctx.drawImage(this.sack_image, this.position.x, this.position.y, this.width, this.height);
        this.rainbows.draw(ctx);
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    update(deltaTime) {
        this.position.x += (deltaTime/1000) * this.speed;
        if (this.position.x < -this.width/2) {
            this.position.x = -this.width/2;
        } else if (this.position.x > this.gameWidth - this.width/2) {
            this.position.x = this.gameWidth - this.width/2;
        }
        this.rainbows.update(deltaTime);
    }
    stop() {
        this.speed = 0;
    }

}