import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import DropDown from "@go_robots/react-native-paper-dropdown";

import { Styles } from "../Styles";
import { IngredientError } from "./IngredientError";

import { type Unit, UNITS } from "../../core/ingredient";
import { type RecipeForm, RecipeRules } from "../../core/form";

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
    <View style={IngredientStyles.ingredientContainer}>
      <View style={IngredientStyles.deleteColumn}>
        <IconButton
          icon="close"
          onPress={deleteSelf}
          style={IngredientStyles.deleteIcon}
          accessibilityHint={`Delete ingredient ${index} from ingredients`}
        />
      </View>
      <View style={IngredientStyles.inputColumn}>
        <View style={IngredientStyles.nameRow}>
          <Controller
            name={`ingredients.${index}.name`}
            control={control}
            rules={RecipeRules.ingredient.name}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                label="Ingredient Name"
                mode="outlined"
                placeholder="Ingredient name"
                style={IngredientStyles.nameInput}
              />
            )}
          ></Controller>
        </View>
        <View style={Styles.row}>
          <View style={IngredientStyles.amount}>
            <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              rules={RecipeRules.ingredient.amount}
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
          <View style={IngredientStyles.units}>
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

const IngredientStyles = {
  ingredientContainer: {
    ...Styles.row,
    marginVertical: 10,
  },
  deleteColumn: {
    ...Styles.column,
    width: "10%",
    alignItems: "flex-end",
  },
  deleteIcon: {
    paddingTop: 5,
  },
  inputColumn: {
    ...Styles.column,
    width: "90%",
  },
  nameRow: {
    ...Styles.row,
    marginBottom: 5,
  },
  nameInput: {
    width: "100%",
  },
  amount: {
    width: "40%",
    marginRight: 5,
  },
  units: {
    flexGrow: 1,
  },
};
