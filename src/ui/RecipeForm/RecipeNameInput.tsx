import React from "react";
import { Input, Column, FormControl } from "native-base";

import type { RecipeErrors } from "../../core/form";

type RecipeNameProps = {
  errors: RecipeErrors;
  recipeName: string;
  setRecipeName: (newName: string) => void;
};

export const RecipeNameInput: React.FC<RecipeNameProps> = ({
  errors,
  recipeName,
  setRecipeName,
}) => {
  return (
    <FormControl isRequired isInvalid={"name" in errors}>
      <Column paddingY="5px">
        <Input
          value={recipeName}
          placeholder="Recipe Name"
          onChangeText={(newName: string) => setRecipeName(newName)}
          variant="underlined"
          fontSize="lg"
        />
        <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
      </Column>
    </FormControl>
  );
};
