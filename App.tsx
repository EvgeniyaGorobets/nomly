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
  theme,
  colorModeManager,
} from "./src";
import { fetchData, saveData, storage } from "./src/core/storage";

export default function App() {
  const [recipeBook, setRecipeBook] = useState<RecipeBook>({});
  const [fractionMode, setFractionMode] = useState<boolean>(false);

  // Fetch recipe book and fraction mode preferencefrom storage the first time the app loads
  useEffect(() => {
    console.log("Fetching recipe book and fraction mode preference");
    (async () => {
      try {
        const recipes: RecipeBook | null = await fetchData(storage.RECIPES);
        if (recipes) {
          setRecipeBook(recipes);
        }
      } catch (err) {
        console.log(
          `Failed to fetch recipes from storage with error:\n ${err}`
        );
      }

      try {
        const fractionMode: string | null = await fetchData(storage.FRACTION);
        if (fractionMode) {
          setFractionMode(fractionMode === "true");
        }
      } catch (err) {
        console.log(
          `Failed to fetch fraction-mode preference from storage with error:\n ${err}`
        );
      }
    })();
  }, []);

  // Asynchronously save the recipe book each time it changes
  useEffect(() => {
    try {
      console.log("Saving recipe book", Object.keys(recipeBook).length);
      saveData(storage.RECIPES, recipeBook);
    } catch (err) {
      console.log(
        `Failed to save recipe changes to storage with error:\n ${err}`
      );
    }
  }, [recipeBook]);

  // Asynchronously save the fraction mode each time it changes
  useEffect(() => {
    try {
      console.log("Saving fraction mode preference", fractionMode.toString());
      saveData(storage.FRACTION, fractionMode.toString());
    } catch (err) {
      console.log(
        `Failed to save fraction-mode preference to storage with error:\n ${err}`
      );
    }
  }, [fractionMode]);

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          recipes: recipeBook,
          saveRecipes: (recipes: RecipeBook) => setRecipeBook(recipes),
          fractionMode: fractionMode,
          toggleFractionMode: (mode: boolean) => setFractionMode(mode),
        }}
      >
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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
