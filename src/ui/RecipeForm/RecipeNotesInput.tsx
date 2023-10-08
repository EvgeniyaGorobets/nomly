import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";

import type { RecipeForm } from "../../core/form";

export const RecipeNotesInput = (
  props: UseControllerProps<RecipeForm, "notes">
) => {
  const { field } = useController(props);

  return (
    <View style={{ marginVertical: 10 }}>
      <Text variant="headlineSmall">Notes</Text>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        mode="outlined"
      />
    </View>
  );
};
