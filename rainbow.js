import {detectCollision} from './collisionDetection.js';
import * as collisionSound from './sounds.js';

export class  Rainbow{
    constructor(game) {
        let raw_width = Math.floor(game.sack.width/2) % 2 === 0 ? Math.floor(game.sack.width/2) : Math.ceil(game.sack.width/2);
        this.rainbow_width = ((Math.ceil(raw_width/20) * 20) - raw_width) < (raw_width-(Math.floor(raw_width/20)*20)) ? Math.ceil(raw_width/20) * 20 : Math.floor(raw_width/20) * 20;
        this.offset = (raw_width-this.rainbow_width)/2; 
        this.position = {x: (game.sack.position.x + (game.sack.width/4) + this.offset), y: (game.sack.position.y + 20)};
        this.bar_width = this.find_bar_width();
        this.bar_height = 0;
        this.max_height = 75;
        this.color_array = this.create_color_array();
        this.reload_time = 1000; //in milliseconds
        this.game = game;
        this.firing_speed = 600;
        this.letterCollide = false;
        this.coalCollide = false;
        this.offScreen = false;
        this.hit_sound = new collisionSound.Sounds('./assets/sounds/Rainbow-collision.wav');
        
         //change once update is implemented
        //console.log(this.color_array);
    }
    find_bar_width() {
        let bar_width = this.rainbow_width/20;
        return bar_width;
    }
    draw(ctx) {
        this.color_array.forEach((color)=>{
            ctx.fillStyle=color.color;
            ctx.fillRect(this.position.x + color.x, color.y, color.width, color.height);
            ctx.fillStyle = "green";
        });
    }
    update(deltaTime) {
        //this.position.x = this.game.sack.position.x + (this.game.sack.width/4) + this.offset;
        if(this.bar_height > -this.max_height) {
            this.bar_height -= this.firing_speed * (deltaTime/1000);
            this.color_array.forEach((color)=> {
                //console.log(color.y);
                color.height -= this.firing_speed * (deltaTime/1000);
            })
        }
        else {
            this.position.y += this.firing_speed * (deltaTime/1000);
            this.color_array.forEach((color)=> {
                color.y -= this.firing_speed * (deltaTime/1000);
                this.position.y = color.y;
            });
            //need condition to detect collision between rainbow and letter
            //need to loop through every single letter
        }

        this.game.coals.coal_arr.forEach((coal_piece)=>{
            if(detectCollision(coal_piece,this,false,this.game)) {
                console.log("THIS WORKS");
                this.coalCollide = true;
                coal_piece.hit = true;
            }
        });

        this.game.letters.letter_arr.forEach((letter)=> {
            //  console.log(`
            // // Test if 4th condsition works:
            // // ${letter.position.y >= (this.position.y+this.bar_height)}
            // //  `);    
            //console.log(letter.width);        
            if((letter.position.x + letter.width) >= this.position.x 
            && letter.position.x <= (this.position.x + this.rainbow_width)
            && letter.position.y <= this.position.y
            && letter.position.y >= (this.position.y+this.bar_height)
            ) {
                // console.log(`letter: ${letter.letter}
                // letter position: ${letter.position.x}
                // rainbow position: ${this.position.x}
                // `);
                letter.hit = true;
                this.letterCollide = true;
                this.hit_sound.play();
            }
        });
        if(this.position.y <= 0) {
            this.offScreen = true;
        }
    }
    create_color_array(y_position=this.position.y) {
        //y remains the same, x shifts by bar width every time
        let color_array = [];
        let color_step = 360/20;
        for(let count=0; count < 20; ++count) {
            let color_bar = {x: (count * this.bar_width), y: y_position, width: this.bar_width, height: this.bar_height, color: `hsl(${count*color_step}, 100%, 50%)`};
            color_array.push(color_bar);
        }
        return color_array;
    }
}