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
      const recipes: RecipeBook | null = await fetchData(storage.RECIPES);
      if (recipes) {
        setRecipeBook(recipes);
      }

      const fractionMode: string | null = await fetchData(storage.FRACTION);
      if (fractionMode) {
        setFractionMode(fractionMode === "true");
      }
    })();
  }, []);

  // Asynchronously save the recipe book each time it changes
  useEffect(() => {
    console.log("Saving recipe book");
    console.log(recipeBook);
    saveData(storage.RECIPES, recipeBook);
  }, [recipeBook]);

  // Asynchronously save the fraction mode each time it changes
  useEffect(() => {
    console.log("Saving fraction mode preference");
    saveData(storage.FRACTION, fractionMode.toString());
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
