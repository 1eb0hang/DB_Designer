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
    form.classList.add("invisible");
    for (let value of ["Name", "Type", "Size", "Default", "Description"]) {
        const field = document.createElement("div");
        field.classList.add("field");
        const label = document.createElement("label");
        label.setAttribute("for", value.toLowerCase());
        label.innerText = value;
        field.appendChild(label);
        if (value.toLowerCase() == "type") {
            field.appendChild(addSelect(value, ["TEXT", "INTEGER", "BOOLEAN"])); // temporary
            form.appendChild(field);
            continue;
        }
        ;
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", value.toLowerCase());
        field.appendChild(input);
        form.appendChild(field);
    }
    ;
    return form;
}
function addSelect(value, options) {
    const select = document.createElement("select");
    select.setAttribute("name", value.toLowerCase());
    options.forEach((value) => {
        const option = document.createElement("option");
        option.innerText = value;
        select.appendChild(option);
    });
    return select;
}
function addConstraints() {
    const constraints = document.createElement("div");
    return constraints;
}
function addForeignKeyReference() {
    const form = document.createElement("div");
    return form;
}
function showForm() {
    return;
}
export {};
