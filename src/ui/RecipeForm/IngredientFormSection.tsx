import React from "react";
import { View } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";

import type { RecipeErrors } from "../../core/form";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../core/form";
import { IngredientInput } from "./IngredientInput";
import { Ingredient, Recipe } from "../../core/recipe";

type IngredientSectionProps = {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
  errors: RecipeErrors;
  setErrors: (newErrors: RecipeErrors) => void;
};

export const IngredientFormSection = ({
  recipe,
  setRecipe,
  errors,
  setErrors,
}: IngredientSectionProps) => {
  const addNewIngredient = () => {
    // new ingredient by default has an error so we must disable the SAVE button
    setErrors({
      ...errors,
      [`ingredientAmount-${recipe.ingredients.length}`]: true,
    });
    setRecipe(addIngredient(recipe));
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text variant="headlineSmall">Ingredients</Text>
      {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
        <IngredientInput
          key={i}
          ingredient={ingredient}
          deleteIngredient={() => setRecipe(deleteIngredient(recipe, i))}
          updateIngredient={(ingredient: Ingredient) => {
            setRecipe(updateIngredient(recipe, i, ingredient));
          }}
          setIngredientNameError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientName-${i}`]: hasErr })
          }
          setIngredientAmountError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientAmount-${i}`]: hasErr })
          }
        />
      ))}
      <Button icon="plus" mode="contained-tonal" onPress={addNewIngredient}>
        <Text variant="bodyLarge">Add Ingredient</Text>
      </Button>
    </View>
  );
};
