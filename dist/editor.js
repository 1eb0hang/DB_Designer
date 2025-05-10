import * as form from "./form.js";
import ContextMenu from "./contextmenu.js";
// import { draw } from "./draw.js";
/**
 * Editor class used to control functions of the whole app
 */
class Editor {
    /**
     * @param canvas a defined canvas element
     * @param ctx a defined 2d rendering context
     */
    constructor(canvas, ctx) {
        this.start = (delta) => {
            this.update();
            this.render();
            // requestAnimationFrame(this.start);
        };
        this.update = () => {
            return;
        };
        this.render = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        };
        this.setUpEventListeners = () => {
            this.canvas.addEventListener("contextmenu", this.showContextMenu);
            this.canvas.addEventListener("click", () => this.contextmenu.show(false));
        };
        this.showContextMenu = (event) => {
            event.preventDefault();
            this.contextmenu.updatePosition(event.clientX, event.clientY);
            this.contextmenu.show(true);
        };
        this.canvas = canvas;
        this.ctx = ctx;
        this.contextmenu = new ContextMenu();
        form.setup();
        this.setUpEventListeners();
    }
}
export default Editor;
