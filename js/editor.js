import {showForm, createNote, importSql, exportSql} from "./form.js"

const ctxFunc = [showForm, createNote, importSql, exportSql];
const ctxTitles = ["Add Table", "Add Note", "Import", "Export"];
const ctxMenu = document.createElement("ul");
ctxMenu.id = "ctxMenu";
let ctxMenuShow = false;

for(let i = 0; i<ctxFunc.length; i+=1 ){
  const li = document.createElement("li");
  li.addEventListener("click", (e)=>{
    ctxMenu.style.visibility = null;
    ctxFunc[i]({})
    // form.style.visibility = "visible";
  });
  li.classList.add("ctx-link");
  const span = document.createElement("span");
  span.classList.add(".ctx-label");
  span.innerText = ctxTitles[i];
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

export function contextMenuShow(event){
    event.preventDefault()
    updateCtxPosition(event.clientX, event.clientY);
    ctxMenu.style.visibility = "visible";
    ctxMenuShow = true;
}

// function tableForm(event){
//   event.preventDefault();
//   tableForm.style.visiblity = "visible";
// }

export function contextMenuHide(event){
  ctxMenu.style.visibility = null;
}
