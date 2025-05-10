var _a;
import Position from "./position.js";
// Make class
// take in context as class initialisation argument
// and actually...fuck collision. We can do that later
// any new thing that is drawn will be at the highest z index
const ctx = (_a = document.querySelector(".canvas")) === null || _a === void 0 ? void 0 : _a.getContext("2d");
// function drawTable(table:Table){
//     return;
// }
export function drawField(field, pos) {
    // export interface Field{
    //     name:string;
    //     type:Type;
    //     size:number;
    //     default:string;
    //     description:string;
    //     //colour
    //     constraints:Contraints;
    // }
    var _a;
    // PK | NAME | TYPE
    const ctx = (_a = document.querySelector(".canvas")) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    if (!ctx)
        return;
    const constraintDisplay = field.constraints.primaryKey ? "PK" :
        field.constraints.foriegnKey ? "FK" : "";
    const nameDisplay = field.name;
    const typeDisplay = field.type;
    const displayArray = [constraintDisplay, nameDisplay, typeDisplay];
    let prev = new Position(0, 0);
    //const length = ctx.measureText(constraintDisplay);
    // text1 box = textPos -  textPos.length()/2
    // text2 box = (textPos - textPos.length()/2) + (text1.pos+text1.length)
    // text3 box = (textPos - textPos.length()/2) + (text2.pos+text2.length)
    for (let i = 0; i < [constraintDisplay, nameDisplay].length; i += 1) {
        //    ctx.fillText(displayArray[i], posi);
        // }
        // for(let value in displayArray){
        // console.log(value);
        // console.log(field[value])
        const length = ctx.measureText(displayArray[i]);
        const startPos = pos;
        if (i == 1) {
            const len = ctx.measureText(displayArray[i - 1]).width;
            startPos.add(new Position(len, 0)); // displayArray[i-1].length.width
        }
        // else if(i==2){
        // startPos.add(new Position(0,0));
        // }
        ctx.strokeStyle = "#000f";
        ctx.fillStyle = "#ffffff9f";
        ctx.font = "14px Ubuntu";
        ctx.strokeRect((startPos.x - length.width / 2) - 2, startPos.y - 13, length.width + 4, 16);
        ctx.fillRect((startPos.x - length.width / 2) - 2, startPos.y - 13, length.width + 4, 16);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(displayArray[i], pos.x, pos.y);
    }
}
function textBorder(text) {
}
export function setup() {
    return;
}
// Temporary
function drawTable() {
    var _a;
    const ctx = (_a = document.querySelector(".canvas")) === null || _a === void 0 ? void 0 : _a.getContext("2d");
    if (!ctx)
        return;
    ctx.strokeStyle = "red";
    ctx.textAlign = "center"; // order doesnt matter, just as long as its before fill text
    // ctx.textBaseLine = "middle";
    ctx.font = "11px Ubuntu";
    const length = ctx.measureText("Hello world!");
    console.log(`Text Length: ${length.width}`);
    ctx.fillStyle = "white";
    ctx.fillRect(100 - length.width / 2 - 2, 100 - 11, length.width + 3, 100);
    ctx.fillStyle = "black";
    ctx.fillText("Hello world!", 100, 100); // can also be stroke text
}
/**
 * classes:
 * - Coordinates or some kind or 2d positioning class
 * - colour class (rgba(hex or 255), hsv)
 */
/**
 * # functions i need
 * ## position.inRadius(origin:Coordinate, radius:number):boolean
 * check if point in radius
 *
 * ## position.inArea(bottomLeft:Coordinate, topRight:Coordinate):boolean
 * check if point in square area
 */
/**
 * export interface Field{
     name:string;
     type:Type;
     size:number;
     default:string;
     description:string;
     //colour
     constraints:Contraints;
 }
 
 export interface Contraints{
     primaryKey:boolean;
     allowNull:boolean;
     unique:boolean;
     autoIncrement:boolean;
     foriegnKey:boolean;
     foriegnKeyValue:ForeingKey
 }
 
 export type ForeingKey = null|{
     refTable:Table;
     refField:Field;
     onDelete:string;
     onUpdate:string;
 };
 
 export type Type =
     "INTEGER"|"TEXT"|"BOOLEAN";
 */ 
