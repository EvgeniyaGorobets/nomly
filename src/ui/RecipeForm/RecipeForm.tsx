import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";

import type { RecipeBook, Recipe, Yield } from "../../core/recipe";
import type { RecipeErrors } from "../../core/form";
import type { RecipeFormProps } from "../../Stack";
import { addRecipe, updateRecipe } from "../../core/recipe";
import { blankRecipe, getInitialErrors } from "../../core/form";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeYieldInput } from "./RecipeYieldInput";
import { RecipeNameInput } from "./RecipeNameInput";
import { RecipeNotesInput } from "./RecipeNotesInput";
import { IngredientFormSection } from "./IngredientFormSection";

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

  const updateRecipeYield = (newYield: Yield) => {
    setRecipe({ ...recipe, yield: newYield });
  };

  const saveRecipe = () => {
    const newRecipeBook: RecipeBook = isNewRecipe(route)
      ? addRecipe(context.recipes, recipe, recipeName)
      : updateRecipe(context.recipes, recipe, recipeName);
    context.saveRecipes(newRecipeBook);
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={isNewRecipe(route) ? "Add Recipe" : "Edit Recipe"}
        />
      </Appbar.Header>
      <ScrollView>
        <View>
          <RecipeNameInput
            initialName={initialRecipeName}
            parentFunctions={{
              updateValue: setRecipeName,
              updateErrors: (hasError: boolean) =>
                setErrors({ ...errors, name: hasError }),
            }}
          />
          <RecipeYieldInput
            recipeYield={recipe.yield}
            // These props are really messy but I can't find a cleaner way to do this
            // "parent" functions (for yield amount, yield units, resp.) are the functions that help manage the parent's state
            parentAmountFunctions={{
              updateValue: (newAmount: string) =>
                updateRecipeYield({
                  ...recipe.yield,
                  amount: Number(newAmount),
                }),
              updateErrors: (hasError: boolean) =>
                setErrors({ ...errors, yieldAmount: hasError }),
            }}
            parentUnitFunctions={{
              updateValue: (newUnits: string) =>
                updateRecipeYield({
                  ...recipe.yield,
                  units: newUnits,
                }),
              updateErrors: (hasError: boolean) =>
                setErrors({ ...errors, yieldUnits: hasError }),
            }}
          />
          <IngredientFormSection
            recipe={recipe}
            setRecipe={setRecipe}
            errors={errors}
            setErrors={setErrors}
          />
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
