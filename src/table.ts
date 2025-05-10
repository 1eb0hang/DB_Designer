
class Table{
    constructor(){

    }
}

export interface Field{
    [index:string]:string|Type|number|Contraints;
    name:string;
    type:Type;
    size:number;
    default:string;
    description:string;
    //colour
    constraints:Contraints;
}

export interface Contraints{
    primaryKey:boolean;
    allowNull:boolean;
    unique:boolean;
    autoIncrement:boolean;
    foriegnKey:boolean;
    foriegnKeyValue:ForeingKey
}

export type ForeingKey = null|{
    refTable:Table;
    refField:Field;
    onDelete:string;
    onUpdate:string;
};

export type Type = 
    "INTEGER"|"TEXT"|"BOOLEAN";

export default Table;