export class Menu {
    constructor(menuList,ctx,canvas){
        this.menuList = menuList;
        this.ctx = ctx;
        this.canvas = canvas;
        // 드래그 요소  ---
        this.isDrag = false;
        this.screenX = 0;
        this.mouseDownX = 0;
        this.screenMax = menuList.length * 1650 -1650
        // ---
        this.radius_1 = 100;
        this.radius_2 = 70;
        this.radius_3 = 50;
        this.cirCleColor = "#161e38";
        this.lineThickness = 10 //선 굵기 * 2
        
        this.cirCleBetweenX_1 = 1650; // 첫쩃줄 노드 사이
        this.cirCleBetweenX_2 = 400; // 둘쨋줄 노드 사이
        this.cirCleBetweenX_3 = 100; // 3쨋줄 노드 사이
        this.defalutX = 800 
        this.defalutY = 150;
        
        this.nodeXY = {
            x1 : this.defalutX - this.cirCleBetweenX_1 //moveNode로 x 움직이고 시작
            ,y1 : this.defalutY
        }

        this.moveNode(this.nodeXY);
        
        this.x1 =0;
        this.x2 =0;
        this.x3 =0;

        this.isInput = false;

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
        nodeXY.x2 = nodeXY.x1 - 550;
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

    resizeDraw() {
        
        if(this.isInput){
            return;
        }else{
            this.drawInit();
            this.draw();
        }



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
        this.screenX -= 20; 
        this.mouseDownX = dx

        this.drawInit();
        
        this.draw();
        
    }   
    mouseMoveDrawMinus(dx){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.screenX += 20; 
        this.mouseDownX = dx

        this.drawInit();
        
        this.draw();
    } 
    
    mouseMove(canvas,event){
        if(this.isInput){
            return;
        }

        if(this.isDrag){
            const dx = event.clientX;
            if(this.mouseDownX - dx < 0){
           
                if( this.screenX < 0){
                    this.screenX = 0;
                    return;
                }
                window.requestAnimationFrame(this.mouseMoveDrawPlus.bind(this,dx));
            };

            if(this.mouseDownX - dx > 0){
               if(this.screenX > this.screenMax){
                    this.screenX = this.screenMax
                  
                    return;
               }
               console.log(this.screenX)
                window.requestAnimationFrame(this.mouseMoveDrawMinus.bind(this,dx));
            
            }
            
            return;
        }

        this.circleMouseOn(canvas,event);            
        
    }

    circleMouseOn(canvas,event){
        if(this.isInput){
            return;
        }

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
            if(text.length >textLength ) text = text.substring(0,textLength) + "..."
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
        ctx.beginPath();
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = this.cirCleColor;
        const thickness = this.lineThickness;
        
        
        ctx.moveTo(x1,y1);

        ctx.lineTo(x2,y2);
        ctx.stroke()

    
    
    }

    move(x,y){
        this.ctx.moveTo(x,y)
    }


    mouseDown(event){
        if(this.isInput){
            return;
        }

        const dx = event.clientX;
        const dy = event.clientY;
        const menuList = this.menuList;
        let isCircleInCursor = false;
        let clickCircle = null;
        let isBreak = false;

        for (const menu of menuList) {
            if(isBreak) break;

            const firstObj = menu.first
            isCircleInCursor = this.isCircleInCursor(firstObj,dx,dy,this.radius_1) ? true : isCircleInCursor;
            clickCircle = isCircleInCursor === true ? firstObj : clickCircle
            if(isCircleInCursor) {
                isBreak = true;
                break;
            }
            for(const secondObj of firstObj.second){
                if(isBreak) break;
                isCircleInCursor = this.isCircleInCursor(secondObj,dx,dy,this.radius_2) ? true : isCircleInCursor;
                clickCircle = isCircleInCursor === true ? secondObj : clickCircle
                if(isCircleInCursor) {
                    isBreak = true;
                    break;
                }
                
                for(const thirdObj of secondObj.third){
                    if(isBreak) break;
                    isCircleInCursor = this.isCircleInCursor(thirdObj,dx,dy,this.radius_3) ? true : isCircleInCursor;
                    clickCircle = isCircleInCursor === true ? thirdObj : clickCircle
                    if(isCircleInCursor) {
                        isBreak = true;
                        break;
                    }
                }
                
            }
        }

        if(isCircleInCursor){

            console.log("circleClickEvent")
            
            this.circleClickEvent(clickCircle)


            // this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            // this.drawInit()
            // this.draw()
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

    circleClickEvent(circle){
        this.canvas.style.cursor = '';
        this.isInput = true;
        this.isDrag = false;
        
        this.circleClickEventDraw(circle);

    }
    
    circleClickEventDraw(circle){
                 
        console.table(circle)
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.cirCle(this.canvas.width/4,this.canvas.height/4,200)



        const input = document.createElement("input");
        const width = 300;
        const height = 50;
        input.className = "canvasInput";
        input.style.position = "absolute";
        input.style.top = this.canvas.height/4-height/2 + "px"
        input.style.left = this.canvas.width/4-width/2 + "px"
        input.style.width = width+"px"
        input.style.height = height + "px"
        input.style.fontSize = "24px"
        input.value = circle.name;
        
        const cancleButton = document.createElement("button");
        const saveButton = document.createElement("button");
        const buttonList = [];
        const buttonWidth = 140;
        const buttonHeight = 35;
        buttonList.push(cancleButton);
        buttonList.push(saveButton);

        for (const button of buttonList) {
            button.style.position = "absolute";
            button.style.width = buttonWidth+"px";
            button.style.height = buttonHeight + "px";
        }
        cancleButton.style.top = this.canvas.height/4-height/2  +height + 20 + "px";
        cancleButton.style.left = this.canvas.width/4-width/2 + "px";
        cancleButton.innerText ="취소";
        
        saveButton.style.top = this.canvas.height/4-height/2  +height + 20 + "px";
        saveButton.style.left = this.canvas.width/4-width/2 + buttonWidth + 20 +"px";
        saveButton.innerText ="저장";
        
        cancleButton.addEventListener("click",this.clickCancleButton.bind(this,input,cancleButton,saveButton))
        saveButton.addEventListener("click",this.clickSaveButton.bind(this,input,cancleButton,saveButton,circle))
        
        document.body.appendChild(input);
        document.body.appendChild(cancleButton);
        document.body.appendChild(saveButton);
        



        
    }

    clickCancleButton(input,cancleButton,saveButton){
        input.remove();
        cancleButton.remove();
        saveButton.remove();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawInit()
        this.draw();
        this.isInput = false;
    }

    clickSaveButton(input,cancleButton,saveButton,cirCle){
        // save 로직 
        
        //성공
        cirCle.name = input.value

        // 후처리
        input.remove();
        cancleButton.remove();
        saveButton.remove();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawInit()
        this.draw();
        this.isInput = false;
    }


}
