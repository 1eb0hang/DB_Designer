import {ctxMenu, updateCtxPosition, setMenuShow} from "./contextmenu.js"

export function contextMenuShow(event){
    event.preventDefault()
    // make sure context menu isnt outside of window
    updateCtxPosition(event.clientX, event.clientY);
    ctxMenu.style.visibility = "visible";
    setMenuShow(true);
}

export function contextMenuHide(event){
  ctxMenu.style.visibility = null;
}

export function formShow(event){}

export function formHide(event){}
