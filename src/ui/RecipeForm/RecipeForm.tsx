import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";

import type { RecipeBook, Recipe, Ingredient } from "../../core/recipe";
import type { RecipeErrors } from "../../core/form";
import type { RecipeFormProps } from "../../Stack";
import { addRecipe, updateRecipe } from "../../core/recipe";
import { blankRecipe, getInitialErrors } from "../../core/form";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeYieldInput } from "./RecipeYieldInput";
import { RecipeNameInput } from "./RecipeNameInput";
import { RecipeNotesInput } from "./RecipeNotesInput";
import { IngredientFormSection } from "./IngredientFormSection";

import { Styles } from "../Styles";

type RouteProp = RecipeFormProps["route"];

const getInitialRecipe = (
  route: RouteProp,
  recipes: RecipeBook
): [string, Recipe] => {
  return route.params?.recipeName
    ? [route.params.recipeName, recipes[route.params.recipeName]]
    : ["", blankRecipe()];
};

const isNewRecipe = (route: RouteProp): boolean => {
  return typeof route.params?.recipeName == "undefined";
};

export const RecipeForm = ({ navigation, route }: RecipeFormProps) => {
  const context: AppContextType = useContext(AppContext);
  const [initialRecipeName, initialRecipe]: [string, Recipe] = getInitialRecipe(
    route,
    context.recipes
  );

  const [recipeName, setRecipeName] = useState<string>(initialRecipeName);
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [errors, setErrors] = useState<RecipeErrors>(
    getInitialErrors(initialRecipe, isNewRecipe(route))
  );

  /* Callbacks passed to form children to update various parts of the recipe */
  const updateRecipeYieldAmount = (newAmount: string) => {
    setRecipe({
      ...recipe,
      yield: { ...recipe.yield, amount: Number(newAmount) },
    });
  };

  const updateRecipeYieldUnits = (newUnits: string) => {
    setRecipe({
      ...recipe,
      yield: { ...recipe.yield, units: newUnits },
    });
  };

  const updateIngredients = (newIngredients: Array<Ingredient>) => {
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  /* End of callbacks to update recipe */

  /* Callbacks passed to form children to update form errors */
  const updateRecipeNameError = (hasError: boolean) => {
    setErrors({ ...errors, name: hasError });
  };

  const updateRecipeYieldAmountError = (hasError: boolean) => {
    setErrors({ ...errors, yieldAmount: hasError });
  };

  const updateRecipeYieldUnitsError = (hasError: boolean) => {
    setErrors({ ...errors, yieldUnits: hasError });
  };
  /* End of callbacks to update form errors */

  const saveRecipe = () => {
    const newRecipeBook: RecipeBook = isNewRecipe(route)
      ? addRecipe(context.recipes, recipe, recipeName)
      : updateRecipe(context.recipes, recipe, recipeName);
    context.saveRecipes(newRecipeBook);
    navigation.goBack();
  };

  return (
    <View style={Styles.screen}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={isNewRecipe(route) ? "Add Recipe" : "Edit Recipe"}
        />
      </Appbar.Header>
      <ScrollView style={Styles.content}>
        <View>
          <RecipeNameInput
            initialName={initialRecipeName}
            parentFunctions={{
              updateValue: setRecipeName,
              updateErrors: updateRecipeNameError,
            }}
          />
          <RecipeYieldInput
            recipeYield={recipe.yield}
            // These props are really messy but I can't find a cleaner way to do this
            // "parent" functions (for yield amount, yield units, resp.) are the functions that help manage the parent's state
            parentAmountFunctions={{
              updateValue: updateRecipeYieldAmount,
              updateErrors: updateRecipeYieldAmountError,
            }}
            parentUnitFunctions={{
              updateValue: updateRecipeYieldUnits,
              updateErrors: updateRecipeYieldUnitsError,
            }}
          />
          <Divider />
          <IngredientFormSection
            ingredients={recipe.ingredients}
            updateIngredients={updateIngredients}
            errors={errors}
            setErrors={setErrors}
          />
          <Divider />
          <RecipeNotesInput recipe={recipe} setRecipe={setRecipe} />
        </View>
        <View>
          <Button
            mode="contained"
            disabled={Object.values(errors).some((value) => value === true)}
            onPress={() => saveRecipe()}
          >
            SAVE
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
