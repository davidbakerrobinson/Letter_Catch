export class Game_Phrase {
    constructor(game) {
        this.phrase_div = document.getElementById("word_to_solve");
        this.phrase = game.phrase;
        this.phrase_length = this.phrase.length;
        this.game = game;
        this.width = this.game.gameWidth;
        this.current_index = 0; 
        this.success = false;
        this.failure = false;
        this.store_letter_info = []; 
        this.create_empty();
        this.victory = false;
  
    }

    create_empty() {
        this.phrase_div.style.gridTemplateColumns = `repeat(${this.phrase.length},1fr)`;
        this.phrase_div.style.width = `${this.width}px`;
        let frag = document.createDocumentFragment();
        for(let i = 0; i < this.phrase_length; ++i) {
            let new_letter = document.createElement("div");
            new_letter.innerHTML = this.phrase[i];
            if(i === 0) {
                new_letter.setAttribute("class", "red-blink")
            }
            frag.appendChild(new_letter);
        }
        this.phrase_div.append(frag);
    }

    update() {
        //I want to have the current letter blink red
        if(this.phrase[this.current_index]=== ' ')
            this.current_index +=1;
        let current_div = document.querySelector(`#word_to_solve :nth-child(${this.current_index+1})`); 
        //console.log(this.current_index);
        //console.log(this.phrase[this.current_index]);
        if(this.success === true) {
            if(this.current_index === this.phrase_length - 1) {
                //HAVE A this.game.win() Function
                //reset success value
                alert("you Won the game!");
            }
            this.success = false;
            current_div.setAttribute("class", "green-text");
            //Set letter to green
            console.log(current_div.innerHTML);
            this.current_index += 1;
            if(this.phrase[this.current_index]===' ') {
                this.current_index += 1;
            }
            if(this.victory === false) {
                let next_div = document.querySelector(`#word_to_solve :nth-child(${this.current_index+1})`);
                next_div.setAttribute("class", "red-blink");
            }
        }
        if(this.failure === true) {
            if(this.current_index === 0) {
                //SET ALL LETTERS TO RED
                //YOU LOST
                alert("you lost the game");
            }
            //set this.current_index to black font color
            current_div.setAttribute("class","black");
            this.failure = false;
            this.current_index -= 1;
            let previous_div = document.querySelector(`#word_to_solve :nth-child(${this.current_index+1})`);
            if(previous_div.innerHTML === ' ')
            {
                this.current_index -= 1;
                previous_div = document.querySelector(`#word_to_solve :nth-child(${this.current_index+1})`);
            }
            previous_div.setAttribute("class","red-blink");
            //change new_current index to blink
            console.log(`${current_div.innerHTML}
            ${previous_div.innerHTML}
            `);

        }

    }

    draw(ctx) {
        //I am really just modifying a div element
    }

    set_failure() {
        this.failure = true;
    }

    set_success() {
        this.success = true;
    }

}