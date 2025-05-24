
interface Colour{
    [index:string]:number;
    r:number|0;
    g:number|0;
    b:number|0;
    a:number|0;
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
    console.log("#"+strColour.join(""));
    return "#"+strColour.join("");
}

function colourToRGBA(colour:Colour):string{
    const strColour = [];
    for (const value in colour){
        strColour.push(colour[value]);
    }
    return `rgba(${strColour.join(",")}`;
}

// export function getColour(colour:string):Colour{

// }

export default Colour