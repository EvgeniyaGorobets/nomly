import React from "react";
import { Input, Column, Heading } from "native-base";

import type { PotentialRecipe } from "../../core/form";
import { updateRecipeNotes } from "../../core/form";

type RecipeNotesProps = {
  recipe: PotentialRecipe;
  setRecipe: (recipe: PotentialRecipe) => void;
};

export const RecipeNotesInput = ({ recipe, setRecipe }: RecipeNotesProps) => {
  return (
    <Column>
      <Heading size="md" marginBottom="5px">
        Notes
      </Heading>
      <Input
        value={recipe.notes}
        onChangeText={(text: string) =>
          setRecipe(updateRecipeNotes(recipe, text))
        }
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        variant="outline"
      />
    </Column>
  );
};
