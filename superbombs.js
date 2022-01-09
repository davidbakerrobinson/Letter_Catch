import * as myGauge from './bomb_gauge.js';
import * as superbomb_sound from './sounds.js';

export class Superbombs {
    constructor(game) {
        this.lastTime = 0.0;
        this.magazine = {max_bombs: 3, bombs_available: 3}
        this.animation_height = game.height;
        this.animation_width = game.width;
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
        if(this.magazine.bombs_available > 0) {
        //play the animation clip and pause everything in game
        //console.log(this.lastTime);
        console.log("It goes int the if");
        let lastTime = 0;
        let game = this.game;
        let elapsed_time = 0;
        let FPMS = this.FPMS;
        let fire_src = document.getElementById("rainbow_bomb");
        let ended = false;
        let total_time = 0;
        let magazine = this.magazine;
        let explosion_sound = new superbomb_sound.Sounds('./assets/sounds/Angel-sound.wav');
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
            }
            else {
                --magazine.bombs_available;
                game.clearAll();
                game.bomb_ctx.clearRect(0,0,game.gameWidth, game.gameHeight);
                fire_src.currentTime = 0; 
                game.superbomb = false;
            }
        }
            fire_src.play();
            explosion_sound.play();
        //could also use a sequential funciton if video is async
            requestAnimationFrame(animation_loop);

        }
        else {
            this.game.superbomb = false;
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
        this.gauge.draw_gauge(this.magazine.bombs_available);
    }
}