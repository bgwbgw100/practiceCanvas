export class Select{
    constructor(stageWidth , stageHeight){
        this.x = stageWidth/2;
        this.y = stageHeight/2;
        this.radius = 200;
        this.radians = Math.PI/180
        this.colors = ['#FF0000','#BFFF00','#D8F781','#D8F781','#01DFA5','#585858']

    }

    draw(ctx, cnt){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius , 0 , 2*Math.PI);
        ctx.stroke();
        this.angle = 360/cnt
        const ho = [];
        let sum = 0;
        let sumPi = 0;
        const colorSet = new Set();
        
        for(let i = 0 ; i < cnt ; i++){
            const x1 = this.x + Math.cos((-90 + this.angle/2 + sum ) * this.radians) * this.radius;
            const y1 = this.y + Math.sin((-90 + this.angle/2 + sum ) * this.radians ) * this.radius;
            const x2 = this.x + Math.cos((-90 - this.angle/2 + sum) * this.radians ) * this.radius;
            const y2 = this.y + Math.sin((-90 - this.angle/2 + sum ) * this.radians ) * this.radius;
            
            let randomColor = this.colors[ Math.floor(Math.random()*6)];
            while(true ){
                if(colorSet.has(randomColor)){
                    randomColor =   this.colors[Math.floor(Math.random()*6)];
                    continue;
                }
                colorSet.add(randomColor);
                break;
            }
            ho.push({
                
                x1 : x1,
                y1 : y1,
                x2 : x2,
                y2 : y2,
                startAngle : 0 -  2/4*Math.PI - 2/cnt * Math.PI / 2 + sumPi,
                endAngle : 0 - 2/4*Math.PI + 2/cnt * Math.PI / 2 + sumPi,
                color : randomColor
            })
            sum += this.angle;

            sumPi += 2*Math.PI/cnt
        }

        
        
        ho.forEach(obj =>{
            ctx.beginPath()
            ctx.fillStyle =obj.color;
            ctx.moveTo(this.x,this.y)
            ctx.arc(this.x,this.y,this.radius,obj.startAngle,obj.endAngle)

            ctx.fill()
            ctx.stroke();
            
        })

        
    
      
        

    }
}

