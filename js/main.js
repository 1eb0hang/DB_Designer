import {Field, createField} from "./field.js"
import {createConstraints} from "./constraints.js"
import {contextMenuShow, contextMenuHide} from "./editor.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);
let win = {
  width:window.innerWidth,
  height:window.innerHeight
}

canvas.width = win.width;
canvas.height = win.height;
canvas.style.background = "#eee";

// document.getElementById("canvas").getContext("2d").fillRect(100, 100, 100, 100);

canvas.addEventListener("contextmenu", contextMenuShow);
canvas.addEventListener("click", contextMenuHide);
