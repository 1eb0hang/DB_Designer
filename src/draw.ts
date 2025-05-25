import Table, { Field } from "./table.js";
import { colourStringify } from "./util/colour.js";
import Position from "./util/position.js";
import Paragraph, {createText, getTextObjectHieght, getTextObjectWidth} from "./util/text.js";

export function drawText(text:string|Paragraph, {x, y}:Position, ctx:CanvasRenderingContext2D):void{
    // 16px //TODO: make scalable on zoom
    // console.log(ctx.font);
    
    const newText = typeof text == "string"?createText(text, ctx):text;
    // console.log(newText);
    drawTextBorder(newText, new Position(x,y), ctx);

    ctx.fillStyle = colourStringify(newText.colour, true);
    ctx.fillText(newText.value, x, y);
}

export function drawTextBorder(text:Paragraph, {x,y}:Position, ctx:CanvasRenderingContext2D):void{
    ctx.fillStyle = colourStringify(text.backgroundColour);
    ctx.strokeStyle= colourStringify(text.border.colour);
    ctx.lineWidth = text.border.width;
    ctx.strokeRect( //TODO: make path instead of rect
        x+((text.padding.left)*(-1)),
        y+(text.metrics.fontBoundingBoxDescent+(text.padding.left)),
        text.metrics.width+(text.padding.right*2),
        -1*(text.metrics.fontBoundingBoxAscent+text.metrics.fontBoundingBoxDescent+(text.padding.left*2))
    );
    ctx.fillRect(
        x+((text.padding.left)*(-1)),
        y+(text.metrics.fontBoundingBoxDescent+(text.padding.left)),
        text.metrics.width+(text.padding.right*2),
        -1*(text.metrics.fontBoundingBoxAscent+text.metrics.fontBoundingBoxDescent+(text.padding.left*2))
    );
}

export function drawField(field:Field, {x,y}:Position,ctx:CanvasRenderingContext2D):void{
    // PK/FK | NAME | TYPE
    const mainRefText = field.constraints.primaryKey?"PK":
                        field.constraints.foriegnKey?"FK":" ";
    
    const pk = createText(mainRefText,ctx);
    const name = createText(field.name,ctx);
    const type = createText(field.type,ctx);

    let accumlativeWidth = 0;
    const yTextOffset = getTextObjectHieght(pk);
    drawText(pk,new Position(x+accumlativeWidth,y+yTextOffset), ctx);
    accumlativeWidth+=getTextObjectWidth(pk);
    drawText(name,new Position(x+accumlativeWidth,y+yTextOffset),ctx);
    accumlativeWidth+=getTextObjectWidth(name);
    drawText(type,new Position(x+accumlativeWidth,y+yTextOffset),ctx);
}

export function drawTable(table:Table, ctx:CanvasRenderingContext2D){
    let  i = 0;
    const textObjectHieght = getTextObjectHieght(createText(table.fields[0].name,ctx));
    while(table.fields[i]){ // table.fields must be numeric indexes
        const fieldOffset = i*textObjectHieght;
        drawField(table.fields[i],new Position(100,100+fieldOffset),ctx);   
        i+=1;
    }
    console.log("Table \"drawn\"");
}

/**
 * Gets the index of row with the widest string value in a specified column\
 * This is specific to the visual representation of the table, rather than the\
 * actual Table object
 * @param arr 
 * @returns zero base index of row with the widest column value
 */
function getWidest(arr:string[], ctx:CanvasRenderingContext2D):number{// TODO:add some sort of text object reference
    let res = 0;
    for(let i =0; i<arr.length; i+=1){
        const text = createText(arr[i],ctx);
        if(getTextObjectWidth(text)>res){
            res = i;
        }
    }
    return res;
}

/**
 * Gets values at specified column index. This is specific to the visual\
 * representaion of the table, rather than the actual Table object
 * @param table table from which to get column
 * @param column index of column in table
 * @returns array of objects in in column at specified index
 */
export function getColumnWidest(table:Table, column:0|1|2, ctx:CanvasRenderingContext2D):number{
    const res:string[] = [];
    let i = 0;
    while(table.fields[i]){
        const fieldText = column == 0?
                (table.fields[i].constraints.foriegnKey?"FK":"PK") :
                (column == 1?table.fields[i].name:table.fields[i].type);
        res.push(fieldText);
        i+=1;
    }
    return getWidest(res, ctx);
}
