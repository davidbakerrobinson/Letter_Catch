import { detectCollision } from './collisionDetection.js';
export class Ball {
    constructor(game) {
        this.image = document.getElementById('game_ball');
        this.speed = { x: 2, y: -4 };
        this.position = { x: 10, y: 400 };
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
        if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
        }
    }
}