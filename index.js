import * as myGame from './game.js';


let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let bomb_canvas = document.getElementById("bomb_animation");
let bomb_ctx = bomb_canvas.getContext("2d");
const GAME_WIDTH = window.screen.availWidth-10;
const GAME_HEIGHT = window.screen.availHeight-140;
canvas.setAttribute("width", `${GAME_WIDTH}`);
canvas.setAttribute("height",`${GAME_HEIGHT}`);
bomb_canvas.setAttribute("width", `${GAME_WIDTH}`);
bomb_canvas.setAttribute("height",`${GAME_HEIGHT}`);


//bomb_ctx.fillStyle = 'red';
//bomb_ctx.fillRect(200,200,500,500);

const secret_phrase = "Cat from America";
const phrase_length = secret_phrase.length; 
//set ctx font size
ctx.font = "48px serif";
//console.log(ctx.measureText("L"));
//canvas.setAttribute("height", `${GAME_HEIGHT-ctx.measureText('L').actualBoundingBoxAscent}`)

//deal with background

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new myGame.Game(GAME_WIDTH, GAME_HEIGHT, secret_phrase, ctx, bomb_ctx);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = (timestamp - lastTime); //in milliseconds
    lastTime = timestamp;
    if(game.superbomb === false) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
    }


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);