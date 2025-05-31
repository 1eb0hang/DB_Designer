import { DisplayField, DisplayTable } from "./datadisplay.js";
// import Table, { Field } from "./table.js";
import { colourStringify } from "./util/colour.js";
import Position from "./util/position.js";
import Paragraph, {createText, getTextObjectHieght, getTextObjectWidth} from "./util/text.js";

/**
 * Draws text to screen at specified position withing rendering context
 * @param text text to be drawn
 * @param position position of text 
 * @param ctx rendering context
 */
export function drawText(text:string|Paragraph, {x, y}:Position, ctx:CanvasRenderingContext2D):void{
    // 16px //TODO: make scalable on zoom
    // console.log(ctx.font);
    
    const newText = typeof text == "string"?createText(text, ctx):text;
    // console.log(newText);
    drawTextBorder(newText, new Position(x,y), ctx);

    ctx.fillStyle = colourStringify(newText.colour, true);
    ctx.fillText(newText.value, x, y);
}

/**
 * Draw border around assumed provided text position
 * @param text text for which border will be drawn
 * @param position position of text
 * @param ctx rendering context
 */
export function drawTextBorder(text:Paragraph, {x,y}:Position, ctx:CanvasRenderingContext2D):void{
    ctx.fillStyle = colourStringify(text.backgroundColour);
    ctx.strokeStyle= colourStringify(text.border.colour);
    ctx.lineWidth = text.border.width;
    ctx.strokeRect( //TODO: make path instead of rect
        x+((text.padding.left)*(-1)),
        y+(text.metrics.fontBoundingBoxDescent+(text.padding.bottom)),
        text.metrics.width+(text.padding.left+text.padding.right),
        -1*(text.metrics.fontBoundingBoxAscent+text.metrics.fontBoundingBoxDescent+(text.padding.top+text.padding.bottom))
    );
    ctx.fillRect(
        x+((text.padding.left)*(-1)),
        y+(text.metrics.fontBoundingBoxDescent+(text.padding.bottom)),
        text.metrics.width+(text.padding.left+text.padding.right),
        -1*(text.metrics.fontBoundingBoxAscent+text.metrics.fontBoundingBoxDescent+(text.padding.top+text.padding.bottom))
    );
}

/**
 * 
 * @param field field to be drawn
 * @param position position of field
 * @param ctx renderinf context
 */
export function drawField(field:DisplayField, {x,y}:Position,ctx:CanvasRenderingContext2D):void{
    // // PK/FK | NAME | TYPE
    // const mainRefText = field.constraints.primaryKey?"PK":
    //                     field.constraints.foriegnKey?"FK":" ";
    
    // const pk = createText(mainRefText,ctx);
    // const name = createText(field.name,ctx);
    // const type = createText(field.type,ctx);

    let accumlativeWidth = 0;
    const yTextOffset = getTextObjectHieght(field.name); // move text to make position top right corner
    drawText(field.primaryConstraint,new Position(x+accumlativeWidth,y+yTextOffset), ctx);
    accumlativeWidth+=getTextObjectWidth(field.primaryConstraint);
    drawText(field.name,new Position(x+accumlativeWidth,y+yTextOffset),ctx);
    accumlativeWidth+=getTextObjectWidth(field.name);
    drawText(field.type,new Position(x+accumlativeWidth,y+yTextOffset),ctx);

}

/**
 * 
 * @param table table to be drawn
 * @param ctx rendering context
 */
export function drawTable(table:DisplayTable, ctx:CanvasRenderingContext2D):void{
    let  i = 0;

    // get text object height example to use as offset unit
    //  -> text1 - pos1
    //  -> text2 - pos1 + text1.hieght
    const textObjectHieght = getTextObjectHieght(table.fields[0].name); 
    // TODO: textObjectHieght change based on current text hieght
    // console.log(table);
    while(table.fields[i]){ // table.fields must be numeric indexes
        const fieldOffset = i*textObjectHieght; 
        // TODO: make offset acumulative so that to compencate for 
        //    multiline text

        drawField(table.fields[i],new Position(100,100+fieldOffset),ctx);   
        i+=1;
    }
}

