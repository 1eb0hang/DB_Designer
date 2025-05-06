// canvas and ctx are already defined
/**
 * Editor class used to control functions of the whole app
 */
class Editor {
    /**
     * @param canvas a defined canvas element
     * @param ctx a defined 2d rendering context
     */
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.setup();
    }
    start(delta) {
        // this.update();
        this.render();
        // requestAnimationFrame(this.start);
    }
    setup() {
        this.canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            console.log("Context Menu Requested");
        });
    }
    update() {
        return;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
    }
}
export default Editor;
