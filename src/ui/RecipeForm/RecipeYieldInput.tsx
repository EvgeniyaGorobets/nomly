import React from "react";
import {
  Controller,
  Control,
  FieldError,
  UseFormGetFieldState,
} from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput, Text } from "react-native-paper";

import { Styles } from "../Styles";

import { type RecipeForm, RecipeRules } from "../../core/form";

type RecipeYieldProps = {
  control: Control<RecipeForm>;
  errors:
    | { amount?: FieldError | undefined; units?: FieldError | undefined }
    | undefined;
  getFieldState: UseFormGetFieldState<RecipeForm>;
};

export const RecipeYieldInput = ({
  control,
  errors,
  getFieldState,
}: RecipeYieldProps) => {
  const amountHasError = () => {
    const amountState = getFieldState("yield.amount");
    return amountState.isDirty && amountState.invalid;
  };

  const unitsHaveError = () => {
    const unitsState = getFieldState("yield.units");
    return unitsState.isDirty && unitsState.invalid;
  };

  const showErrorText = () => amountHasError() || unitsHaveError();

  return (
    <View style={YieldStyles.container}>
      <View style={YieldStyles.inputRow}>
        <View style={YieldStyles.titleContainer}>
          <Text variant="titleMedium" style={YieldStyles.title}>
            Recipe Yield:
          </Text>
        </View>
        <Controller
          name="yield.amount"
          control={control}
          rules={RecipeRules.yield.amount}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              label="Amount"
              keyboardType="numeric"
              mode="outlined"
              textAlign="center"
              style={YieldStyles.amountInput}
              accessibilityHint="Recipe yield amount input"
            />
          )}
        ></Controller>
        <Controller
          name="yield.units"
          control={control}
          rules={RecipeRules.yield.units}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              label="Units"
              mode="outlined"
              textAlign="center"
              style={YieldStyles.unitsInput}
              accessibilityHint="Recipe yield units input"
            />
          )}
        ></Controller>
      </View>
      <View>
        {showErrorText() && (
          <HelperText type="error" visible={showErrorText()}>
            {[errors?.amount?.message, errors?.units?.message]
              .join("\n")
              .trim()}
          </HelperText>
        )}
      </View>
    </View>
  );
};

export const MemoizedRecipeYield = React.memo(RecipeYieldInput);

const YieldStyles = {
  container: { marginBottom: 5 },
  inputRow: { ...Styles.row, alignItems: "center", marginBottom: 10 }, // as opposed to the error text row
  titleContainer: {
    ...Styles.row,
    alignItems: "center",
    height: "100%",
    marginRight: 10,
    marginVertical: 10,
  },
  title: { paddingTop: 10 },
  amountInput: { width: "29%", marginHorizontal: 5 },
  unitsInput: { width: "33%" },
};
