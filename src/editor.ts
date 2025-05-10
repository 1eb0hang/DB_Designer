import * as form from "./form.js";
import ContextMenu from "./contextmenu.js";


/**
 * Editor class used to control functions of the whole app
 */
class Editor {
    readonly canvas;
    readonly ctx;
    readonly contextmenu;

    /**
     * @param canvas a defined canvas element
     * @param ctx a defined 2d rendering context
     */
    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
        this.canvas = canvas;
        this.ctx = ctx;
        this.contextmenu = new ContextMenu();
        form.setup();
        this.setUpEventListeners();
    }

    readonly start = (delta?:DOMHighResTimeStamp):void=>{
        this.update();
        this.render();
        // requestAnimationFrame(this.start);
    }

    
    readonly update = ():void=>{
        return;
    }
    
    readonly render = ():void=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
    }

    private readonly setUpEventListeners = ()=>{
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