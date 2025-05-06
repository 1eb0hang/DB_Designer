/**
 * This form is to create a table, and has the following fields:
 * - table name
 * - field list (calls createFieldForm)
 * - table head colour
 *
 * @returns new form to create a table object
 */
function createTableForm() {
    const form = document.createElement("div");
    form.classList.add("form");
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
 */
function createFieldForm() {
    const form = document.createElement("div");
    [
        "Name",
        "Type",
        "Size",
        "Default",
        "Description"
    ].forEach((value) => {
        const field = document.createElement("div");
        field.classList.add("field");
        const label = document.createElement("label");
        label.setAttribute("for", value.toLowerCase());
        // <input type="text" name="" class="">
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        //if(value.toLowerCase() == "type") input.setAttribute("type", "select");
        input.setAttribute("name", value.toLowerCase());
        field.appendChild(label);
        field.appendChild(input);
        form.appendChild(form);
    });
    return form;
}
function addSelect(value, options) {
    //return document.
}
function showForm() {
    return;
}
export {};
