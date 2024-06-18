import { Circle } from "./circle.js";

class App{
    constructor(menuList){
        this.menuList = menuList;
        this.menuLength = menuList.length;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        document.body.addEventListener("resize", this.resize)

        this.resize();


        this.circle = new Circle(this.stageWidth,this.stageHeight,300,this.menuList);
        this.circle.circleDraw(this.ctx)
        
       

      
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight= document.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2)
        
        if(this.menuLength === 0){
            this.noMenu();
            return;
        }
        
     

    }

    noMenu(){
        const img = new Image();
        img.onload = ()=>{
            this.ctx.drawImage(img,this.stageWidth/2- 250,this.stageHeight/2 - 250 ,500 ,500)
        }
        img.src = "./NO_MENU.webp"
    }

}

window.onload = ()=>{
    const menuList = [
        {   
            type : "image",
            url : "www.sasda.asdads",
            name : "practiceCanvas",
            src : "./practiceCanvas_logo.webp",
        }
        ,{
            type : "text",
            url : "www.sasda.asdads",
            name : "Practice_Board",
            src : "",
        }
    ]   
    
    new App(menuList);
}