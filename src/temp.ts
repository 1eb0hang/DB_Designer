import { colourStringify } from "./util/colour.js";
import Position from "./util/position.js";
import Paragraph, {createText} from "./util/text.js";

export function drawText(text:string, {x, y}:Position):void{
    const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d");
    if(!ctx) return;

    ctx.font = "1.6em sans"; // 16px
    console.log(ctx.font);
    
    const newText = createText(text, ctx);
    console.log(newText);
    drawTextBorder(newText, new Position(x,y), ctx);

    ctx.fillStyle = colourStringify(newText.colour, true);
    ctx.fillText(text, x, y);
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
