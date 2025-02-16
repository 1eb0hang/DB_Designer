import {Field, createField} from "./field.js"
import {createConstraints} from "./constraints.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const constraints = createConstraints(
  true,
  false,
  false,
  true,
  false,
  false,
  null
)

const field = createField(
  "id",
  "Integer",
  null,
  null,
  null,
  constraints,
)

console.log(field);
