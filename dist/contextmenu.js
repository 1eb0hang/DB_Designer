/**
 * Class for program-wide context menu
 */
class ContextMenu {
    constructor() {
        /**
         * Reacreate menu object to update menu options;\
         * Should be called after setOptions
         */
        this.updateMenu = () => {
            document.removeChild(this.menu);
            this.menu = this.setMenu();
        };
        /**
         * Sets new context menu options \
         * Sets default if no options parameter given \
         * Menu object only updates after call to updateMenu
         * @param options optional parameter defining context menu options
         */
        this.setOptions = (options) => {
            this.options = this.setMenuOptions(options);
        };
        this.show = (value) => {
            this.menu.classList.toggle("inactive", !value);
        };
        this.updatePosition = (x, y) => {
            const maxLeft = window.innerWidth - this.menu.offsetWidth;
            const maxTop = window.innerHeight - this.menu.offsetHeight;
            this.menu.style.left = `${Math.min(maxLeft, x)}px`;
            this.menu.style.top = `${Math.min(maxTop, y)}px`;
        };
        this.setMenu = () => {
            const menu = document.createElement("ul");
            menu.classList.add("menu", "inactive");
            for (let i = 0; i < this.options.length; i += 1) {
                const item = document.createElement("li");
                item.classList.add("ctx-link");
                item.innerText = this.options[i];
                item.addEventListener("click", (e) => {
                    menu.classList.toggle("inactive", true);
                    console.log("Menu item requested");
                });
                menu.appendChild(item);
            }
            document.body.appendChild(menu);
            return menu;
        };
        this.setMenuOptions = (options) => {
            if (!options) {
                options = ["Add Table", "Add Note", "Import", "Export"];
            }
            return options;
        };
        this.options = this.setMenuOptions();
        this.menu = this.setMenu();
    }
}
export default ContextMenu;
