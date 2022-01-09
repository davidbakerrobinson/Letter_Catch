import { Game } from "./game.js";

export class inputHandler {
    constructor(sack, bombs, game) {
        addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    sack.moveLeft();
                    break;

                case "ArrowRight":
                    sack.moveRight();
                    break;
                    //case "Escape":
                    //  game.togglePause();
                    //break;
                case "s":
                    //call something
                    game.superbomb = true;
                    bombs.fire_bomb();
                    break;
                case " ":
                    sack.rainbows.shootRainbow();
            }


        });
        addEventListener('keyup', (event) => {

            switch (event.key) {
                case "ArrowLeft":
                    if (sack.speed < 0) {
                        sack.stop();
                    }
                    break;

                case "ArrowRight":
                    if (sack.speed > 0) {
                        sack.stop();
                    }
                    break;

            }


        });

    }
}