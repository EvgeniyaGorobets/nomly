import { isNumeric } from "./utils";

/* ---- TYPES ---- */

export type Yield = {
  amount: number;
  units: string;
};

/**
 * Checks whether the recipe yield amount is a valid number. If it isn't,
 * returns an error message describing the error. If it is, returns an
 * empty string
 * @param amount - The proposed recipe yield amount
 * @returns The error message, or an empty string if there are no errors
 */
export const validateRecipeYieldAmount = (amount: string): string => {
  if (amount === "") {
    return "Recipe yield is required";
  } else if (!isNumeric(amount)) {
    return "Recipe yield must be a number";
  } else if (Number(amount) <= 0) {
    return "Recipe yield must be greater than zero";
  } else {
    return "";
  }
};

/**
 * Checks whether the recipe yield units are valid. If they aren't, returns
 * an error message describing the error. If they are, returns an empty string.
 * @param units - The proposed recipe yield units (e.g., "servings", "cookies")
 * @returns The error message, or an empty string if there are no errors
 */
export const validateRecipeYieldUnits = (units: string): string => {
  if (units.length === 0) {
    return "Recipe yield units cannot be empty";
  } else if (units.length > 25) {
    return "Recipe yield units cannot be longer than 25 characters";
  } else {
    return "";
  }
};
