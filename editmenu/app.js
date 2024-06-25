import { Menu } from "./menu.js";

class App{
    constructor(menuList){
        this.menuList = menuList;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        window.document.body.appendChild(this.canvas);

        this.menu = new Menu(menuList,this.ctx,this.canvas)
        
        this.resize();
        
        window.addEventListener("resize",this.resize.bind(this));
        this.canvas.addEventListener("mousemove",this.menu.mouseMove.bind(this.menu,this.canvas))
        this.canvas.addEventListener("mousedown",this.menu.mouseDown.bind(this.menu));
        this.canvas.addEventListener("mouseup",this.menu.mouseUp.bind(this.menu));
        this.canvas.addEventListener("click",this.menu.mouseClick.bind(this.menu))

    }


    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.menu.resizeDraw()
    }

}

window.onload = ()=>{
    const menuList = [{
        first : {
            name : "첫번쨰 메뉴 뎁스_1",
            engName : "first_1"
            ,type : "menu"
            ,second : [
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }

                  
                ] 
            },
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
             
                ] 
            },
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                ] 
            },
        ]
        },
    },
    {
        first : {
            name : "첫번쨰 메뉴 뎁스_1",
            engName : "first_1"
            ,type : "menu"
            ,second : [
                {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                ] 
            },
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                ] 
            },
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                ] 
            },
            {
                name : "두번째 메뉴 뎁스",
                engName : "second_1",
                type : "menu"
                ,third : [
                    {
                    name : "세번째 메뉴 뎁스",
                    engName : "third_1",
                    type : "board"
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_1",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                    ,
                    {
                        name : "3333333",
                        engName : "3_two",
                        type : "menu",
                        third  :[

                        ]
                    }
                ] 
            },
        ]
        },
    },
    ]


    new App(menuList)
}