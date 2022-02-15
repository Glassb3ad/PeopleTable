export const parseString = (a: unknown, b: string): string => {
  if ( !a || ! isString(a)){
    throw new Error(`Incorrect or missing ${b}: ${a}`);
  }
  return a;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseAge = (a: unknown): number => {
  if ( !a || ! isNumber(a)){
    throw new Error(`Incorrect or missing age: ${a}`);
  }
  return a;
};

const isNumber = (a: unknown): a is number => {
  return typeof a === "number";
};