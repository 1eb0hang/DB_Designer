import * as form from "./form.js";
import Editor from "./editor.js";
import { createFieldForm, createTableForm } from "./form.js";
import Table, { createTable } from "./table.js";

// const currentTable = createTable([]);

// const forms:{[index:string]:HTMLFormElement} = {
//     /**
//      * Form object from creating a table
//      */
//     "table":createTableForm(),

//     /**
//      * Form object for creating a table field
//      */
//     "field":createFieldForm(),

//     /**
//      * Form object from import sql
//      */
//     "import":document.createElement("form"),

//     /**
//      * Form object for exporting sql
//      */
//     "export":document.createElement("form"),

//     "note":document.createElement("form")
// }

class Form{
    currentForm:FormType;
    currentTable:Table
    readonly currentEditor:Editor;

    constructor(editor:Editor){
        this.currentForm = "table";
        this.currentTable = createTable([]);
        this.currentEditor = editor;
        form.setup(this);
    }

    readonly show = (value:boolean):void=>{
        form.forms[this.currentForm].classList.toggle("inactive", !value);
        console.log(`${this.currentForm.toUpperCase()}: ${value}`);
    }

    readonly setCurrentForm = (type:FormType):void=>{
        this.currentForm = type;
    }

    readonly getCurrentForm = ():HTMLFormElement=>{
        return form.forms[this.currentForm];
    }

    readonly reset = ():void=>{
        this.currentTable = createTable([]);
    }

    readonly updateEditorElements = ()=>{
        this.currentEditor.appendElement(this.currentTable);
        console.log(this.currentEditor.elements)
    }
}

export type FormType = "table"|"field"|"import"|"export"|"note";

export default Form;