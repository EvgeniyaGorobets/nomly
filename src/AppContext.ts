import React from "react";

import { RecipeBook } from "./core/recipe";

export type AppContextType = {
  recipes: RecipeBook;
  saveRecipes: (recipes: RecipeBook) => void;
  fractionMode: boolean;
  toggleFractionMode: (mode: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>({
  recipes: {},
  saveRecipes: (recipes: RecipeBook) => {},
  fractionMode: true,
  toggleFractionMode: (mode: boolean) => {},
});
