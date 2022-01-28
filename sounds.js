export class Sounds {
    constructor(src, id) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("contols", "none");
        this.sound.setAttribute("id", id);
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        //this.sound.addEventListener('ended', this.rem());
    }
    play() {
        this.sound.play();
    }
    pause() {
        this.sound.pause();
    }
    rem() {
        this.sound.addEventListener('ended',()=> {
            this.sound.remove();
            this.sound.src = null;
        });
    }
    del() {
        this.sound.remove();
    }
    res() {
        this.sound.currentTime = 0;
    }
}