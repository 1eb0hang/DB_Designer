import Colour from "./colour.js";

const TEXTPROPS = document.querySelector<HTMLCanvasElement>(".canvas")
        ?.getContext("2d")?.measureText;

interface Paragraph {
    value:string; // TODO: allow for multi line text
    properties:TextProperties
}

interface TextProperties {
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

export function createText(text:string):Paragraph{
    if(!TEXTPROPS) throw new Error("Canvas not initialized properly");

    return {
        value:text,
        properties:{
            metrics:TEXTPROPS(text),
            fontFace:"sans",
                padding:{
                    left:2,
                    right:2,
                    top:2,
                    bottom:2,
                },
                border:{
                    colour:{r:0,g:0,b:0,a:1},
                    width:2
                },
                colour:{r:0,g:0,b:0,a:1},
                backgroundColour:{r:0,g:0,b:0,a:0}
        } as TextProperties
    };
}

export default Paragraph;
export {TextProperties, Padding, Border};