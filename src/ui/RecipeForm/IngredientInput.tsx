import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import DropDown from "@go_robots/react-native-paper-dropdown";

import { Styles } from "../Styles";
import { IngredientError } from "./IngredientError";

import { type Unit, UNITS } from "../../core/ingredient";
import type { RecipeForm } from "../../core/form";

type IngredientInputProps = {
  index: number;
  control: Control<RecipeForm>;
  deleteIngredient: (index: number) => void;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  index,
  control,
  deleteIngredient,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownCallbacks = {
    showDropDown: () => setShowDropDown(true),
    onDismiss: () => setShowDropDown(false),
  };

  const deleteSelf = () => deleteIngredient(index);

  return (
    <View style={{ ...Styles.row, marginVertical: 10 }}>
      <View
        style={{
          ...Styles.column,
          width: "10%",
          alignItems: "flex-end",
        }}
      >
        <IconButton
          icon="close"
          onPress={deleteSelf}
          style={{ paddingTop: 5 }}
          accessibilityHint={`Delete ingredient ${index} from ingredients`}
        />
      </View>
      <View
        style={{
          ...Styles.column,
          width: "90%",
        }}
      >
        <View style={{ ...Styles.row, marginBottom: 5 }}>
          <Controller
            name={`ingredients.${index}.name`}
            control={control}
            rules={{
              required: "Ingredient name cannot be empty",
              maxLength: {
                value: 50,
                message: "Ingredient name cannot be longer than 50 characters",
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                label="Ingredient Name"
                mode="outlined"
                placeholder="Ingredient name"
                style={{ width: "100%" }}
              />
            )}
          ></Controller>
        </View>
        <View style={Styles.row}>
          <View style={{ width: "40%", marginRight: 5 }}>
            <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              rules={{
                required: "Ingredient amount is required",
                min: {
                  value: 0.001,
                  message: "Ingredient amount must be greater than zero",
                },
                pattern: {
                  value: /^[0-9]*(\.[0-9]+)?$/,
                  message: "Ingredient amount must be a number",
                },
              }}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  label="Amount"
                  keyboardType="numeric"
                  mode="outlined"
                  textAlign="right"
                />
              )}
            ></Controller>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Controller
              name={`ingredients.${index}.units`}
              control={control}
              render={({ field }) => (
                <DropDown
                  value={field.value}
                  setValue={field.onChange}
                  label="Units"
                  mode={"outlined"}
                  visible={showDropDown}
                  {...dropdownCallbacks}
                  list={UNITS.map((unit: Unit) => {
                    return { label: unit, value: unit };
                  })}
                />
              )}
            ></Controller>
          </View>
        </View>
        <IngredientError control={control} index={index} />
      </View>
    </View>
  );
};

export const MemoizedIngredientInput = React.memo(IngredientInput);
