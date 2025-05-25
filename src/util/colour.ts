
interface Colour{
    [index:string]:number;
    r:number;
    g:number;
    b:number;
    a:number;
}

export function colourStringify(colour:Colour, hex=true):string{
    return hex?colourToHex(colour):colourToRGBA(colour);
}

function toHex(value:number, partial=false):string{
    if(value<0) throw new Error("value may only be positive");
    return `${partial?"":"#"}${value<10?"0":""}${value.toString(16)}`;
}

function colourToHex(colour:Colour):string{
    const strColour = [];
    for (const value in colour){
        strColour.push(toHex(colour[value], true));
    }
    return "#"+strColour.join("");
}

function colourToRGBA(colour:Colour):string{
    const strColour = [];
    for (const value in colour){
        strColour.push(colour[value]);
    }
    return `rgba(${strColour.join(",")}`;
}

export default Colour