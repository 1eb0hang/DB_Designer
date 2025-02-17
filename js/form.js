
const form = document.querySelector(".form");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log(e.srcElement);
});
// form.style.position = "fixed";
// // form.
// form.style.visibility = "hidden";
// form.style.left = "100px";
// form.style.top = "100px";
// const p = document.createElement("p");
// p.innerText = "Text content";
// form.appendChild(p);
// document.body.append(form);

export function showForm(data){
  // console.log(document);
  // const form = document.createElement("div");
  console.log("show form");
  form.style.visibility = "visible";
}


 export function createNote(document){
   console.log("create note");
 }

 export function importSql(document){
   console.log("import");
 }

 export function exportSql(docmuent){
   console.log("export");
 }
