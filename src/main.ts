import { drawField} from "./draw.js";
import Editor from "./editor.js";
import { createContraints, createField, setFieldValue } from "./table.js";

function main(){
    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;

    const editor:Editor = new Editor(canvas, ctx);
    ctx.font = "1.6em sans";
    const field = createField("id","INTEGER");
    const constraints = createContraints(true);
    setFieldValue(field,{constraints:constraints}); 
    drawField(field,ctx);
    // editor.start();
}

main();
