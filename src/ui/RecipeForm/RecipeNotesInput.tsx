import React from "react";
import { Input, Column, Heading } from "native-base";

import type { Recipe } from "../../core/recipe";

type RecipeNotesProps = {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
};

export const RecipeNotesInput = ({ recipe, setRecipe }: RecipeNotesProps) => {
  return (
    <Column>
      <Heading size="md" marginBottom="5px">
        Notes
      </Heading>
      <Input
        value={recipe.notes}
        onChangeText={(text: string) => setRecipe({ ...recipe, notes: text })}
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        variant="outline"
      />
    </Column>
  );
};
