import * as userSack from './sack.js';
import * as inputHelp from './input.js';
import * as myBall from './ball.js';
import * as myBrick from './brick.js';
import { buildLevel, level1 } from './level.js';
import * as myletters from './letters.js';
import * as myRainbow from './rainbow.js';
import * as myGame_Phrase from './Game_Phrase.js';
import * as sup_bomb from './superbombs.js';
import * as myPieces from './coal_pieces.js';
import * as collisionSound from './sounds.js';
/*
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
};
*/
export class Game {
    constructor(gameWidth, gameHeight, phrase, ctx, bomb_ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.phrase = phrase;
        this.ctx = ctx;
        this.bomb_ctx = bomb_ctx;
        this.superbomb = false;
        this.world = 1;
        this.reset_world;
    }

    switch_world() {
        let back_ground = document.getElementById('gameScreen');
        if(this.world === -1) {
            clearTimeout(this.reset_world);
        }
        else {
            back_ground.style.background = "url('./assets/images/underworld2.png')";
            //back_ground.setAttribute('src','./assets/images/underworld2.png');
            this.sack.sack_image = document.getElementById('under_sack');
            this.letters.color = "rgb(0,255,255)";
            this.world = -1;
        }
        this.coal_song.res();
        this.coal_song.play();
        this.reset_world = setTimeout(()=> {
            back_ground.style.background = "url('./assets/images/normal_background.png')";
            this.letters.color = "rgb(255,0,0)";
            this.sack.sack_image = document.getElementById('sack');
            //back_ground.setAttribute('src','./assets/images/normal_background.png');
            this.world = 1;
        }, 10000);  
    }



    start() {
        this.sack = new userSack.Sack(this);
        //this.gameState = GAMESTATE.RUNNING;
        this.bombs = new sup_bomb.Superbombs(this);
        new inputHelp.inputHandler(this.sack,this.bombs, this);
        //let bricks = buildLevel(this, level1); //circle for gameBall
        this.game_phrase = new myGame_Phrase.Game_Phrase(this);
        //this.ball = new myBall.Ball(this);
        this.letters = new myletters.Letters(this);
        this.coals = new myPieces.Coal_Pieces(this);

        //sounds        
        this.successful_catch = new collisionSound.Sounds('./assets/sounds/Yeah.wav', 'success_catch');
        this.bad_catch = new collisionSound.Sounds('./assets/sounds/error.wav','bad_catch');
        this.hit_sound = new collisionSound.Sounds('./assets/sounds/Rainbow-collision.wav','hit_sound');
        this.firing_sound = new collisionSound.Sounds('./assets/sounds/Rainbow-shoot.wav','fire');
        this.coal_song = new collisionSound.Sounds('./assets/sounds/Bag_of_coal_song.wav','coal');

        //console.log(this.bombs);
        //this.rainbow = new myRainbow.Rainbow(this);
        this.gameObjects = [this.sack, this.letters, this.bombs, this.coals];

        // let background = document.getElementById("normal_background");
        // this.ctx.drawImage(background, 100,200);
    }

    clearAll() {
        this.letters.clearAll();
        this.sack.clearAll();
        this.coals.clearAll();
    }

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }
    draw(ctx) {
            //this.paddle.draw(ctx);
            //this.ball.draw(ctx);
            this.gameObjects.forEach((object) => object.draw(ctx));
        }
        /*
            togglePause() {
                if (this.gameState == GAMESTATE.PAUSED) {
                    this.gameState = GAMESTATE.RUNNING;
                } else {
                    this.gameState = GAMESTATE.PAUSED;
                }
            }
*/
}