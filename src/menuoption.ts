type MenuOption = {
    name:string;
    action:((event:Event)=>void);
}

export default MenuOption;