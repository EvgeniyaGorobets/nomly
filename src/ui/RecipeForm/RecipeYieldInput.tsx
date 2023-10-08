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

import type { RecipeForm } from "../../core/form";

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
    <View style={{ marginBottom: 5 }}>
      <View
        style={{
          ...Styles.row,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            ...Styles.row,
            alignItems: "center",
            height: "100%",
            marginRight: 10,
            marginVertical: 10,
          }}
        >
          <Text variant="titleMedium" style={{ paddingTop: 10 }}>
            Recipe Yield:
          </Text>
        </View>
        <Controller
          name="yield.amount"
          control={control}
          rules={{
            required: "Recipe yield is required",
            min: {
              value: 0.001,
              message: "Recipe yield must be greater than zero",
            },
            pattern: {
              value: /^[0-9]*(\.[0-9]+)?$/,
              message: "Recipe yield must be a number",
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
              textAlign="center"
              style={{ width: "29%", marginHorizontal: 5 }}
              accessibilityHint="Recipe yield amount input"
            />
          )}
        ></Controller>
        <Controller
          name="yield.units"
          control={control}
          rules={{
            required: "Recipe yield is required",
            maxLength: {
              value: 25,
              message: "Recipe yield units cannot be longer than 25 characters",
            },
          }}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              label="Units"
              mode="outlined"
              textAlign="center"
              style={{ width: "33%" }}
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
