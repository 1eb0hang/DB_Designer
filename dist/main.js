import Editor from "./editor.js";
function main() {
    const canvas = document.querySelector(".canvas");
    if (!canvas)
        return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const editor = new Editor(canvas, ctx);
    editor.start();
}
main();
