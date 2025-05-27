import Table, { Field } from "./table.js";
import Position from "./util/position.js";
import Paragraph, { createText, getTextObjectWidth } from "./util/text.js";

export interface DisplayTable {
    [index:string]:number|Position|DisplayFieldCollection|Table
    referenceTable:Table;
    fields:DisplayFieldCollection;
    position:Position;
    width:number;
    height:number
}

export interface DisplayField{
    [index:string]:Paragraph|number;
    name:Paragraph;
    type:Paragraph;
    primaryConstraint:Paragraph;
    width:number;
    height:number
}

export type DisplayFieldCollection = {[index:string]:DisplayField}


export function createDisplayTable(table:Table, position:Position, ctx:CanvasRenderingContext2D){
    const pos = position // TODO: make center of screen
    const displayTable:DisplayTable = {
        fields:createFields(table, ctx),
        referenceTable:table,
        position:pos,
        width:0,
        height:0
    }
    // displayTable.width =
    return displayTable;
}

function createFields(table:Table, ctx:CanvasRenderingContext2D):DisplayFieldCollection{
    const res:DisplayFieldCollection = {}
    let count = 0;
    for(let field in table){
        if(isNaN(Number(field))) continue; // we only using numeric indecies

        res[field] = createDisplayField(table[field], ctx);
        res[res[field].name.value] = res[field]
        count+=1;
        console.log(field);
    }
    return res;
}

/**
 * 
 * @param field table field to be converted
 * @param ctx renedrting context
 * @param reference reference text object
 * @returns new field object meant for display
 */
export function createDisplayField(field:Field, ctx:CanvasRenderingContext2D):DisplayField{
    const name = field.name;
    const type = field.type;
    const primaryconstraint:string = field.constraints.foriegnKey?"FK":
                                    (field.constraints.primaryKey?"PK":"");
    const displayField:DisplayField = {
        name:createText(name, ctx),
        type:createText(type, ctx),
        primaryConstraint:createText(primaryconstraint, ctx),
        width:0,
        height:0
    };
    return displayField;
}

// function getTableWidth(table:DisplayTable){

// }

/**
 * Gets values at specified column index. This is specific to the visual\
 * representaion of the table, rather than the actual Table object, thus it\
 * takes in a display field collection
 * @param fields collection of display fields
 * @param column index of column in display field
 * @returns value representing width of the widest column
 */
export function getColumnWidest(fields:DisplayFieldCollection, column:0|1|2):number{
    const res:Paragraph[] = [];
    // let i = 0;
    // while(table.fields[i]){
    //     const fieldText = column == 0?
    //             (table[i].constraints.foriegnKey?"FK":"PK") : // if empty...use PK width
    //             (column == 1?table[i].name:table[i].type);
    //     res.push(fieldText);
    //     i+=1;
    // }
    const fieldName = ["name", "type", "primaryConstraint"][column];
    for(let value in fields){
        if(typeof fields[value][fieldName] != "number"){
            res.push(fields[value][fieldName]);
        }
    }
    console.log(`Array of column ${column}:\n${res}`);
    return getWidest(res);
}

/**
 * Gets the index of row with the widest string value in a specified column\
 * This is specific to the visual representation of the table, rather than the\
 * actual Table object
 * @param arr 
 * @returns value representing width of the widest column
 */
function getWidest(arr:Paragraph[]):number{
    let res = 0;
    for(let i =0; i<arr.length; i+=1){
        const text = arr[i];
        const currentWidest = arr[res];
        if(getTextObjectWidth(text)>getTextObjectWidth(currentWidest)){
            res = i;
        }
    }
    console.log(`Widex index: ${arr[res]}`);
    return getTextObjectWidth(arr[res]);
}
