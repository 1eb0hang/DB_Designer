import { colourStringify } from "./util/colour.js";
import Position from "./util/position.js";
import Paragraph, { TextProperties } from "./util/text.js";

const TEXTPROPS = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d")?.measureText;

export function drawText(text:string, {x, y}:Position):void{
    const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d");
    
    if(!ctx) return;

    ctx.font = "1.6em sans"; // 16px
    console.log(ctx.font);
    
    const newText = createText(text, ctx);
    drawTextBorder(newText, new Position(x,y));

    ctx.fillStyle = colourStringify(newText.properties.colour, true);
    ctx.fillText(text, x, y);
}

export function drawTextBorder(text:Paragraph, {x,y}:Position):void{
    const ctx = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d");
    if(!ctx) return;

    // const textProps = TEXTPROPS(text);
    // console.log(textProps)
    
    // ctx.fillStyle ="#000000af";
    // ctx.strokeStyle= "#ef0022ff";
    // const padding = 5;
    // ctx.strokeRect(x-padding,
    //     y+textProps.actualBoundingBoxDescent+padding,
    //     textProps.width+padding*2, 
    //     -1*(textProps.actualBoundingBoxAscent+textProps.actualBoundingBoxDescent)-padding*2.5);
    // ctx.fillRect(x-padding,
    //             y+textProps.actualBoundingBoxDescent+padding,
    //             textProps.width+padding*2, 
    //             -1*(textProps.actualBoundingBoxAscent+textProps.actualBoundingBoxDescent)-padding*2.5);

    console.log(text.properties.backgroundColour)
    ctx.fillStyle = colourStringify(text.properties.backgroundColour);
    ctx.strokeStyle= colourStringify(text.properties.border.colour);
    ctx.strokeRect(
        x+(text.properties.padding.left)*(-1),
        y+(text.properties.metrics.actualBoundingBoxDescent),//+text.properties.padding.left),
        text.properties.metrics.width+text.properties.padding.right,
        -1*(text.properties.metrics.actualBoundingBoxAscent+text.properties.metrics.actualBoundingBoxDescent)
    );
    // ctx.fillRect(
    //     x-text.properties.padding.left,
    //     y+(text.properties.metrics.actualBoundingBoxDescent+text.properties.padding.left),
    //     text.properties.metrics.width,
    //     -1*(text.properties.metrics.actualBoundingBoxAscent+text.properties.metrics.actualBoundingBoxDescent)
    // );
}

function createText(text:string, ctx:CanvasRenderingContext2D):Paragraph{
    return {
        value:text,
        properties:{
            metrics:ctx.measureText(text),
            fontFace:"sans",
                padding:{
                    left:2,
                    right:2,
                    top:2,
                    bottom:2,
                },
                border:{
                    colour:{r:0,g:0,b:0,a:255},
                    width:2
                },
                colour:{r:255,g:0,b:0,a:255},
                backgroundColour:{r:0,g:0,b:0,a:0}
        } as TextProperties
    };
}

// drawText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}", new Position(100, 300))