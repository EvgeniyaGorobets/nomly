import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Button, Divider, useTheme } from "react-native-paper";

import { RecipeYieldInput } from "./RecipeYieldInput";
import { RecipeNameInput } from "./RecipeNameInput";
import { RecipeNotesInput } from "./RecipeNotesInput";
import { IngredientFormSection } from "./IngredientFormSection";

import { type RecipeFormProps } from "../../Stack";
import { AppContext } from "../../AppContext";

import {
  type RecipeBook,
  type Recipe,
  updateRecipe,
  getBlankRecipe,
} from "../../core/recipe-book";
import type { Ingredient } from "../../core/ingredient";
import {
  type RecipeErrors,
  type IngredientErrors,
  getInitialErrors,
  isRecipeValid,
} from "../../core/recipe-errors";

import { Styles } from "../Styles";

type RouteProp = RecipeFormProps["route"];

const getInitialRecipe = (
  route: RouteProp,
  recipes: RecipeBook
): [string, Recipe] => {
  return route.params?.recipeName
    ? [route.params.recipeName, recipes[route.params.recipeName]]
    : ["", getBlankRecipe()];
};

const isNewRecipe = (route: RouteProp): boolean => {
  return typeof route.params?.recipeName == "undefined";
};

export const RecipeForm = ({ navigation, route }: RecipeFormProps) => {
  const theme = useTheme();
  const { recipes, saveRecipes } = useContext(AppContext);
  const [initialRecipeName, initialRecipe]: [string, Recipe] = getInitialRecipe(
    route,
    recipes
  );

  const [recipeName, setRecipeName] = useState<string>(initialRecipeName);
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [errors, setErrors] = useState<RecipeErrors>(
    getInitialErrors(isNewRecipe(route), recipe.ingredients.length)
  );

  /* Callbacks passed to recipe name input component */
  const updateRecipeNameError = (hasError: boolean) => {
    setErrors({ ...errors, name: hasError });
  };
  /* End of callbacks passed to recipe name input component */

  /* Callbacks passed to recipe yield input component */
  const updateRecipeYieldAmount = (newAmount: number) => {
    setRecipe((prevRecipe: Recipe) => {
      return {
        ...prevRecipe,
        yield: { ...prevRecipe.yield, amount: newAmount },
      };
    });
  };

  const updateRecipeYieldUnits = (newUnits: string) => {
    setRecipe((prevRecipe: Recipe) => {
      return {
        ...prevRecipe,
        yield: { ...prevRecipe.yield, units: newUnits },
      };
    });
  };

  const updateRecipeYieldAmountError = (hasError: boolean) => {
    setErrors((prevErrors: RecipeErrors) => {
      return {
        ...prevErrors,
        yield: { ...prevErrors.yield, amount: hasError },
      };
    });
  };

  const updateRecipeYieldUnitsError = (hasError: boolean) => {
    setErrors((prevErrors: RecipeErrors) => {
      return {
        ...prevErrors,
        yield: { ...prevErrors.yield, units: hasError },
      };
    });
  };
  /* End of callbacks passed to recipe yield input component */

  /* Callbacks passed to ingredient input components */
  const updateIngredients = (
    callback: (prevIngredients: Ingredient[]) => Ingredient[]
  ) => {
    setRecipe((prevRecipe: Recipe) => {
      return { ...prevRecipe, ingredients: callback(prevRecipe.ingredients) };
    });
  };

  const updateIngredientErrors = (
    callback: (prevErrors: IngredientErrors[]) => IngredientErrors[]
  ) => {
    setErrors((prevErrors: RecipeErrors) => {
      return { ...prevErrors, ingredients: callback(prevErrors.ingredients) };
    });
  };
  /* End of callbacks passed to ingredient input components */

  const saveRecipe = () => {
    const newRecipeBook: RecipeBook = updateRecipe(
      recipes,
      recipe,
      initialRecipeName,
      recipeName
    );
    saveRecipes(newRecipeBook);
    // TODO: consider going to a new screen instead of going back
    navigation.goBack();
  };

  return (
    <View style={Styles.screen}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          accessibilityHint="Go back to previous screen"
        />
        <Appbar.Content
          title={isNewRecipe(route) ? "Add Recipe" : "Edit Recipe"}
        />
      </Appbar.Header>
      <ScrollView style={Styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <RecipeNameInput
            initialName={initialRecipeName}
            setName={setRecipeName}
            setErrors={updateRecipeNameError}
          />
          <RecipeYieldInput
            recipeYield={recipe.yield}
            setYieldAmount={updateRecipeYieldAmount}
            setYieldUnits={updateRecipeYieldUnits}
            setYieldAmountErrors={updateRecipeYieldAmountError}
            setYieldUnitsErrors={updateRecipeYieldUnitsError}
          />
          <Divider />
          <IngredientFormSection
            ingredients={recipe.ingredients}
            setIngredients={updateIngredients}
            setErrors={updateIngredientErrors}
          />
          <Divider />
          <RecipeNotesInput recipe={recipe} setRecipe={setRecipe} />
        </View>
        <View>
          <Button
            mode="contained"
            disabled={!isRecipeValid(errors)}
            onPress={() => saveRecipe()}
            accessibilityHint="Save recipe"
            labelStyle={{ ...theme.fonts.titleLarge, fontWeight: "800" }}
          >
            SAVE
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
