
export function Field(values){
  this.values = values; // this is just the values
  // expects the values in the functions below
}

export const createField = function(
    v_name,
    v_type,
    v_size,
    v_default,
    v_description,
    v_constraints){

  const field = {
    name : v_name,
    type : v_type,
    size : v_size,
    default : v_default,
    description : v_description,
    constraints : v_constraints
  };
  return new Field(field);
}
