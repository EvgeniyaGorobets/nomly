import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { IngredientInput } from "./IngredientInput";

import {
  type IngredientErrors,
  addIngredientToErrors,
  deleteIngredientFromErrors,
  updateIngredientErrors,
} from "../../core/recipe-errors";
import {
  type Ingredient,
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../core/ingredient";

type IngredientSectionProps = {
  ingredients: Ingredient[];
  setIngredients: (newIngredients: Array<Ingredient>) => void;
  ingredientErrors: IngredientErrors[];
  setErrors: (ingredientErrors: IngredientErrors[]) => void;
};

export const IngredientFormSection = ({
  ingredients,
  setIngredients,
  ingredientErrors,
  setErrors,
}: IngredientSectionProps) => {
  const addNewIngredient = () => {
    setErrors(addIngredientToErrors(ingredientErrors));
    setIngredients(addIngredient(ingredients));
  };

  const deleteIngredientAtIndex = (index: number) => {
    setErrors(deleteIngredientFromErrors(ingredientErrors, index));
    setIngredients(deleteIngredient(ingredients, index));
  };

  const updateIngredientAtIndex = (
    index: number,
    newIngredient: Ingredient
  ) => {
    setIngredients(updateIngredient(ingredients, index, newIngredient));
  };

  const updateIngredientNameError = (index: number, hasErr: boolean) => {
    const newErrors: IngredientErrors = {
      ...ingredientErrors[index],
      name: hasErr,
    };
    setErrors(updateIngredientErrors(ingredientErrors, index, newErrors));
  };

  const updateIngredientAmountError = (index: number, hasErr: boolean) => {
    const newErrors: IngredientErrors = {
      ...ingredientErrors[index],
      amount: hasErr,
    };
    setErrors(updateIngredientErrors(ingredientErrors, index, newErrors));
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text variant="headlineSmall">Ingredients</Text>
      {ingredients.map((ingredient: Ingredient, i: number) => (
        <IngredientInput
          key={i}
          ingredient={ingredient}
          deleteIngredient={() => deleteIngredientAtIndex(i)}
          setIngredient={(ingredient: Ingredient) =>
            updateIngredientAtIndex(i, ingredient)
          }
          setIngredientNameError={(hasErr: boolean) =>
            updateIngredientNameError(i, hasErr)
          }
          setIngredientAmountError={(hasErr: boolean) =>
            updateIngredientAmountError(i, hasErr)
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
