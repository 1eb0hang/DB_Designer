// import Field from "./field.js"

/*Darw rectangle with text
ctx.fillStyle = "red";
ctx.fillRect(100, 100, 100, 22);
// ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.font = "16px Consolas";
ctx.fillText("Example text", 100, 116);
*/

// const constraints = createConstraints(
//   true,
//   false,
//   false,
//   true,
//   false,
//   false,
//   null
// )
//
// const field = createField(
//   "id",
//   "Integer",
//   null,
//   null,
//   null,
//   constraints,
// )
//
// console.log(field);

export function Table(fields){
  this.fields = fields;
  this.draw = function(){
    for(let field of fields){
      console.log(field.name);
    }
  }
}

const textRect(text, x, y, colour){
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, 500, 22);

  ctx.fillStyle = "black";
  ctx.font = "16px Consolas";
  ctx.fillText(text, x, y+16);
}
