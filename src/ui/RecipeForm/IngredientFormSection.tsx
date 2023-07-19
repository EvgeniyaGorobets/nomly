import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import type { RecipeErrors } from "../../core/form";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../core/form";
import { IngredientInput } from "./IngredientInput";
import type { Ingredient } from "../../core/recipe";

type IngredientSectionProps = {
  ingredients: Array<Ingredient>;
  updateIngredients: (newIngredients: Array<Ingredient>) => void;
  errors: RecipeErrors;
  setErrors: (newErrors: RecipeErrors) => void;
};

export const IngredientFormSection = ({
  ingredients,
  updateIngredients,
  errors,
  setErrors,
}: IngredientSectionProps) => {
  const addNewIngredient = () => {
    // new ingredient by default has an error so we must disable the SAVE button
    setErrors({
      ...errors,
      [`ingredientName-${ingredients.length}`]: true,
      [`ingredientAmount-${ingredients.length}`]: true,
    });
    updateIngredients(addIngredient(ingredients));
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text variant="headlineSmall">Ingredients</Text>
      {ingredients.map((ingredient: Ingredient, i: number) => (
        <IngredientInput
          key={i}
          ingredient={ingredient}
          deleteIngredient={() =>
            updateIngredients(deleteIngredient(ingredients, i))
          }
          updateIngredient={(ingredient: Ingredient) => {
            updateIngredients(updateIngredient(ingredients, i, ingredient));
          }}
          setIngredientNameError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientName-${i}`]: hasErr })
          }
          setIngredientAmountError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientAmount-${i}`]: hasErr })
          }
        />
      ))}
      <Button
        icon="plus"
        mode="contained-tonal"
        onPress={addNewIngredient}
        accessibilityHint="Add ingredient"
      >
        <Text variant="bodyLarge">Add Ingredient</Text>
      </Button>
    </View>
  );
};
