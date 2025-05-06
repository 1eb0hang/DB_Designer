// canvas and ctx are already defined

interface Editor{
    loop(delta:DOMHighResTimeStamp):void;
    render():void;
    update():void
}

/**
 * Editor class used to control functions of the whole app
 */
class Editor {
    readonly canvas;
    readonly ctx;

    /**
     * @param canvas a defined canvas element
     * @param ctx a defined 2d rendering context
     */
    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
        this.canvas = canvas;
        this.ctx = ctx;
        this.setup();
    }

    start(delta?:DOMHighResTimeStamp):void{
        // this.update();
        this.render();
        // requestAnimationFrame(this.start);
    }

    setup(){
        this.canvas.addEventListener("contextmenu", (e)=>{
            e.preventDefault();
            console.log("Context Menu Requested");
        });
    }
    
    update():void{
        return;
    }
    
    render():void{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
    }

}

export default Editor;