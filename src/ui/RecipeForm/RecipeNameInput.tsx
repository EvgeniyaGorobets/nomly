import React, { useContext, useState } from "react";
import { Input, Column, FormControl } from "native-base";

import { AppContext, AppContextType } from "../../AppContext";
import {
  onInputChange,
  validateRecipeName,
  ParentStateFunctions,
} from "../../core/form";

type RecipeNameProps = {
  initialName: string;
  parentFunctions: ParentStateFunctions;
};

export const RecipeNameInput = ({
  initialName,
  parentFunctions,
}: RecipeNameProps) => {
  const context: AppContextType = useContext(AppContext);

  const [recipeName, setRecipeName] = useState<string>(initialName);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isBlurred, setBlurred] = useState<boolean>(true);

  const onChangeText = (newName: string) =>
    onInputChange(
      newName,
      (text: string) => validateRecipeName(initialName, text, context.recipes),
      { setInput: setRecipeName, setErrorMsg: setErrorMsg },
      parentFunctions
    );

  return (
    <FormControl isRequired isInvalid={isDirty && isBlurred && errorMsg !== ""}>
      <Column paddingY="5px">
        <Input
          value={recipeName}
          placeholder="Recipe Name"
          onChangeText={onChangeText}
          variant="underlined"
          fontSize="lg"
          onFocus={() => {
            if (!isDirty) {
              setDirty(true);
            }
            setBlurred(false);
          }}
          onBlur={() => setBlurred(true)}
        />
        <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
      </Column>
    </FormControl>
  );
};
