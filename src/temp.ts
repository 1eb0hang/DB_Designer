import Position from "./position.js";

export interface Cell{
    pos:Position;
    size:number; // in px
    draw:()=>void;
}

export function createCell(text:string, position?:Position):Cell{
    const size = 14;
    let pos = new Position(size*2, size*3);
    if(position){
        pos.goto(position);
        pos.x = parseInt(`${pos.x/14}`.split(".")[0])*size
        pos.y = parseInt(`${pos.y/14}`.split(".")[0])*size
        console.log(`New Position (${pos.x},${pos.y})`);
    }
    const cell:Cell = {
        size:14,
        pos:pos,
        draw:()=>{
            const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
                ?.getContext("2d");
                if(!ctx) return;
                
            ctx.fillStyle = "#f0ff";
            ctx.fillRect(pos.x, pos.y, size, size);

            ctx.fillStyle = "#000f";
            ctx.font = "12px Sans";
            ctx.fillText(text, pos.x, (pos.y+size)-2);
        }
    }
    return cell;
}

export function tempDraw():void{
    const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d");
    if(!ctx) return;

    ctx.font = "12px Sans";
    ctx.fillText("HELLO", 0, 12);
    ctx.fillRect(140, 140, 14, 14);
}

// Keep this for graph back ground
export function setBack(){
    const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d");
    if(!ctx) return;

    
    let pos = new Position();
    for(let i = 0; i<500; i+=14){
        ctx.strokeStyle = "#0006";
        if(i%100 == 0){
            ctx.strokeStyle = "#f006";
        }
        pos = new Position(i,0);
        // console.log(pos);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        // console.log(pos);
        ctx.lineWidth = 1;
        ctx.lineTo(pos.x,pos.y+500);
        ctx.stroke();
    }

    pos = new Position();
    for(let i = 0; i<500; i+=14){
        ctx.strokeStyle = "#0006";
        if(i%100 == 0){
            ctx.strokeStyle = "#f006";
        }
        pos = new Position(0,i);
        // console.log(pos);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        // console.log(pos);
        ctx.lineWidth = 1;
        ctx.lineTo(pos.x+500,pos.y);
        ctx.stroke();
    }
}