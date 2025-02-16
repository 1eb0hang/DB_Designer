
export function Constraints(values, reference){
  this.values = values;
  this.reference = reference;
}

export const createConstraints = function(
    v_primaryKey,
    v_allowNull,
    v_unique,
    v_autoIncrement,
    v_unsigned,
    v_foreignKey){

  const constraints = {
    primaryKey : v_primaryKey,
    allowNull : v_allowNull,
    unique : v_unique,
    autoIncrement : v_autoIncrement,
    unsigned : v_unsigned,
    foreignKey : v_foreignKey,
    reference : v_reference
  };
  return constraints;
}
