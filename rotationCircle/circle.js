export class Circle{

    constructor(stageWidth, stageHeight ,radius,menuList){
        // 원 그릴 좌표 (반원만 그릴예정)
        this.x = 0;
        this.y = stageHeight/2
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.radius = radius
        this.smallRadius = 80;
        this.menuList = menuList;
        this.menuIdx = 0;
        this.eventAngle = 0;
        this.eventAngleIncrease = 1;
        this.eventAngleDecrease = -1;
        this.mouseWheelFlag = false;

    }

  



    // PI 180 도
    circleDraw(ctx){
        ctx.clearRect(0,0,this.stageWidth*2,this.stageHeight*2)
        ctx.font = '32px "Shadows Into Light"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 45 45 90
        const startAngle_1 = Math.PI/180 * (225 + this.eventAngle); 
        const endAngle_1 =   Math.PI/180 * (315 + this.eventAngle);
        const startAngle_2 = Math.PI/180 * (315 + this.eventAngle);
        const endAngle_2 =   Math.PI/180 * (45 + this.eventAngle);
        const startAngle_3 = Math.PI/180 * (45 + this.eventAngle);
        const endAngle_3 =   Math.PI/180 * (135 + this.eventAngle);
        // 회전을 위한 안보이는 4번째 부분
        const startAngle_4 =   Math.PI/180 * (135 + this.eventAngle); 
        const endAngle_4 =   Math.PI/180 * (225 + this.eventAngle);
        const harfRadius = (this.radius - this.smallRadius) / 2 ;
        const menu_1 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const menu_2 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const menu_3 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const menu_4 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const imageSize = { width: 400 , height : 400};
        let menu_1_x = this.getCircleX(-90 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius) ,this.x);
        let menu_1_y = this.getCirCleY(-90 + this.eventAngle, ((this.radius - this.smallRadius)/2 + this.smallRadius), this.y ) ;
        let menu_2_x = this.getCircleX(0 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius), this.x);
        let menu_2_y = this.getCirCleY(0 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius), this.y);
        let menu_3_x = this.getCircleX(90 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius) ,this.x);
        let menu_3_y = this.getCirCleY(90 + this.eventAngle, ((this.radius - this.smallRadius)/2 + this.smallRadius), this.y ) ;
        let menu_4_x = this.getCircleX(180 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius), this.x);
        let menu_4_y = this.getCirCleY(180 + this.eventAngle,((this.radius - this.smallRadius)/2 + this.smallRadius), this.y );
        

        const smallCircle_startAngle_xy_1 = this.coordinate(this.x,this.y,startAngle_1,this.smallRadius);
        const smallCircle_endAngle_xy_1 = this.coordinate(this.x,this.y,endAngle_1,this.smallRadius);
        const smallCircle_startAngle_xy_2 = this.coordinate(this.x,this.y,startAngle_2,this.smallRadius);
        const smallCircle_endAngle_xy_2 = this.coordinate(this.x,this.y,endAngle_2,this.smallRadius);
        const smallCircle_startAngle_xy_3 = this.coordinate(this.x,this.y,startAngle_3,this.smallRadius);
        const smallCircle_endAngle_xy_3 = this.coordinate(this.x,this.y,endAngle_3,this.smallRadius);
        const smallCircle_startAngle_xy_4 = this.coordinate(this.x,this.y,startAngle_4,this.smallRadius);
        const smallCircle_endAngle_xy_4 = this.coordinate(this.x,this.y,endAngle_4,this.smallRadius);

        if(menu_1.type === "image"){

            const img = menu_1.img;
        
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_1.x,smallCircle_startAngle_xy_1.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_1,endAngle_1);  
            ctx.lineTo(smallCircle_endAngle_xy_1.x,smallCircle_endAngle_xy_1.y);
            ctx.moveTo(smallCircle_startAngle_xy_1.x,smallCircle_startAngle_xy_1.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_1 );
            ctx.moveTo(smallCircle_endAngle_xy_1.x,smallCircle_endAngle_xy_1.y);
            ctx.closePath();
            ctx.clip();            
            ctx.stroke();
            
            const gradient = ctx.createLinearGradient(0,0,300,300)

            gradient.addColorStop(0,"#9f9c94");
            gradient.addColorStop(1,"rgb(142,141,135)");

            ctx.fillStyle=gradient
            ctx.fill();
            ctx.drawImage(img, menu_1_x - 200 ,  menu_1_y - 200  , 400, 400);


            ctx.restore();
            
            ctx.beginPath()
            ctx.fillStyle = "#FFFFFF"
            ctx.moveTo(this.x,this.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_1 );
            ctx.fill()
    
        }else if (menu_1.type === "text"){
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_1.x,smallCircle_startAngle_xy_1.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_1,endAngle_1);  
            ctx.lineTo(smallCircle_endAngle_xy_1.x,smallCircle_endAngle_xy_1.y);
            let text =  menu_1.name;
            if(text.length>15){
                text = text.substring(0,15);
                text +="..";
            }

            ctx.fillStyle = "black"
            ctx.fillText(text,menu_1_x,menu_1_y  );
            ctx.moveTo(smallCircle_startAngle_xy_1.x,smallCircle_startAngle_xy_1.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_1 );
            
            ctx.stroke();

            
        }
  

        if(menu_2.type === "image"){
            const img = menu_2.img;
            
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_2,endAngle_2);  
            ctx.lineTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
            ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_2 , endAngle_2 );
            ctx.moveTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
            ctx.closePath();
            ctx.clip();            
            ctx.stroke();
            
            const gradient = ctx.createLinearGradient(0,0,300,300)

            gradient.addColorStop(0,"#9f9c94");
            gradient.addColorStop(1,"rgb(142,141,135)");
            ctx.fillStyle=gradient
            ctx.fill();
            ctx.drawImage(img, menu_2_x -200 , menu_2_y -200 , 400, 400);
            
            ctx.restore();

            ctx.beginPath()
            ctx.fillStyle = "#FFFFFF"
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_2 , endAngle_2 );
            ctx.fill()
                        

        }else if(menu_2.type === "text"){
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_2,endAngle_2);        
            ctx.lineTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
            let text =  menu_2.name;
            if(text.length>15){
                text = text.substring(0,15);
                text +="..";
            }
            ctx.fillStyle = "black"
            
            ctx.fillText(text,menu_2_x , menu_2_y);
            ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_2 , endAngle_2 );

            ctx.stroke();
        }

        if(menu_3.type === "image"){
            const img = menu_3.img;
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_3,endAngle_3);  
            ctx.lineTo(smallCircle_endAngle_xy_3.x,smallCircle_endAngle_xy_3.y);
            ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_3 , endAngle_3 );
            ctx.moveTo(smallCircle_endAngle_xy_3.x,smallCircle_endAngle_xy_3.y);
            ctx.closePath();
            ctx.clip();            
            ctx.stroke();
            
            const gradient = ctx.createLinearGradient(0,0,300,300)

            gradient.addColorStop(0,"#9f9c94");
            gradient.addColorStop(1,"rgb(142,141,135)");
            
            ctx.fillStyle=gradient
            ctx.fill();
            ctx.drawImage(img, menu_3_x - 200 , menu_3_y - 200 , 400, 400);
            
            ctx.restore();

            ctx.beginPath()
            ctx.fillStyle = "#FFFFFF"
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_3 , endAngle_3 );
            ctx.fill();''
               
        }else if(menu_3.type === "text"){
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_3,endAngle_3);        
            ctx.lineTo(smallCircle_endAngle_xy_3.x,smallCircle_endAngle_xy_3.y);
            let text =  menu_3.name;
            if(text.length>15){
                text = text.substring(0,15);
                text +="..";
            }
            ctx.fillStyle = "black"
            ctx.fillText(text, menu_3_x , menu_3_y  );
            ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_3 , endAngle_3 );
            ctx.stroke();
        }

        

        if(menu_4.type === "image"){
            const img = menu_4.img;
        
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_4,endAngle_4);  
            ctx.lineTo(smallCircle_endAngle_xy_4.x,smallCircle_endAngle_xy_4.y);
            ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_4 , endAngle_4 );
            ctx.moveTo(smallCircle_endAngle_xy_4.x,smallCircle_endAngle_xy_4.y);
            ctx.closePath();
            ctx.clip();            
            ctx.stroke();
            
            const gradient = ctx.createLinearGradient(0,0,300,300)

            gradient.addColorStop(0,"#9f9c94");
            gradient.addColorStop(1,"rgb(142,141,135)");
            
            ctx.fillStyle=gradient
            ctx.fill();
            ctx.drawImage(img, menu_4_x - 200 , menu_4_y  - 200, 400, 400);
            
            ctx.restore();

            ctx.beginPath()
            ctx.fillStyle = "#FFFFFF"
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_4 , endAngle_4 );
            ctx.fill()
                
               
    

        }else if(menu_4.type === "text"){
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_4,endAngle_4);        
            ctx.lineTo(smallCircle_endAngle_xy_4.x,smallCircle_endAngle_xy_4.y);
            let text =  menu_4.name;
            if(text.length>15){
                text = text.substring(0,15);
                text +="..";
            }
            ctx.fillStyle = "black"
            ctx.fillText(text, menu_4_x  , menu_4_y   , this.y );
            ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
            ctx.arc(this.x,this.y,this.smallRadius,startAngle_4 , endAngle_4 );
           
 
            ctx.stroke();
        }



        
        

        // ctx.beginPath()
        // ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
        // ctx.arc(this.x,this.y,this.radius ,startAngle_2,endAngle_2);        
        // ctx.lineTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
        // ctx.stroke();

        // ctx.beginPath()
        // ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
        // ctx.arc(this.x,this.y,this.radius ,startAngle_3,endAngle_3);        
        // ctx.lineTo(smallCircle_endAngle_xy_3.x,smallCircle_endAngle_xy_3.y);
        // ctx.stroke();
        // 회전을위한 안보이는 부분
        // ctx.beginPath()
        // ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
        // ctx.arc(this.x,this.y,this.radius ,startAngle_4,endAngle_4);        
        // ctx.lineTo(smallCircle_endAngle_xy_4.x,smallCircle_endAngle_xy_4.y);

        ctx.stroke();



        // ctx.beginPath()
        // ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_3 );
        // ctx.stroke();
        
    }

    coordinate(x,y,angle,radius){

        const x1 = x + Math.cos(angle)*radius;
        const y1 = y + Math.sin(angle)*radius;

        return {x : x1 , y : y1}

    }

    menuIdxPlus(){
        this.menuIdx= this.menuIdx + 1;
        if(this.menuIdx >= this.menuList.length){
            this.menuIdx = 0
        }
    }
    menuIdxMinus(){
        this.menuIdx= this.menuIdx - 1;
        if(this.menuIdx < 0){
            this.menuIdx = this.menuList.length-1
        }
    }


    mouseWheelDown(ctx){
        if(this.mouseWheelFlag){
            return
        }else{
            this.mouseWheelFlag = true;
        }
        window.requestAnimationFrame(this.circleDrawWheelDownEvent.bind(this,ctx))
    }

    mouseWheelUp(ctx){
        
        if(this.mouseWheelFlag){
            return
        }else{
            this.mouseWheelFlag = true;
        }
        window.requestAnimationFrame(this.circleDrawWheelUpEvent.bind(this,ctx))
    }

    circleDrawWheelUpEvent(ctx){
        
        if(this.eventAngle <= -90){
            this.mouseWheelFlag = false;
            this.eventAngle = 0;
            this.menuIdxMinus();
            this.circleDraw(ctx);
        }else{
            this.eventAngle += this.eventAngleDecrease;
            
            this.circleDraw(ctx);
            window.requestAnimationFrame(this.circleDrawWheelUpEvent.bind(this,ctx))    
        } 
        
    }
    circleDrawWheelDownEvent(ctx){
        
        if(this.eventAngle >= 90){
            this.mouseWheelFlag = false;
            this.eventAngle = 0;
            this.menuIdxPlus();
            this.circleDraw(ctx);
        }else{
            this.eventAngle += this.eventAngleIncrease;
            this.circleDraw(ctx);
            window.requestAnimationFrame(this.circleDrawWheelDownEvent.bind(this,ctx))    
        } 
        
    }

   
    
    // draw(ctx ,startAngle, endAngle){
    //     ctx.beginPath()
    //     ctx.moveTo(this.x,this.y);
    //     ctx.arc(this.x,this.y,this.radius ,startAngle,endAngle);        
    //     ctx.lineTo(this.x,this.y);
    //     ctx.stroke();
        
    // }
    

    getCircleX(angle,radius,x){
        return Math.cos(angle * Math.PI/180)*radius + x;
    }

    getCirCleY(angle,radius,y){
        return Math.sin(angle * Math.PI/180)*radius + y
    }


}

