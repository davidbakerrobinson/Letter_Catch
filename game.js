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