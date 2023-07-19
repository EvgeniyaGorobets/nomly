export const isNumeric = (amount: string): boolean => {
  return amount !== "" && !isNaN(Number(amount));
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const deepCopy = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
};
