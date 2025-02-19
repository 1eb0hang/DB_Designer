import {ctxMenu, updateCtxPosition, setMenuShow} from "./contextmenu.js"

export function contextMenuShow(event){
    event.preventDefault()
    updateCtxPosition(event.clientX, event.clientY);
    ctxMenu.style.visibility = "visible";
    setMenuShow(true);
}

export function contextMenuHide(event){
  ctxMenu.style.visibility = null;
}

export function formShow(event){}

export function formHide(event){}
