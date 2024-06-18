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

    }



    // PI 180 도
    circleDraw(ctx){
        ctx.font = '32px "Shadows Into Light"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 45 45 90
        const startAngle_1 = Math.PI * 5/4;
        const endAngle_1 =   Math.PI * 7/4;
        const startAngle_2 = Math.PI * 7/4;
        const endAngle_2 =   Math.PI * 1/4;
        const startAngle_3 = Math.PI * 1/4;
        const endAngle_3 =   Math.PI * 3/4;
        // 회전을 위한 안보이는 4번째 부분
        const startAngle_4 =   Math.PI * 3/4; 
        const endAngle_4 =   Math.PI * 5/4; 
        const harfRadius = (this.radius - this.smallRadius) / 2 ;
        const menu_1 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const menu_2 = this.menuList[this.menuIdx];
        this.menuIdxPlus();
        const menu_3 = this.menuList[this.menuIdx];
        this.menuIdxPlus();

    

        const smallCircle_startAngle_xy_1 = this.coordinate(this.x,this.y,startAngle_1,this.smallRadius);
        const smallCircle_endAngle_xy_1 = this.coordinate(this.x,this.y,endAngle_1,this.smallRadius);
        const smallCircle_startAngle_xy_2 = this.coordinate(this.x,this.y,startAngle_2,this.smallRadius);
        const smallCircle_endAngle_xy_2 = this.coordinate(this.x,this.y,endAngle_2,this.smallRadius);
        const smallCircle_startAngle_xy_3 = this.coordinate(this.x,this.y,startAngle_3,this.smallRadius);
        const smallCircle_endAngle_xy_3 = this.coordinate(this.x,this.y,endAngle_3,this.smallRadius);
        const smallCircle_startAngle_xy_4 = this.coordinate(this.x,this.y,startAngle_4,this.smallRadius);
        const smallCircle_endAngle_xy_4 = this.coordinate(this.x,this.y,endAngle_4,this.smallRadius);

        if(menu_1.type === "image"){

            const img = new Image();
            
            img.src = menu_1.src
            img.onload = () => {
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
                ctx.drawImage(img, this.x - 200 , this.y - harfRadius -250 , 400, 400);
    
    
                ctx.restore();
                
                ctx.beginPath()
                ctx.fillStyle = "#FFFFFF"
                ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_1 );
                ctx.fill()
    
            }
        }else if (menu_1.type === "text"){
            ctx.beginPath()
            ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
            ctx.arc(this.x,this.y,this.radius ,startAngle_2,endAngle_2);        
            ctx.lineTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
            ctx.stroke();
        }


        if(menu_2.type === "image"){
            const img = new Image();
            img.src = "./practiceCanvas_logo.webp"
            img.onload = () => {
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
                ctx.drawImage(img, this.x - 200 , this.y - harfRadius -250 , 400, 400);
                
                ctx.restore();
                
                ctx.beginPath()
               
    
            }

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
            
            ctx.fillText(text,this.x + this.smallRadius + this.radius/2 - this.radius/6 , this.y )

            ctx.stroke();
        }

        
        

        
        

        ctx.beginPath()
        ctx.moveTo(smallCircle_startAngle_xy_2.x,smallCircle_startAngle_xy_2.y);
        ctx.arc(this.x,this.y,this.radius ,startAngle_2,endAngle_2);        
        ctx.lineTo(smallCircle_endAngle_xy_2.x,smallCircle_endAngle_xy_2.y);
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(smallCircle_startAngle_xy_3.x,smallCircle_startAngle_xy_3.y);
        ctx.arc(this.x,this.y,this.radius ,startAngle_3,endAngle_3);        
        ctx.lineTo(smallCircle_endAngle_xy_3.x,smallCircle_endAngle_xy_3.y);
        ctx.stroke();
        // 회전을위한 안보이는 부분
        ctx.beginPath()
        ctx.moveTo(smallCircle_startAngle_xy_4.x,smallCircle_startAngle_xy_4.y);
        ctx.arc(this.x,this.y,this.radius ,startAngle_4,endAngle_4);        
        ctx.lineTo(smallCircle_endAngle_xy_4.x,smallCircle_endAngle_xy_4.y);

        ctx.stroke();
        
        // 가운데 작은원 덮어쓰기 처리
        ctx.fillStyle = "#FFFFFF"
        ctx.arc(this.x,this.y,this.smallRadius,startAngle_1 , endAngle_1 );
        ctx.fill()
        
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
        this.menuIdx++;
        if(this.menuIdx >= this.menuList.length){
            this.menuIdx = 0
        }
    }



    
    // draw(ctx ,startAngle, endAngle){
    //     ctx.beginPath()
    //     ctx.moveTo(this.x,this.y);
    //     ctx.arc(this.x,this.y,this.radius ,startAngle,endAngle);        
    //     ctx.lineTo(this.x,this.y);
    //     ctx.stroke();
        
    // }


}