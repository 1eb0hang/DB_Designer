import showForm from "./form.js"

const ctxTitles = ["Add Table", "Add Note", "Import", "Export"];
export const ctxMenu = document.createElement("ul");
ctxMenu.id = "ctxMenu";
let ctxMenuShow = false;

function drawRect(){
  console.log("draw rect");
  const ctx = document.querySelector("#canvas").getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(100, 100, 100, 100);
}

for(let i = 0; i<ctxTitles.length; i+=1 ){
  const li = document.createElement("li");
  li.addEventListener("click", (e)=>{
    ctxMenu.style.visibility = null;
    [showForm, null, null, null][i]();
  });

  li.classList.add("ctx-link");
  const span = document.createElement("span");
  span.classList.add(".ctx-label");
  span.innerText = ctxTitles[i];
  li.appendChild(span);
  ctxMenu.appendChild(li);
}
document.body.appendChild(ctxMenu);

export const updateCtxPosition = (x, y)=>{
  const maxLeft = window.innerWidth - ctxMenu.offsetWidth;
  const maxTop = window.innerHeight - ctxMenu.offsetHeight;

  ctxMenu.style.left = `${Math.min(maxLeft,x)}px`;
  ctxMenu.style.top = `${Math.min(maxTop, y)}px`;
};

export function setMenuShow(value){
  ctxMenuShow = value;
}
