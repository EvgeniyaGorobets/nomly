import React from "react";

import type { RecipeBook } from "./core/recipe-book";
import type { AppAlert } from "./core/alert";

export type Preferences = {
  fractionMode: boolean;
  darkMode: boolean;
};

export const defaultPreferences: Preferences = {
  fractionMode: false,
  darkMode: false,
};

export type AppContextType = {
  recipes: RecipeBook;
  saveRecipes: (recipes: RecipeBook) => Promise<void>;
  prefs: Preferences;
  togglePreference: (pref: keyof Preferences, mode: boolean) => Promise<void>;
  alerts: AppAlert[];
  setAlerts: (alerts: AppAlert[]) => void;
};

export const AppContext = React.createContext<AppContextType>({
  recipes: {},
  saveRecipes: (recipes: RecipeBook) => {
    return new Promise((resolve) => {});
  },
  prefs: {
    fractionMode: true,
    darkMode: true,
  },
  togglePreference: (pref: keyof Preferences, mode: boolean) => {
    return new Promise((resolve) => {});
  },
  alerts: [],
  setAlerts: (alerts: AppAlert[]) => {},
});
