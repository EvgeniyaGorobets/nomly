export const UNITS = ["cups", "tbsp", "tsp", "mL", "g", "oz", "N/A"] as const;
export type Unit = (typeof UNITS)[number];

export type Ingredient = {
  name: string;
  amount: number;
  units: Unit;
};

/* -- FUNCTIONS --*/

export const addIngredient = (ingredients: Ingredient[]): Ingredient[] => {
  const blankIngredient: Ingredient = {
    name: "",
    amount: 0,
    units: "cups",
  };

  return [...ingredients, blankIngredient];
};

export const deleteIngredient = (
  ingredients: Ingredient[],
  index: number
): Ingredient[] => {
  return [...ingredients.slice(0, index), ...ingredients.slice(index + 1)];
};

export const updateIngredient = (
  ingredients: Ingredient[],
  index: number,
  ingredient: Ingredient
): Ingredient[] => {
  return [
    ...ingredients.slice(0, index),
    ingredient,
    ...ingredients.slice(index + 1),
  ];
};
