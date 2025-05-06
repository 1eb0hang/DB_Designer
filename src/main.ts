import Editor from "./editor.js";

function main(){
    const canvas = document.querySelector<HTMLCanvasElement>(".canvas");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;

    const editor:Editor = new Editor(canvas, ctx);
    //editor.start();
}
