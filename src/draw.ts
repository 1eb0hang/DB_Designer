import { Field } from "./table.js";
import { colourStringify } from "./util/colour.js";
import Position from "./util/position.js";
import Paragraph, {createText, getTextObjectWidth} from "./util/text.js";

export function drawText(text:string|Paragraph, {x, y}:Position, ctx:CanvasRenderingContext2D):void{
    // 16px //TODO: make scalable on zoom
    // console.log(ctx.font);
    
    const newText = typeof text == "string"?createText(text, ctx):text;
    console.log(newText);
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

export function drawField(field:Field,ctx:CanvasRenderingContext2D):void{
    // PK/FK | NAME | TYPE
    const mainRefText = field.constraints.primaryKey?"PK":
                        field.constraints.foriegnKey?"FK":" ";
    const pk = createText(mainRefText,ctx);
    const name = createText(field.name,ctx);
    const type = createText(field.type,ctx);

    let accumlativeWidth = 0;
    drawText(pk,new Position(100,100), ctx);
    accumlativeWidth+=getTextObjectWidth(pk);
    drawText(name,new Position(100+accumlativeWidth,100),ctx);
    accumlativeWidth+=getTextObjectWidth(name);
    drawText(type,new Position(100+accumlativeWidth,100),ctx);
}