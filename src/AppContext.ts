import React from "react";

import { RecipeBook } from "./core/recipe";

export type AppContextType = {
  recipes: RecipeBook;
  saveRecipes: (recipes: RecipeBook) => void;
};

export const AppContext = React.createContext<AppContextType>({
  recipes: {},
  saveRecipes: (recipes: RecipeBook) => {},
});
