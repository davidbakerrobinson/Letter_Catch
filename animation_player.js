export class Animation {
    constructor(game, id) {
        this.FPS = 15;
        this.height = game.gameHeight;
        this.width = game.gameWidth;
        this.game = game;
        this.video = document.getElementById(id);
    }
    start() {
        //going set functions for onPlay, and what not
        //basically my canvas element follows the video element
        //code on medium directly applies to my problem! :)
    }
    drawImage() {
        this.game.ctx.drawImage(this.video, 0, 0, this.width, this.height);
    }

}