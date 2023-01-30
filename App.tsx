import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Home,
  RecipeBook,
  RecipeForm,
  RecipeView,
  Stack,
  AppContext,
  THEME,
} from "./src";
import { fetchData, saveData, StorageKeys } from "./src/core/storage";

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
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          recipes: recipeBook,
          saveRecipes: (recipes: RecipeBook) => setRecipeBook(recipes),
        }}
      >
        <NativeBaseProvider theme={THEME}>
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
