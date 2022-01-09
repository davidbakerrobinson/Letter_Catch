export class Bomb_Gauge {
    constructor(game) {
        this.position = {x: 20, y: game.gameHeight-70};
        this.num_bombs = 3;
        this.star_size = 20;
        this.game = game;
        this.my_star = document.getElementById('bomb_thumbnail');
    }
    draw_gauge(num_bombs) {
        for(let i = 0; i < num_bombs; ++i) {
            //want to draw little stars
            let my_star = document.getElementById('bomb_thumbnail');
            this.game.ctx.drawImage(this.my_star,this.position.x + (i* 70), this.position.y,60,60);
        }
    }
}