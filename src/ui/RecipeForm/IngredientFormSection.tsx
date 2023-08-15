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
  setIngredients: (
    callback: (prevIngredients: Ingredient[]) => Ingredient[]
  ) => void;
  setErrors: (
    callback: (prevErrors: IngredientErrors[]) => IngredientErrors[]
  ) => void;
};

export const IngredientFormSection = ({
  ingredients,
  setIngredients,
  setErrors,
}: IngredientSectionProps) => {
  const addNewIngredient = () => {
    setErrors((prevErrors: IngredientErrors[]) =>
      addIngredientToErrors(prevErrors)
    );
    setIngredients((prevIngredients: Ingredient[]) =>
      addIngredient(prevIngredients)
    );
  };

  const deleteIngredientAtIndex = (index: number) => {
    setErrors((prevErrors: IngredientErrors[]) =>
      deleteIngredientFromErrors(prevErrors, index)
    );
    setIngredients((prevIngredients: Ingredient[]) =>
      deleteIngredient(prevIngredients, index)
    );
  };

  const updateIngredientAtIndex = (
    index: number,
    callback: (prevIngredient: Ingredient) => Ingredient
  ) => {
    setIngredients((prevIngredients: Ingredient[]) => {
      const newIngredient: Ingredient = callback(prevIngredients[index]);
      return updateIngredient(prevIngredients, index, newIngredient);
    });
  };

  const updateIngredientError = (
    index: number,
    callback: (prevErrors: IngredientErrors) => IngredientErrors
  ) => {
    setErrors((prevErrors: IngredientErrors[]) => {
      const newErrors: IngredientErrors = callback(prevErrors[index]);
      return updateIngredientErrors(prevErrors, index, newErrors);
    });
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text variant="headlineSmall">Ingredients</Text>
      {ingredients.map((ingredient: Ingredient, i: number) => (
        <IngredientInput
          key={ingredient.id}
          ingredient={ingredient}
          deleteIngredient={() => deleteIngredientAtIndex(i)}
          setIngredient={(callback) => updateIngredientAtIndex(i, callback)}
          setIngredientError={(callback) => updateIngredientError(i, callback)}
        />
      ))}
      <Button
        icon="plus"
        mode="outlined"
        onPress={addNewIngredient}
        accessibilityHint="Add ingredient"
        style={{ marginTop: 10 }}
      >
        Add Ingredient
      </Button>
    </View>
  );
};
