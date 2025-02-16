import {Field, createField} from "./field.js"
import {createConstraints} from "./constraints.js"

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

ctx.fillStyle = "red";
ctx.fillRect(100, 100, 100, 22);
// ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.font = "16px Consolas";
ctx.fillText("Example text", 100, 116);

// const constraints = createConstraints(
//   true,
//   false,
//   false,
//   true,
//   false,
//   false,
//   null
// )
//
// const field = createField(
//   "id",
//   "Integer",
//   null,
//   null,
//   null,
//   constraints,
// )
//
// console.log(field);
