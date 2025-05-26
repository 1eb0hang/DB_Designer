import { drawField, drawTable} from "./draw.js";
import Editor from "./editor.js";
import { createContraints, createField, createTable, Field, setFieldValue } from "./table.js";
import Position from "./util/position.js";

function main(){
    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;

    const editor:Editor = new Editor(canvas, ctx);
    // editor.start();
}

main();
