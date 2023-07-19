export const isNumeric = (amount: string): boolean => {
  return amount !== "" && !isNaN(Number(amount));
};
