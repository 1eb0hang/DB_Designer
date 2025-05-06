"use strict";
// canvas and ctx are already defined
Object.defineProperty(exports, "__esModule", { value: true });
class Editor {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    start(delta) {
        this.update();
        this.render();
        requestAnimationFrame(this.start);
    }
    update() {
        return;
    }
    render() {
        return;
    }
}
exports.default = Editor;
