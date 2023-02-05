import React from "react";

import { RecipeBook } from "./core/recipe";
import { AppAlert } from "./core/alert";

export type AppContextType = {
  recipes: RecipeBook;
  saveRecipes: (recipes: RecipeBook) => Promise<void>;
  fractionMode: boolean;
  toggleFractionMode: (mode: boolean) => Promise<void>;
  alerts: AppAlert[];
  setAlerts: (alerts: AppAlert[]) => void;
};

export const AppContext = React.createContext<AppContextType>({
  recipes: {},
  saveRecipes: (recipes: RecipeBook) => {
    return new Promise((resolve) => {});
  },
  fractionMode: true,
  toggleFractionMode: (mode: boolean) => {
    return new Promise((resolve) => {});
  },
  alerts: [],
  setAlerts: (alerts: AppAlert[]) => {},
});
