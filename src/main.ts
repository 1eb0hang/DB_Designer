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
    ctx.font = "1.6em sans";
    const field = createField("id","INTEGER");
    const constraints2 = createContraints(true);
    const field2 = createField("id2","INTEGER");
    const constraints3 = createContraints(true);
    const field3 = createField("id3","INTEGER");
    const constraints4 = createContraints(true);
    const field4 = createField("id4","INTEGER");
    const constraints = createContraints(true);
    setFieldValue(field,{constraints:constraints}); 
    // drawField(field,new Position(100,100),ctx);

    const table = createTable([
        field,
        field2,
        field3,
        field4
    ] as Field[],
    new Position(100,100)
    );

    drawTable(table,ctx);
    // editor.start();
}

main();
