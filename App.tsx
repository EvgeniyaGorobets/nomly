import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Home,
  RecipeBook,
  RecipeForm,
  RecipeView,
  Stack,
  AppContext,
  Theme,
  ColorModeManager,
  AppAlert,
} from "./src";
import { fetchData, saveData, storage } from "./src/core/storage";

export default function App() {
  const [recipeBook, setRecipeBook] = useState<RecipeBook>({});
  const [fractionMode, setFractionMode] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<AppAlert[]>([]);

  // two functions that simultaneously take care of:
  // 1. updating the AppContext
  // 2. persisting it to storage
  // 3. posting an alert if something goes wrong
  const saveRecipes = async (recipes: RecipeBook): Promise<void> => {
    setRecipeBook(recipes);
    try {
      await saveData(storage.RECIPES, recipes);
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Failed to save recipe changes to storage",
        description: `${err}`,
      };
      setAlerts([...alerts, alert]);
    }
  };

  const toggleFractionMode = async (mode: boolean): Promise<void> => {
    setFractionMode(mode);
    try {
      await saveData(storage.FRACTION, mode.toString());
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Failed to save fraction-mode preference to storage",
        description: `${err}`,
      };
      setAlerts([...alerts, alert]);
    }
  };

  // Fetch recipe book and fraction mode preferencefrom storage the first time the app loads
  useEffect(() => {
    (async () => {
      try {
        const recipes: RecipeBook | null = await fetchData(storage.RECIPES);
        if (recipes) {
          setRecipeBook(recipes);
        }
      } catch (err) {
        const alert: AppAlert = {
          status: "error",
          title: "Failed to fetch recipes from storage",
          description: `${err}`,
        };
        setAlerts([...alerts, alert]);
      }

      try {
        const fractionMode: string | null = await fetchData(storage.FRACTION);
        if (fractionMode) {
          setFractionMode(fractionMode === "true");
        }
      } catch (err) {
        const alert: AppAlert = {
          status: "error",
          title: "Failed to fetch fraction-mode preference from storage",
          description: `${err}`,
        };
        setAlerts([...alerts, alert]);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          recipes: recipeBook,
          saveRecipes: saveRecipes,
          fractionMode: fractionMode,
          toggleFractionMode: toggleFractionMode,
          alerts: alerts,
          setAlerts: setAlerts,
        }}
      >
        <NativeBaseProvider theme={Theme} colorModeManager={ColorModeManager}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Form" component={RecipeForm} />
              <Stack.Screen name="Recipe" component={RecipeView} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
