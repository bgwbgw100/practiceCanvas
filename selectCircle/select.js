export class Select{
    constructor(stageWidth , stageHeight){
        this.x = stageWidth/2;
        this.y = stageHeight/2;
        this.radius = 200;
        this.radians = Math.PI/180
        this.colors = ['#FF0000','#BFFF00','#D8F781','#D8F781','#01DFA5','#585858','#58FF58']
        this.closeUp = 0;
        this.moveFlag = false;
        this.beforeAngle = {}; 

    }

    draw(ctx, cnt){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius , 0 , 2*Math.PI);
        ctx.stroke();
        this.angle = 360/cnt
        this.ho = [];
        let sum = 0;
        let sumPi = 0;
        const colorSet = new Set();
        
        for(let i = 0 ; i < cnt ; i++){
            const x1 = this.x + Math.cos((-90 + this.angle/2 + sum ) * this.radians) * this.radius;
            const y1 = this.y + Math.sin((-90 + this.angle/2 + sum ) * this.radians ) * this.radius;
            const x2 = this.x + Math.cos((-90 - this.angle/2 + sum) * this.radians ) * this.radius;
            const y2 = this.y + Math.sin((-90 - this.angle/2 + sum ) * this.radians ) * this.radius;
            
            let randomColor = this.colors[ Math.floor(Math.random()*(cnt+1))];
            while(true ){
                if(colorSet.has(randomColor)){
                    randomColor =   this.colors[Math.floor(Math.random()*(cnt+1))];
                    continue;
                }
                colorSet.add(randomColor);
                break;
            }
            
            const startAngle =   -2* Math.PI / (cnt *2) - 2/4*Math.PI + sumPi ;

            const endAngle =   2* Math.PI / (cnt *2) - 2/4*Math.PI + sumPi;
             
            this.ho.push({
                
                x1 : x1,
                y1 : y1,
                x2 : x2,
                y2 : y2,
                startAngle : startAngle,
                endAngle : endAngle,

                color : randomColor
            })
            sum += this.angle;

            sumPi += 2*Math.PI/cnt
        }

    
        this.ho.forEach(obj =>{

            ctx.beginPath()
            ctx.fillStyle =obj.color;
            ctx.moveTo(this.x,this.y)
            ctx.arc(this.x,this.y,this.radius,obj.startAngle,obj.endAngle)

            ctx.fill()
            ctx.stroke();
            
        })

        
    }

    // 이벤트추가 
    // 이벤트 발동조건 x,y 좌표의 거리가 반지름보다 작으면서 각도에 해당하는 호 크기를 키워줌
    mouseEvent(ctx,event){
      
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const radiusSquare = this.radius* this.radius;
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const circleMouseLength = dx * dx + dy * dy ;
        // 반지름보다 거리가 멀면 outEvent
        if( circleMouseLength > radiusSquare){
            this.mouseOutEvent(ctx)
            this.moveFlag = false;
            return;
        }

        let angle = Math.atan2(dy,dx)
        if(this.moveFlag){

            if( (this.beforeAngle.changeStartAngle > 0 && this.beforeAngle.changeEndAngle < 0 ) && (angle > this.beforeAngle.changeStartAngle || angle < this.beforeAngle.changeEndAngle) ){
                return
            }else if( this.beforeAngle.changeStartAngle<=  angle && angle <= this.beforeAngle.changeEndAngle ){
                return
            }else{
                
                this.mouseOutEvent(ctx)
                this.anmationId = window.requestAnimationFrame(this.drawMouseEvent.bind(this,angle,ctx))

            }
            
            
        }


        if(this.moveFlag === false){
            this.moveFlag = true;
            
            this.anmationId = window.requestAnimationFrame(this.drawMouseEvent.bind(this,angle,ctx))

        }

        
        
        

    }

    mouseOutEvent(ctx){

        ctx.clearRect(0,0,this.x*2,this.y*2)

        this.ho.forEach(obj =>{

            ctx.beginPath()
            ctx.fillStyle =obj.color;
            ctx.moveTo(this.x,this.y)
            ctx.arc(this.x,this.y,this.radius,obj.startAngle,obj.endAngle)
            ctx.fill()
            ctx.stroke();
        });
        this.closeUp = 0;

        cancelAnimationFrame(this.anmationId)
    }


    drawMouseEvent(angle,ctx){

        ctx.clearRect(0,0,this.x*2,this.y*2)
        
        
        this.ho.forEach(obj =>{
           // angle의 각도는 180 ~ -180 으로 표현 됨
           // startAngle , endANgle 또한 180~ -180으로 변경후 비교
           // 180에서 - 으로 바뀌는 부분을 따로 처리 해줘야함
            let changeStartAngle = this.setAngle(obj.startAngle);
            let changeEndAngle = this.setAngle(obj.endAngle); 
            if( (changeStartAngle > 0 && changeEndAngle < 0 ) && (angle > changeStartAngle || angle < changeEndAngle) ){

                ctx.beginPath()
                ctx.fillStyle =obj.color;
                ctx.moveTo(this.x,this.y)
                ctx.arc(this.x,this.y,this.radius +this.closeUp,obj.startAngle,obj.endAngle)
                ctx.fill()
                ctx.stroke();
                
                this.beforeAngle = { 
                    changeStartAngle : changeStartAngle
                    ,changeEndAngle : changeEndAngle
                }

            }else if( changeStartAngle<=  angle && angle <= changeEndAngle ){

                this.beforeAngle = { 
                    changeStartAngle : changeStartAngle
                    ,changeEndAngle : changeEndAngle
                }

                ctx.beginPath()
                ctx.fillStyle =obj.color;
                ctx.moveTo(this.x,this.y)
                ctx.arc(this.x,this.y,this.radius +this.closeUp,obj.startAngle,obj.endAngle)
                ctx.fill()
                ctx.stroke();
                
            }else{
                
                ctx.beginPath()
                ctx.fillStyle =obj.color;
                ctx.moveTo(this.x,this.y)
                ctx.arc(this.x,this.y,this.radius,obj.startAngle,obj.endAngle)
                ctx.fill()
                ctx.stroke();

            }
          
        });

        this.closeUp += 0.1;
        if(this.closeUp > 50){
            this.closeUp = 0;
        }
        this.anmationId = window.requestAnimationFrame(this.drawMouseEvent.bind(this,angle,ctx))

    }

    

    setAngle(angle){
        let newAngle = angle;
    
        if( angle > Math.PI){
            
            newAngle = angle - Math.PI - Math.PI;
            
        }
        return newAngle;

    }

    
}

