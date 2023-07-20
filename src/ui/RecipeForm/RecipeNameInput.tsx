import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

import { AppContext } from "../../AppContext";
import { validateRecipeName } from "../../core/recipe-book";

type RecipeNameProps = {
  initialName: string;
  setName: (newName: string) => void;
  setErrors: (hasErr: boolean) => void;
};

export const RecipeNameInput = ({
  initialName,
  setName,
  setErrors,
}: RecipeNameProps) => {
  const { recipes } = useContext(AppContext);

  const [recipeName, setRecipeName] = useState<string>(initialName);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChangeText = (newName: string) => {
    // Update local state
    setRecipeName(newName);
    if (!isDirty) {
      setDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage = validateRecipeName(initialName, newName, recipes);
    setErrorMsg(errorMessage);
    setErrors(errorMessage !== "");

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setName(newName);
    }
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
        accessibilityHint="Recipe name input"
      />
      {showErrorText() && (
        <HelperText type="error" visible={showErrorText()}>
          {errorMsg}
        </HelperText>
      )}
    </View>
  );
};
