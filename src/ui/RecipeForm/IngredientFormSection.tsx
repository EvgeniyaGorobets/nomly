import React from "react";
import { useFieldArray, Control } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { IngredientInput } from "./IngredientInput";

import { type Unit } from "../../core/ingredient";
import type { RecipeForm } from "../../core/form";

type IngredientSectionProps = {
  control: Control<RecipeForm>;
};

export const IngredientFormSection = ({ control }: IngredientSectionProps) => {
  const { fields, append, remove } = useFieldArray<RecipeForm>({
    control,
    name: "ingredients",
  });

  const addNewIngredient = () => {
    append({
      name: "",
      amount: "",
      units: "ea" as Unit,
    });
  };

  return (
    <View style={Styles.container}>
      <Text variant="headlineSmall">Ingredients</Text>
      {fields.map((field, index: number) => (
        <IngredientInput
          key={field.id}
          index={index}
          control={control}
          deleteIngredient={remove}
        />
      ))}
      <Button
        icon="plus"
        mode="outlined"
        onPress={addNewIngredient}
        accessibilityHint="Add ingredient"
        style={Styles.addIngredientButton}
      >
        Add Ingredient
      </Button>
    </View>
  );
};

export const MemoizedIngredientForm = React.memo(IngredientFormSection);

const Styles = {
  container: { marginVertical: 10 },
  addIngredientButton: { marginTop: 10 },
};
