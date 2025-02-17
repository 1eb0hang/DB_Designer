import {Field, createField} from "./field.js"
import {createConstraints} from "./constraints.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ctxMenu = document.createElement("ul");
ctxMenu.id = "ctxMenu";

for(let title of ["Add Table", "Add Note", "Import", "Export"]){
  const li = document.createElement("li");
  li.classList.add("ctx-link");
  const span = document.createElement("span");
  span.classList.add(".ctx-label");
  span.innerText = title;
  li.appendChild(span);
  ctxMenu.appendChild(li);
}
document.body.appendChild(ctxMenu);


const updateCtxPosition = (x, y)=>{
  const maxLeft = window.innerWidth - ctxMenu.offsetWidth;
  const maxTop = window.innerHeight - ctxMenu.offsetHeight;

  ctxMenu.style.left = `${Math.min(maxLeft,x)}px`;
  ctxMenu.style.top = `${Math.min(maxTop, y)}px`;
};

ctx.clearRect(0, 0, canvas.width, canvas.height);
let win = {
  width:window.innerWidth,
  height:window.innerHeight
}

canvas.width = win.width;
canvas.height = win.height;
canvas.style.background = "#eee";

canvas.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  updateCtxPosition(e.clientX, e.clientY);
  ctxMenu.style.visibility = "visible";
});

document.body.addEventListener("click", ()=>{
  ctxMenu.style.visibility = null;
});
