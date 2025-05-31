// import Table from "./table";
import { drawTable } from "./draw.js";
import Form from "./formClass.js";
import Table, * as table from "./table.js";

let currentForm:Form|null = null;
let currentTable = table.createTable([]);
let currentTablePreview = document.createElement("table");

export const forms:{[index:string]:HTMLFormElement} = {
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
    "import":document.createElement("form"),

    /**
     * Form object for exporting sql
     */
    "export":document.createElement("form"),

    "note":document.createElement("form")
}

export type FormType = "table"|"field"|"import"|"export"|"note";

// export function setCurrentTable(table:Table){
//     currentTable = table;
// }

export function setCurrentTablePreview(table:HTMLTableElement){
    currentTablePreview = table;
}

export function setup(form?:Form){
    if(form) currentForm = form; 

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
export function createTableForm():HTMLFormElement {
    const form = document.createElement("form");
    form.classList.add("form");
    const subform = document.createElement("div");
    subform.classList.add("subform");
    form.appendChild(subform);
    
    const formFields = ["Name", "Description", "Colour"];

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

    const table = currentTablePreview;
    table.classList.add("fieldTable");
    table.id = "table"
    
    subform.appendChild(table);
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
        if(currentForm){
            currentForm.currentTable = currentTable;
            console.log(currentForm.currentTable);
            currentForm.updateEditorElements();
            // drawTable(currentForm.currentTable);
        }
        
        showForm("table",false);
    })
    return button;
}

// export function setTableButtonEventListener(func:()=>void){

// }

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
export function createFieldForm():HTMLFormElement{
    const form = document.createElement("form");
    form.classList.add("form");
    const subform = document.createElement("div");
    subform.classList.add("subform");
    form.appendChild(subform);

    form.id = "fieldForm"

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
    button.setAttribute("type","submit");
    button.setAttribute("value","Add Field");

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        const form = document.forms.namedItem("fieldForm");
        // const form = document.querySelector<HTMLFormElement>("form");
        if(!form) return;
        // console.log(form);
        const field = getFieldFormData(form);
        addFieldTable(field);
        table.setField(currentTable, field);
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
    constraints.setAttribute("name", "constraints");
    const constraintTitles:{[index:string]:string} = {"PK":"primaryKey",
                              "AN":"allowNull",
                              "UQ":"unique",
                              "AI":"autoIncrement",
                              "FK":"foriegnKey"};

    // TODO: Add an onhover or onclick key

    for(const value in constraintTitles){
        const constraint = document.createElement("div"); // for 1 constraint
        constraint.classList.add("constraint");

        // constraint label
        const title = document.createElement("label");
        title.setAttribute("for",value);
        title.innerText = value;

        //constraint value (boolean)
        const constraintValue =  document.createElement("input");
        constraintValue.setAttribute("type","checkbox");
        constraintValue.setAttribute("name",constraintTitles[value]);
        constraintValue.id = value;

        constraint.appendChild(title);
        constraint.appendChild(constraintValue);
        constraints.appendChild(constraint);

    }
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
        // currentDisplayFieldsTable.appendChild(tableData);
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

// function getTableFormData(form:HTMLFormElement):Table{

// }

function getFieldFormData(form:HTMLFormElement):table.Field{
    const field = table.createField("", "TEXT");
    /*
     *  0: <input type="text" name="name">​
     *  1: <select name="type">​
     *  2: <input type="text" name="size">​
     *  3: <input type="text" name="default">​
     *  4: <input type="text" name="description">​
     *  5: <input id="PK" type="checkbox" name="PK">​
     *  6: <input id="AN" type="checkbox" name="AN">​
     *  7: <input id="UQ" type="checkbox" name="UQ">​
     *  8: <input id="AI" type="checkbox" name="AI">​
     *  9: <input id="FK" type="checkbox" name="FK">​
     *  10: <select>​
     *  11: <select>​
     *  12: <select>​
     *  13: <select>
     */

    for(let item in field){
        const some = form.elements.namedItem(item) as HTMLInputElement || form.elements.namedItem("default");
        // console.log(some.value);
        field[item] = some.value || item;
    }
    
    field.constraints = table.createContraints(false);
    for(let item in field.constraints){
        if(!isNaN(Number(item))) continue;
        if(item == "foriegnKeyValue") continue;

        const some = form.elements.namedItem(item) as HTMLInputElement;

        field.constraints[item] = some.checked;
        console.log(`${item}:${some.checked}`)
    }

    field.constraints.foriegnKeyValue = null;
    console.log(field);

    return field;
}

function addFieldTable(field:table.Field){
    // let currentTable = table.createTable([]);
    // let currentDisplayFieldsTable = document.createElement("table");
    
    // currentTable = 
    const tableRow = document.createElement("tr");
    currentTablePreview.appendChild(tableRow);
    // setCurrentDisplayFieldsTable()
    
    let tableData = document.createElement("td");
    tableData.innerText = field.constraints.foriegnKey?"FK":
                          field.constraints.primaryKey?"PK":"";
    tableRow.appendChild(tableData);

    tableData = document.createElement("td");
    tableData.innerText = field.name;
    tableRow.appendChild(tableData);
    
    tableData = document.createElement("td");
    tableData.innerText = field.type;
    tableRow.appendChild(tableData);
    
    tableData = document.createElement("td");
    tableData.innerText = "edit...";
    tableRow.appendChild(tableData);

    // console.log(currentDisplayFieldsTable);
}