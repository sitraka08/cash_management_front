export const ifObject = (variable) => {
  return typeof variable === "object";
};
export const ifString = (variable) => {
  return typeof variable === "string";
};

export const ifArray = (variable) => {
  return Array.isArray(variable);
};
