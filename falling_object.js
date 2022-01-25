export class Falling_Object {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.ctx = game.ctx;
        this.out_of_screen = false;
        this.caught = false;
        this.hit = false;
    }

}