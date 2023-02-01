/*--- business logic for manipulating the ingredient amounts in a recipe ---*/

import { Ingredient } from "./recipe";

export const adjustIngredientAmounts = (
  ingredients: Ingredient[],
  originalYield: number,
  targetYield: number
): Ingredient[] => {
  return ingredients.map((ingredient: Ingredient) => ({
    ...ingredient,
    amount: ingredient.amount * (targetYield / originalYield),
  }));
};

const roundDecimal = (decimal: number): string => {
  return Number(decimal.toFixed(3)).toString();
};

const decimalToFractionMap = {
  "0.125": "⅛",
  "0.250": "¼",
  "0.333": "⅓",
  "0.375": "⅜",
  "0.500": "½",
  "0.625": "⅝",
  "0.667": "⅔",
  "0.750": "¾",
  "0.875": "⅞",
};

const getClosestFraction = (decimal: number): string => {
  const potentialFractions: string[] = [
    "0",
    ...Object.keys(decimalToFractionMap),
    "1",
  ];

  const [smallestDelta, indexOfDelta]: number[] = potentialFractions
    .map((value: string) => decimal - Number(value))
    .reduce(
      ([min, argmin]: number[], delta: number, i: number) =>
        Math.abs(delta) < Math.abs(min) ? [delta, i] : [min, argmin],
      [2, -1]
    );

  return potentialFractions[indexOfDelta];
};

const convertToFraction = (amount: number): string => {
  if (amount % 1 === 0) {
    // amount is a whole number
    return amount.toString();
  }

  const decimal: number = amount % 1;
  const whole: number = amount - decimal;

  const closestFraction: string = getClosestFraction(decimal);

  if (closestFraction === "0") {
    return whole.toString();
  } else if (closestFraction == "1") {
    return (whole + 1).toString();
  } else {
    const fraction: string =
      decimalToFractionMap[
        closestFraction as keyof typeof decimalToFractionMap
      ];
    return `${whole > 0 ? whole : ""}${fraction}`;
  }
};

export const formatIngredientAmount = (
  ingredient: Ingredient,
  fractionMode: boolean
): string => {
  const amount: string =
    fractionMode && ["cups", "tbsp", "tsp"].indexOf(ingredient.units) !== -1
      ? convertToFraction(ingredient.amount)
      : roundDecimal(ingredient.amount);
  return `${amount} ${ingredient.units}`;
};
