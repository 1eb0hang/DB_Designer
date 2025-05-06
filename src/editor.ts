// canvas and ctx are already defined

interface Editor{
    loop(delta:DOMHighResTimeStamp):void;
    render():void;
    update():void
}

class Editor {
    readonly canvas;
    readonly ctx;
    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
        this.canvas = canvas;
        this.ctx = ctx;
    }

    loop(delta:DOMHighResTimeStamp):void{
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }

    update():void{
        return;
    }

    render():void{
        return;
    }

}

export default Editor;