// canvas and ctx are already defined
class Editor {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    loop(delta) {
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }
    update() {
        return;
    }
    render() {
        return;
    }
}
export default Editor;
