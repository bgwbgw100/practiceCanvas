import{
    Select
} from './select.js'

class App{
    constructor(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        window.addEventListener("resize",this.resize.bind(this), false);
        this.resize();

        
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(2,2)
        this.select = new Select(this.stageWidth,this.stageHeight);
        this.select.draw(this.ctx,5);

    }
}

window.onload = () =>{
    new App();
}