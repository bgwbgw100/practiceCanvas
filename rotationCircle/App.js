import { Circle } from "./circle.js";

class App{
     constructor(){
    
      
    }

    async initialize(menuList) {
        this.menuList = menuList;
        this.menuLength = menuList.length;
        this.imageLoadCnt = 0;
        this.imageCnt = 0;
        
        await this.imageSetting();

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        document.body.addEventListener("resize", this.resize)


        this.resize();

        this.circle = new Circle(this.stageWidth,this.stageHeight,300,this.menuList);
        this.circle.circleDraw(this.ctx)
        
        this.canvas.addEventListener("wheel",this.wheelEvent.bind(this))

        
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

    wheelEvent(event){
        const deltaY = event.deltaY;
        console.log(deltaY);
        if(deltaY >0){
            this.circle.mouseWheelDown(this.ctx);
        }


    }

    async imageSetting(){
         this.menuList.forEach(menu => {
            if(menu.type === "image"){
                this.imageCnt ++;
            }
        });

        for(let menu of this.menuList){
            if(menu.type === "image"){

                const img = new Image()
                menu.img = img;

                await this.loadImage(menu)

            }
        }
   
    }

    loadImage(menu){
        return new Promise((resolve, reject) =>{
            menu.img.onload = () => {
                this.imageLoadCnt++;
                resolve();
            }
            menu.img.onerror = reject;
            menu.img.src = menu.src
        }) ;       
    }


}

window.onload = ()=>{
    const menuList = [
        {   
            type : "text",
            url : "www.sasda.asdads",
            name : "practiceCanvas",
            src : "./practiceCanvas_logo.webp",
        }
        ,{
            type : "image",
            url : "www.sasda.asdads",
            name : "Practice_Board",
            src : "./NO_MENU.webp",
        }
        
    ]   
    
    const app = new App();
    app.initialize(menuList);
}