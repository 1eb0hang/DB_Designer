
const ctxMenu = document.createElement("ul");
ctxMenu.id = "ctxMenu";
let ctxMenuShow = false;

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

export function contextMenuShow(event){
    event.preventDefault()
    updateCtxPosition(event.clientX, event.clientY);
    ctxMenu.style.visibility = "visible";
    ctxMenuShow = true;
}

export function contextMenuHide(event){
  ctxMenu.style.visibility = null;
}
