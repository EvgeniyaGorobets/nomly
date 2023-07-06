import React from "react";
import { Input, Column, Heading } from "native-base";
import { TextInput, Text } from "react-native-paper";

import type { Recipe } from "../../core/recipe";

type RecipeNotesProps = {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
};

export const RecipeNotesInput = ({ recipe, setRecipe }: RecipeNotesProps) => {
  return (
    <Column>
      <Text variant="headlineSmall">Notes</Text>
      <TextInput
        value={recipe.notes}
        onChangeText={(text: string) => setRecipe({ ...recipe, notes: text })}
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        mode="outlined"
      />
    </Column>
  );
};
