
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const fields = ["Title", "Type", "Size", "Default", "Description"]
const constraints = ["Primary Key",
"Allow Null",
"Unique",
"Auto Increment",
"Unsigned",
"Foreign Key"]

const form = document.createElement("div");
form.classList.add("form")
for(let str of fields){
  if(str.toLowerCase() == "type"){continue;}
  // console.log
  const field = document.createElement("div")
  field.classList.add("field");

  const label = document.createElement("label");
  label.setAttribute("for", str.toLowerCase());
  label.innerText = `${str} :`;

  const input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("name",str.toLowerCase());
  input.setAttribute("id",str.toLowerCase());

  field.appendChild(label)
  field.appendChild(input)
  form.appendChild(field)
}

const submit = document.createElement("input")
submit.setAttribute("type", "button");
submit.setAttribute("name", "button");
submit.setAttribute("value", "Add");
form.appendChild(submit)
document.body.appendChild(form)

export default function showForm(){
  console.log("show form");
  console.log(form);
  form.style.visibility = "visible";
}

export function hideForm(){
  form.style.visible = null;
}
