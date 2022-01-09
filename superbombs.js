import * as myGauge from './bomb_gauge.js';

export class Superbombs {
    constructor(game) {
        this.lastTime = 0.0;
        this.max_bombs = 3;
        this.animation_height = game.height;
        this.animation_width = game.width;
        this.bombs_available = 3;
        this.game = game;
        this.gauge = new myGauge.Bomb_Gauge(game);
        this.fire_src = document.getElementById("rainbow_bomb");
        this.bomb_height = this.game.gameHeight;
        this.bomb_width = this.game.gameWidth;
        this.FPMS = 1000/15;
        this.elapsed_time = 0;
        this.ended = false;
        
    }
    fire_bomb() {
        if(this.bombs_available > 0) {
        //play the animation clip and pause everything in game
        //console.log(this.lastTime);
        let lastTime = 0;
        let game = this.game;
        let elapsed_time = 0;
        let FPMS = this.FPMS;
        let fire_src = document.getElementById("rainbow_bomb");
        let ended = false;
        let total_time = 0;
        console.log(fire_src);
        //clear canvas
        function animation_loop(timestamp) {
            let deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            game.bomb_ctx.clearRect(0, 0, game.GAME_WIDTH, game.GAME_HEIGHT);
            elapsed_time += deltaTime;
            if(elapsed_time >= FPMS) {
                game.bomb_ctx.drawImage(fire_src, 0, 0, game.gameWidth,game.gameHeight);
                //console.log(game.bomb_ctx);
                //console.log(FPMS+ " This is the frame rate per ms");
                elapsed_time = 0;
                
            }
            if(fire_src.ended != true) {
                requestAnimationFrame(animation_loop);
                ended = true;
            }
        }
            fire_src.play();
        //could also use a sequential funciton if video is async
            requestAnimationFrame(animation_loop);
            if(fire_src.ended)
                --this.bombs_available;
        }
    }
    // animation_loop(timestamp) {
    //     if(lastTime == undefined) {
    //         var lastTime = 0;
    //     }
    //     let deltaTime = timestamp - lastTime;
    //     lastTime = timestamp;
    //     this.game.bomb_ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    //     this.elapsed_time += deltaTime;
    //     if(this.elapsed_time >= this.FPMS) {
    //         this.game.bomb_ctx.drawImage(this.fire_src, 0, 0, this.game.GAME_WIDTH, this.game.GAME_HEIGHT);
    //         console.log(this.FPMS+ " This is the frame rate per ms");
    //         this.elapsed_time = 0;
    //     }
    //     if(this.fire_src.ended != true) {
    //         requestAnimationFrame(this.animation_loop);
    //         this.ended = true;
    //     }
    // }

    update(ctx) {
    
    }
    draw(deltaTime) {
        this.gauge.draw_gauge(this.bombs_available);
    }
}