import MenuOptions from "./menuoptions.js";
// import Table from "./table.js";
import { setup } from "./draw.js";

/**
 * Class for program-wide context menu
 */
class ContextMenu{
    private options:any;
    private menu:HTMLElement;

    constructor(){
        this.options = this.setMenuOptions();
        this.menu = this.setMenu();
    }
    
    /**
     * Reacreate menu object to update menu options;\
     * Should be called after setOptions
     */
    readonly updateMenu = ():void=>{
        document.removeChild(this.menu);
        this.menu = this.setMenu();
    }

    /**
     * Sets new context menu options \
     * Sets default if no options parameter given \
     * Menu object only updates after call to updateMenu
     * @param options optional parameter defining context menu options
     */
    readonly setOptions = (options?:MenuOptions):void=>{
        this.options = this.setMenuOptions(options);
    }
    
    /**
     * Sets menu visibility
     * @param value visibility boolean
     */
    readonly show = (value:boolean):void=>{
        this.menu.classList.toggle("inactive",!value);
    }

    /**
     * updates context menu to be within screen bounds\
     * should be called before show method
     * @param x mouse x position
     * @param y mouse y position
     */
    readonly updatePosition = (x:number, y:number):void=>{
        const maxLeft = window.innerWidth - this.menu.offsetWidth;
        const maxTop = window.innerHeight - this.menu.offsetHeight;
      
        this.menu.style.left = `${Math.min(maxLeft,x)}px`;
        this.menu.style.top = `${Math.min(maxTop, y)}px`;
    }

    /**
     * Creates a new context menu
     * @returns new context menu as Html list object
     */
    private readonly setMenu = ():HTMLElement=>{
        const menu = document.createElement("ul");
        menu.classList.add("menu","inactive");

        for(const name in this.options){
            const item = document.createElement("li");
            
            item.classList.add("ctx-link");
            item.innerText = name;
            
            item.addEventListener("click", (e)=>{
                menu.classList.toggle("inactive", true);
                this.options[name]();
            });
            
            menu.appendChild(item);
        }
        document.body.appendChild(menu);
        return menu;
    }

    /**
     * Verifies that options is not null
     * @param options list of options
     * @returns new options list or default list if `options` not set 
     */
    private readonly setMenuOptions = (options?:MenuOptions):MenuOptions=>{
        let defaultOptions:MenuOptions = {};
        if(!options){
            ["Add Table", "Add Note", "Import", "Export"].forEach((value)=>{
                defaultOptions[value] = ()=>{
                        setup();
                        // draw();
                    }
                });
        }else{
            defaultOptions = options;
        }

        return defaultOptions;
    }
}

export default ContextMenu;
