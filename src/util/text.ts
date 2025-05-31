import Colour from "./colour.js";

interface Paragraph {
    value:string; // TODO: allow for multi line text
    metrics:TextMetrics;
    fontFace:string;
    padding:Padding;
    border:Border;
    colour:Colour;
    backgroundColour:Colour
}

interface Padding{
    left:number;
    right:number;
    top:number;
    bottom:number;
}

interface Border{
    colour:Colour;
    width:number
}

export function createText(text:string, ctx:CanvasRenderingContext2D):Paragraph{
    return {
        value:text,
        metrics:ctx.measureText(text),
        fontFace:"sans",
        padding:{
            left:2,
            right:2,
            top:2,
            bottom:2,
        },
        border:{
            colour:{r:0,g:0,b:0,a:255}, // TODO: fix overlaping of borders makes section darker
            width:1
        },
        backgroundColour:{r:0,g:0,b:0,a:0},
        colour:{r:0,g:0,b:0,a:255},
    };
}

export function getTextObjectWidth(text:Paragraph):number{
    // return text.border.width+
    return text.padding.left+
           text.metrics.width+
           text.padding.right
        //    text.border.width
}

export function getTextObjectHieght(text:Paragraph):number{
    // return text.border.width+
    // console.log()
    return text.padding.top+
           text.metrics.fontBoundingBoxAscent+
           text.metrics.fontBoundingBoxDescent+
           text.padding.bottom
        //    text.border.width
}

export default Paragraph;
export {Padding, Border};

// drawText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}", new Position(100, 300));