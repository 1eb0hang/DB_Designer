// import Table from "./table";
import * as table from "./table.js";

export type FormType = "table"|"field"|"import"|"export"|"note";

const forms = {
    /**
     * Form object from creating a table
     */
    "table":createTableForm(),
   /**
    * Form object for creating a table field
    */
    "field":createFieldForm(),
    /**
     * Form object from import sql
     */
    "import":document.createElement("div"),
   /**
    * Form object for exporting sql
    */
    "export":document.createElement("div"),
    "note":document.createElement("div")
}


export function setup(){
    console.log("seting up forms");
    showForm("table",false);
    showForm("field",false);
}

export function showForm(type:FormType, value:boolean):void{
    forms[type].classList.toggle("inactive", !value);
    console.log(`${type.toUpperCase()}: ${value}`);
    forms.table;
}

/** 
 * This form is to create a table, and has the following fields:
 * - table name
 * - field list (calls createFieldForm)
 * - table head colour
 * 
 * @returns new form to create a table object
 */
function createTableForm():HTMLElement {
    const form = document.createElement("div");
    form.classList.add("form");
    const subform = document.createElement("div");
    subform.classList.add("subform");
    form.appendChild(subform);
    
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
        subform.appendChild(field);
    });

    subform.appendChild(addFieldButton(form));
    subform.appendChild(addTable());
    document.querySelector<HTMLBodyElement>("body")?.appendChild(form);
    return form;
}

function addFieldButton(form:HTMLElement):HTMLInputElement{
    const button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","+Add Field");

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        showForm("field",true);
        showForm("table",false);
    })
    return button;
}

function addTable():HTMLElement{
    const button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Done");

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        showForm("table",false);
    })
    return button;
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
function createFieldForm():HTMLElement{
    const form = document.createElement("div");
    form.classList.add("form");
    const subform = document.createElement("div");
    subform.classList.add("subform");
    form.appendChild(subform);

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
            subform.appendChild(field);
            continue;
        };

        // add input type text
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name",value.toLowerCase());

        field.appendChild(input);
        subform.appendChild(field);
    };

    form.appendChild(addConstraints());
    form.appendChild(addForeignKeyReference());
    // form
    document.querySelector<HTMLBodyElement>("body")?.appendChild(form);
    return form;
}

function resolveFieldButton(form?:HTMLElement):HTMLInputElement{ 
    // will resolve field, taking us back to table form
    if(form){console.log(form)}
    const button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Add Field");

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        showForm("field",false);
        showForm("table",true);
    })
    return button;
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
    constraints.classList.add("constraints", "subform", "field");
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
    form.classList.add("foreignKey", "subform");
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
    form.appendChild(resolveFieldButton());
    return form;
}

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
