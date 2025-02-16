
export function Reference(values){
  this.values = values;
}

export const createReference = function(fk, table, ref){
  const ref = {
    field: fk, // field object
    reference_table:table, // table object
    reference_field:ref // field object
  }

  return new Reference(ref);
}
