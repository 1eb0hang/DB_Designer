import { drawField } from "./draw.js";
import Editor from "./editor.js";
import Position from "./position.js";
import { Field } from "./table.js";
import { Cell, createCell, setBack, tempDraw } from "./temp.js";

function main(){
    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;

    // drawField({
    //     name:"some other name here",
    //     type:"INTEGER",
    //     size:0,
    //     default:"",
    //     description:"",
    //     constraints:{
    //         primaryKey:true,
    //         allowNull:false,
    //         unique:true,
    //         autoIncrement:true,
    //         foriegnKey:false,
    //         foriegnKeyValue:null
    //     }
    // }, new Position(500,500));
    // const editor:Editor = new Editor(canvas, ctx);
    // editor.start();
    setBack();
    // tempDraw();
    const cell:Cell =  createCell("CELL", new Position(200,200));
    cell.draw();
}

main();