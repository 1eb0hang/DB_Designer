import {Field, createField} from "./field.js"
import {createConstraints} from "./constraints.js"
import {contextMenuShow, contextMenuHide} from "./editor.js"

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);
let win = {
  width:window.innerWidth,
  height:window.innerHeight
}

canvas.width = win.width;
canvas.height = win.height;

canvas.addEventListener("contextmenu", contextMenuShow);
canvas.addEventListener("click", contextMenuHide);
