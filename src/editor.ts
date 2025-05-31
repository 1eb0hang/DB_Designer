import * as form from "./form.js";
import ContextMenu from "./contextmenu.js";
import { createDisplayTable, DisplayTable } from "./datadisplay.js";
import Table from "./table.js";
import Position from "./util/position.js";
import { drawTable } from "./draw.js";
// import { draw } from "./draw.js";

type EditorElement = {[index:string]:DisplayTable}

/**
 * Editor class used to control functions of the whole app
 */
class Editor {
    readonly canvas;
    readonly ctx;
    readonly contextmenu;
    elements;

    /**
     * @param canvas a defined canvas element
     * @param ctx a defined 2d rendering context
     */
    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
        this.canvas = canvas;
        this.ctx = ctx;
        this.contextmenu = new ContextMenu();
        // form.setup();
        this.setUpEventListeners();
        this.elements = {} as EditorElement;
    }

    readonly start = (delta?:DOMHighResTimeStamp):void=>{
        // if(this.elements)
        this.update();
        this.render();
        requestAnimationFrame(this.start);
    }

    readonly update = ():void=>{
        return;
    }
    
    readonly render = ():void=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(const element in this.elements){
            drawTable(this.elements[element], this.ctx);
            // console.log()
        }
        return;
    }

    readonly setElements = (elements:EditorElement):void=>{
        this.elements = elements;
    }

    readonly appendElement = (table:Table):void=>{
        const displayTable = createDisplayTable(table, new Position(100,100),this.ctx);
        this.elements[0] = displayTable;
    }

    private readonly setUpEventListeners = ():void=>{
        this.canvas.addEventListener("contextmenu",this.showContextMenu);
        this.canvas.addEventListener("click",()=>this.contextmenu.show(false));
    }

    private readonly showContextMenu =(event:MouseEvent):void=>{
        event.preventDefault();
        this.contextmenu.updatePosition(event.clientX, event.clientY);
        this.contextmenu.show(true);
    }

}

export default Editor;