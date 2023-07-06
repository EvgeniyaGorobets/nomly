import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { PaperProvider } from "react-native-paper";
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
  Preferences,
  defaultPreferences,
} from "./src";
import { fetchData, saveData, storage } from "./src/core/storage";

export default function App() {
  const [recipeBook, setRecipeBook] = useState<RecipeBook>({});
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);
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

  const togglePreference = async (
    pref: keyof Preferences,
    mode: boolean
  ): Promise<void> => {
    setPreferences({ ...preferences, [pref]: mode });
    try {
      await saveData(storage.PREFS, preferences);
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Failed to save preferences to storage",
        description: `${err}`,
      };
      setAlerts([...alerts, alert]);
    }
  };

  // Fetch recipe book and preferences from storage the first time the app loads
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
        const prefs: Preferences | null = await fetchData(storage.PREFS);
        if (prefs) {
          setPreferences(prefs);
        }
      } catch (err) {
        const alert: AppAlert = {
          status: "error",
          title: "Failed to fetch preferences from storage",
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
          prefs: preferences,
          togglePreference,
          alerts: alerts,
          setAlerts: setAlerts,
        }}
      >
        <PaperProvider>
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
        </PaperProvider>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
