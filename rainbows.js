import * as myRainbow from './rainbow.js';
import * as myShootSound from './sounds.js';

export class Rainbows {
    constructor(game) {
        this.rainbow_array = [];
        this.game = game;
        this.time_since_add = 0;
        this.reload_time = 300;
        this.firing_sound = new myShootSound.Sounds('./assets/sounds/Rainbow-shoot.wav');
    }
    shootRainbow() {
        //add a new rainbow to the rainbow_array
        //console.log("Space bar has been hit");
        //console.log(this.rainbow_array);
        if(this.time_since_add >= this.reload_time )
        {
            this.rainbow_array.push(new myRainbow.Rainbow(this.game));
            this.firing_sound.play();
            this.time_since_add = 0;
        }
    }
    update(deltaTime) {
        this.time_since_add += deltaTime;
        //will eventually need a filter function to remove rainbow 
        //when it collides with letter or exits the screen

        //For now, just going to do update for each object in array
        this.rainbow_array = this.rainbow_array
        .filter((rainbow)=>rainbow.letterCollide === false)
        .filter((rainbow)=>rainbow.offScreen === false)
        .map((rainbow)=> {
            rainbow.update(deltaTime);
            return rainbow;
        });
    }
    draw(ctx) {
        this.rainbow_array.forEach((rainbow)=> {
            rainbow.draw(ctx);
        });
    }

    clearAll() {
        this.rainbow_array = [];
    }
}