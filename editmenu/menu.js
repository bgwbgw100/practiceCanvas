export class Menu {
    constructor(menuList,ctx,canvas){
        this.menuList = menuList;
        this.ctx = ctx;
        this.canvas = canvas;
        // 드래그 요소  ---
        this.isDrag = false;
        this.screenX = 0;
        this.mouseDownX = 0;
        // ---
        this.radius_1 = 100;
        this.radius_2 = 70;
        this.radius_3 = 50;
        this.cirCleColor = "#161e38";
        this.lineThickness = 10 //선 굵기 * 2
        
        this.cirCleBetweenX_1 = 700; // 첫쩃줄 노드 사이
        this.cirCleBetweenX_2 = 50; // 둘쨋줄 노드 사이
        this.cirCleBetweenX_3 = 120; // 3쨋줄 노드 사이
        this.defalutX = 400 
        this.defalutY = 150;
        
        this.nodeXY = {
            x1 : this.defalutX - this.cirCleBetweenX_1 //moveNode로 x 움직이고 시작
            ,y1 : this.defalutY
        }

        this.moveNode(this.nodeXY);
        
        this.x1 =0;
        this.x2 =0;
        this.x3 =0;

    }

    drawInit(){
        this.nodeXY = {
            x1 : this.defalutX - this.cirCleBetweenX_1 - this.screenX //moveNode로 x 움직이고 시작
            ,y1 : this.defalutY
        }

        this.moveNode(this.nodeXY);
        
    }


    moveNode(nodeXY){
        nodeXY.x1 = nodeXY.x1 + this.cirCleBetweenX_1;
        nodeXY.x2 = nodeXY.x1 - 200;
        nodeXY.y2 = nodeXY.y1 + 250;
        nodeXY.x3 = nodeXY.x2 - 150;
        nodeXY.y3 = nodeXY.y2 + 250;

    }
    secondMoveNode(nodeXY){
        nodeXY.x2 = nodeXY.x2 + this.cirCleBetweenX_2;
        nodeXY.x3 = nodeXY.x2 - 150;
    }

    thirdMoveNode(nodeXY){
        nodeXY.x3 = nodeXY.x3 + this.cirCleBetweenX_3;
        
    }


    draw(){
        const menuList = this.menuList;

        const nodeXY = this.nodeXY; 

        
        for (const menu of menuList) {
            this.ctx.beginPath();
            const firstObj = menu.first
            this.cirCle(nodeXY.x1,nodeXY.y1,this.radius_1)
            
            firstObj.x = nodeXY.x1;
            firstObj.y = nodeXY.y1;

            for(const secondObj of firstObj.second){
                secondObj.x = nodeXY.x2;
                secondObj.y = nodeXY.y2;

                this.rect(nodeXY.x1,nodeXY.y1,nodeXY.x2,nodeXY.y2)
                this.cirCle(nodeXY.x2,nodeXY.y2,this.radius_2);
                // 3번째 반복문
                for(const thirdObj of secondObj.third){
                    
                    thirdObj.x = nodeXY.x3;
                    thirdObj.y = nodeXY.y3;

                    this.rect(nodeXY.x2,nodeXY.y2,nodeXY.x3,nodeXY.y3)
                    this.cirCle(nodeXY.x3,nodeXY.y3,this.radius_3);
                    //after
                    this.text(thirdObj.name , nodeXY.x3, nodeXY.y3, 5);
                    this.thirdMoveNode(nodeXY);
                }

                //after
                this.text(secondObj.name ,nodeXY.x2 , nodeXY.y2,6);
                this.secondMoveNode(nodeXY);
            }
 
             // after
            this.text(firstObj.name ,nodeXY.x1,nodeXY.y1,9) // 선이그려진후 text를 그려 선에 가려지지 않게 처리
            this.moveNode(nodeXY)
        }

        // this.cirCle(x1,y1,this.radius_1);
        // this.rect(x1,y1,x2,y2);
        // this.text("텍스트",x1,y1);
        // this.cirCle(x2,y2,this.radius_2);
        // this.rect(x2,y2,x3,y3);
        // this.cirCle(x3,y3,this.radius_3);

        // this.cirCle(1100,150,this.radius_1);
        
    }

    mouseMoveDrawPlus(dx){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.screenX -= 3.5; 
        this.mouseDownX = dx

        this.drawInit();
        
        this.draw();
        
    }   
    mouseMoveDrawMinus(dx){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.screenX += 3.5; 
        this.mouseDownX = dx

        this.drawInit();
        
        this.draw();
    } 
    
    mouseMove(canvas,event){
        if(this.isDrag){
            const dx = event.clientX;
            if(this.mouseDownX - dx > 0){
                
                window.requestAnimationFrame(this.mouseMoveDrawPlus.bind(this,dx));
            };

            if(this.mouseDownX - dx< 0){
                if( this.screenX >= 0){
                    this.screenX = 0;
                    return;
                }
                window.requestAnimationFrame(this.mouseMoveDrawMinus.bind(this,dx));
            }
            
            return;
        }

        this.circleMouseOn(canvas,event);            
        
    }

    circleMouseOn(canvas,event){
        const dx = event.clientX;
        const dy = event.clientY;
        const menuList = this.menuList;


        for (const menu of menuList) {
            const firstObj = menu.first
            
            if(this.setCircleCursor(firstObj,dx,dy,this.radius_1,canvas)) return;

            for(const secondObj of firstObj.second){
      
                if(this.setCircleCursor(secondObj,dx,dy,this.radius_2,canvas)) return;

                for(const thirdObj of secondObj.third){
                    
                    if(this.setCircleCursor(thirdObj,dx,dy,this.radius_3,canvas)) return;

                }

            }

        }

        canvas.style.cursor = '';

    }    

    setCircleCursor(obj,dx,dy,radius ,canvas) {
        const distance = Math.sqrt( (obj.x - dx)*(obj.x - dx) + (obj.y - dy)*(obj.y - dy));
        if(radius  >=distance){
            canvas.style.cursor = 'pointer';
            return true;
        }

        return false;
    }


    text(text,x,y,textLength){
        if(textLength){
            text = text.substring(0,textLength) + "..."
        }

        this.ctx.beginPath();
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.fillStyle="#FFFFFF"
        this.ctx.fillText(text,x,y)
        
        
        
        
    }


    cirCle(x,y,radius){
        this.ctx.beginPath();
        const cirCleColor = this.cirCleColor;
        const ctx = this.ctx;
        ctx.fillStyle = cirCleColor;
        ctx.moveTo(x,y)
        ctx.arc(x,y,radius,0, Math.PI*2)
        ctx.fill();
    }

    rect(x1,y1,x2,y2){
        
        const ctx = this.ctx;
        ctx.fillStyle = this.cirCleColor;
        const thickness = this.lineThickness;
        ctx.moveTo(x1-thickness,y1);
        ctx.lineTo(x1+thickness,y1)
        ctx.lineTo(x2+thickness,y2);
        ctx.lineTo(x2-thickness,y2);
        ctx.fill();
    
    
    }

    move(x,y){
        this.ctx.moveTo(x,y)
    }


    mouseDown(event){
        const dx = event.clientX;
        const dy = event.clientY;
        const menuList = this.menuList;
        let isCircleInCursor = false;

        for (const menu of menuList) {
            const firstObj = menu.first
            isCircleInCursor = this.isCircleInCursor(firstObj,dx,dy,this.radius_1) ? true : isCircleInCursor;

            for(const secondObj of firstObj.second){
                isCircleInCursor = this.isCircleInCursor(firstObj,dx,dy,this.radius_2) ? true : isCircleInCursor;

                for(const thirdObj of secondObj.third){
                    isCircleInCursor = this.isCircleInCursor(firstObj,dx,dy,this.radius_3) ? true : isCircleInCursor;
                }
            }
        }

        if(isCircleInCursor){
            console.log("circleClickEvent")
            return;
        }
        this.mouseDownX = dx;

        this.isDrag = true;

    }

    mouseUp(event){
        this.isDrag = false;
    }

    isCircleInCursor(obj,dx,dy,radius ) {
        const distance = Math.sqrt( (obj.x - dx)*(obj.x - dx) + (obj.y - dy)*(obj.y - dy));
        if(radius  >=distance){
            return true;
        }

        return false;
    }

}
