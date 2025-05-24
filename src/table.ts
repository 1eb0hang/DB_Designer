import Colour from "./util/colour.js";
import Position from "./util/position.js";

// TODO: add documentation
// TODO: do unit testing

export default interface Table{
    fields:Fields,
    position:Position
}

type Fields = {
    [index:string]:Field
}

export interface Field{
    [index:string]:string|Type|number|Constraints|Colour;
    name:string;
    type:Type;
    size:number;
    defaultValue:string;
    description:string;
    colour:Colour;
    constraints:Constraints;
}
export type Type = "INTEGER"|"TEXT"|"BOOLEAN";

export interface Constraints{
    [index:string]:boolean|ForeingKey;
    primaryKey:boolean;
    allowNull:boolean;
    unique:boolean;
    autoIncrement:boolean;
    foriegnKey:boolean;
    foriegnKeyValue:ForeingKey
}

export type ForeingKey = null|{
    [index:string]:string|Table|Field;
    refTable:Table;
    refField:Field;
    onDelete:string;
    onUpdate:string;
};

export function createTable(fieldArr:Field[], pos?:Position):Table{
// export function createTable(tableArr:{[index:number]:Field}):Table{
    const fields:Fields = {};
    let count = 0;
    fieldArr.forEach((value:Field)=>{
        fields[value.name] = value;
        fields[count] = value;
        count+=1;
    })

    return {
        fields:fields,
        position:pos||new Position(0,0),
    } as Table;
}

export function createField(
    name:string,
    type:Type,
    size?:number,
    defaultValue?:string,
    description?:string,
    colour?:Colour,
    constraints?:Constraints
):Field{
    return {
        name:name,
        type:type,
        size:size||0,
        defaultValue:defaultValue||"",
        description:description||"",
        colour:colour||{r:0,g:0,b:0,a:0},
        constraints:constraints||createContraints(false)
    } as Field;
}

export function createContraints(
    primaryKey:boolean,
    allowNull?:boolean,
    unique?:boolean,
    autoIncrement?:boolean,
    foriegnKey?:boolean,
    foriegnKeyValue?:ForeingKey
):Constraints{
    return {
        primaryKey      : primaryKey,
        allowNull       : allowNull || !primaryKey,
        unique          : unique || false,
        autoIncrement   : autoIncrement || primaryKey,
        foriegnKey      : foriegnKey || false,
        foriegnKeyValue : foriegnKeyValue || null
    } as Constraints;
}

export function setConstraints(constraints:Constraints,values:Partial<Constraints>):void{
    for(let value in values){
        if(!values[value]) continue;
        constraints[value] = values[value];
    }
}

export function setFieldValue(field:Field,values:Partial<Field>):void{
    for(let value in values){
        if(!values[value]) continue;
        field[value] = values[value];
    }
}

// const fields = [
//     createField("id","INTEGER",0,"","",undefined,createContraints(true)),
//     createField("name","TEXT"),
//     createField("age","INTEGER"),
//     createField("olderThan21","BOOLEAN")
// ] as Field[];
// console.log(createTable(fields));
// console.log(fields[0][0] === fields[0]["id"]);