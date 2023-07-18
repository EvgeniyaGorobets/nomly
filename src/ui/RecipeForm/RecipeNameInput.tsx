import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";
import { validateRecipeName } from "../../core/form-validation";
import { onInputChange, ParentStateFunctions } from "../../core/form";

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

  const onFocus = () => {
    if (!isDirty) {
      setDirty(true);
    }
  };

  const onChangeText = (newName: string) => {
    onFocus(); // temporarily firing it here because onFocus() doesn't work with RNTL
    onInputChange(
      newName,
      (text: string) => validateRecipeName(initialName, text, context.recipes),
      { setInput: setRecipeName, setErrorMsg: setErrorMsg },
      parentFunctions
    );
  };

  const showErrorText = () => isDirty && errorMsg !== "";

  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        value={recipeName}
        placeholder="Recipe Name"
        label="Recipe Name"
        onChangeText={onChangeText}
        mode="outlined"
        onFocus={onFocus}
      />
      {showErrorText() && (
        <HelperText type="error" visible={showErrorText()}>
          {errorMsg}
        </HelperText>
      )}
    </View>
  );
};
