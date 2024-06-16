import{
    Ball
} from './ball.js'

import{
    Block
} from './block.js'

class App{
    constructor(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize",this.resize.bind(this),false)
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
        this.block = new Block(700,30,300,450);

        window.requestAnimationFrame(this.animate.bind(this))

    }

    resize(){
        this.stageWidth = document.body.clientWidth; 
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight) // 캔버스의 전체부분을 한번지워줌 (애니메이션이 계속 생성된상태이기에 움직이는 상태를 표현하며 전에있던 애니메이션을 지우며 움직이는 모습을 표현)

        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight,this.block) // 애니메이션 그려주기

        this.block.draw(this.ctx);
    }

}

window.onload = () => {
    new App();
}