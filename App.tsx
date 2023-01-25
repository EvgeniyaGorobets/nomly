import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import {
  Home,
  RecipeBook,
  RecipeForm,
  RecipeView,
  Stack,
  AppContext,
} from "./src";
import { fetchData, saveData, StorageKeys } from "./src/core/storage";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  const [recipeBook, setRecipeBook] = useState<RecipeBook>({});

  // Fetch recipe book from storage the first time the app loads
  useEffect(() => {
    console.log("Fetching recipe book");
    (async () => {
      const recipes: RecipeBook | null = await fetchData(StorageKeys.RECIPES);
      if (recipes) {
        setRecipeBook(recipes);
      }
    })();
  }, []);

  // Asynchronously save the recipe book each time it changes
  useEffect(() => {
    console.log("Saving recipe book");
    console.log(recipeBook);
    saveData(StorageKeys.RECIPES, recipeBook);
  }, [recipeBook]);

  return (
    <AppContext.Provider
      value={{
        recipes: recipeBook,
        saveRecipes: (recipes: RecipeBook) => setRecipeBook(recipes),
      }}
    >
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={RecipeForm} />
            <Stack.Screen name="Recipe" component={RecipeView} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppContext.Provider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
