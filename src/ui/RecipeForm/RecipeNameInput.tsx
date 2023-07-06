import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

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

  const onFocus = () => {
    if (!isDirty) {
      setDirty(true);
    }
    setBlurred(false);
  };

  const onBlur = () => setBlurred(true);

  const onChangeText = (newName: string) =>
    onInputChange(
      newName,
      (text: string) => validateRecipeName(initialName, text, context.recipes),
      { setInput: setRecipeName, setErrorMsg: setErrorMsg },
      parentFunctions
    );

  return (
    //<FormControl isRequired isInvalid={isDirty && isBlurred && errorMsg !== ""}>
    <View>
      <TextInput
        value={recipeName}
        placeholder="Recipe Name"
        onChangeText={onChangeText}
        mode="outlined"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
    //</FormControl>
  );
};

// <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
