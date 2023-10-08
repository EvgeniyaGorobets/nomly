import React, { useContext } from "react";
import { type Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

import { AppContext } from "../../AppContext";

import type { RecipeForm } from "../../core/form";

export const RecipeNameInput = ({
  control,
  initialRecipeName,
}: {
  control: Control<RecipeForm>;
  initialRecipeName: string;
}) => {
  const { recipes } = useContext(AppContext);

  return (
    <View style={{ marginBottom: 10 }}>
      <Controller
        name="recipeName"
        control={control}
        rules={{
          required: "Recipe name cannot be empty",
          maxLength: {
            value: 100,
            message: "Recipe name cannot be longer than 100 characters",
          },
          validate: (value) =>
            value == initialRecipeName ||
            !(value in recipes) ||
            "A recipe with this name already exists",
        }}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Recipe Name"
              label="Recipe Name"
              mode="outlined"
              accessibilityHint="Recipe name input"
            />
            {fieldState.isDirty && fieldState.invalid && (
              <HelperText
                type="error"
                visible={fieldState.isDirty && fieldState.invalid}
              >
                {fieldState.error?.message}
              </HelperText>
            )}
          </>
        )}
      ></Controller>
    </View>
  );
};
