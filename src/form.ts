import Table from "./table";
import * as table from "./table.js";


/** 
 * This form is to create a table, and has the following fields:
 * - table name
 * - field list (calls createFieldForm)
 * - table head colour
 * 
 * @returns new form to create a table object
 */
export function createTableForm() {
    const form = document.createElement("div");
    form.classList.add("form");
    const formFields = ["Name", "Description"];

    formFields.forEach((value:string)=>{
        const field = document.createElement("div");
        field.classList.add(value);
        
        const label = document.createElement("label");
        label.setAttribute("for",`${value}Value`);
        label.innerText = value;

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add(`${value}Value`);
        input.id = `${value}Value`;

        field.appendChild(label);
        field.appendChild(input);
        form.appendChild(field);
    });

    return form;
}


/**
 * This form is to add fields to a table.
 * Fields:
 * - field name
 * - data type
 * - data size?
 * - default value?
 * - description?
 * - coloumn colour?
 * - constraints (boolean values)
 *     - primary key
 *     - allow null
 *     - unique
 *     - auto increment
 *     - foreign key
 * 
 * Foreign key options open when foreign key is true:
 * - reference table
 * - reference field
 * - on delete
 * - on update
 */
export function createFieldForm():HTMLElement{
    const form = document.createElement("div");
    form.classList.add("form");
    const fieldTitles = ["Name","Type","Size","Default","Description"];

    for(let value of fieldTitles){
        const field = document.createElement("div");
        field.classList.add("field");
        
        // add label
        const label = document.createElement("label");
        label.setAttribute("for", value.toLowerCase());
        label.innerText = value;
        field.appendChild(label);

        // add select if value is type
        if(value.toLowerCase() == "type"){
            field.appendChild(addSelect(value, ["TEXT", "INTEGER", "BOOLEAN"])); // temporary
            form.appendChild(field);
            continue;
        };

        // add input type text
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name",value.toLowerCase());

        field.appendChild(input);
        form.appendChild(field);
    };

    form.appendChild(addConstraints());
    form.appendChild(addForeignKeyReference());

    return form;
}

// create select for type
function addSelect(value:string, options:string[]):HTMLSelectElement{
    const select = document.createElement("select");
    select.setAttribute("name", value.toLowerCase());

    options.forEach((value)=>{
        const option = document.createElement("option");
        option.innerText = value;
        select.appendChild(option);
    })
    
    return select;
}


function addConstraints():HTMLElement{
    /**
     * Constraint List
     * - primary key
     * - allow null
     * - unique
     * - auto increment
     * - foreign key
     */
    const constraints = document.createElement("div");
    constraints.classList.add("constraints", "form");
    const constraintTitles = ["PK","AN","UQ","AI","FK"];

    // TODO: Add an onhover or onclick key

    constraintTitles.forEach((value)=>{
        const constraint = document.createElement("div"); // for 1 constraint
        constraint.classList.add("constraint");

        // constraint label
        const title = document.createElement("label");
        title.setAttribute("for",value);
        title.innerText = value;

        //constraint value (boolean)
        const constraintValue =  document.createElement("input");
        constraintValue.setAttribute("type","checkbox");
        constraintValue.setAttribute("name",value);
        constraintValue.id = value;

        constraint.appendChild(title);
        constraint.appendChild(constraintValue);
        constraints.appendChild(constraint);

    })
    return constraints;
}

function addForeignKeyReference():HTMLElement{ // take in table array
    const form = document.createElement("div");
    form.classList.add("foreignKey", "form");
    const fieldTitles = ["Ref. Table", "Ref. Field", "On Delete", "On Update"];

    fieldTitles.forEach((value)=>{
        const field = document.createElement("div");
        //field.classList.add();

        const name = value.replace(" ","").replace(".","");
        const label = document.createElement("label");
        label.setAttribute("for",name);
        label.innerText = value;
        field.appendChild(label);

        const input:HTMLSelectElement = 
            value in fieldTitles.slice(2)?
            addForeignKeyOptions(name): // References
            addForeignKeyOptions(name); // on update and delete

        field.appendChild(input);
        form.appendChild(field);
    });
    return form;
}

const body = document.querySelector<HTMLBodyElement>("body");
body?.appendChild(createFieldForm());

function addForeignKeyOptions(name:string, options?:string[]):HTMLSelectElement{
    // TODO: dont allow null for options parameter
    
    /*
    if (on delete & on update):
    - No Action
    - Restrict
    - Cascade
    - Set NULL
    - Set Default

    if (reference Table) => show available tables
    if (reference Field) => show available fields
    */

    if(!options){
        options = ["No Action", "Restrict", "Cascade", "Set NULL", "Set Default"];
    }
    const select = document.createElement("select");
    options.forEach((value)=>{
        const option = document.createElement("option");
        option.innerText = value;
        select.appendChild(option);
    });
    return select;
}

function showForm():void{
    return;
}