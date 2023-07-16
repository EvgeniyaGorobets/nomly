import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, Text } from "react-native-paper";

import { Styles } from "../Styles";

import {
  onInputChange,
  validateRecipeYieldAmount,
  validateRecipeYieldUnits,
  ParentStateFunctions,
} from "../../core/form";
import type { Yield } from "../../core/recipe";

type RecipeYieldProps = {
  recipeYield: Yield;
  parentAmountFunctions: ParentStateFunctions;
  parentUnitFunctions: ParentStateFunctions;
};

export const RecipeYieldInput = ({
  recipeYield,
  parentAmountFunctions,
  parentUnitFunctions,
}: RecipeYieldProps) => {
  const [amount, setAmount] = useState<string>(recipeYield.amount.toString());
  const [isAmountDirty, setAmountDirty] = useState<boolean>(false);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

  const isAmountInvalid = () => isAmountDirty && amountErrorMsg !== "";
  const onAmountFocus = () => {
    if (!isAmountDirty) {
      setAmountDirty(true);
    }
  };
  const onChangeAmount = (newAmount: string) =>
    onInputChange(
      newAmount,
      validateRecipeYieldAmount,
      { setInput: setAmount, setErrorMsg: setAmountErrorMsg },
      parentAmountFunctions
    );

  const [units, setUnits] = useState<string>(recipeYield.units);
  const [isUnitsDirty, setUnitsDirty] = useState<boolean>(false);
  const [unitsErrorMsg, setUnitsErrorMsg] = useState<string>("");

  const isUnitsInvalid = () => isUnitsDirty && unitsErrorMsg !== "";
  const onUnitsFocus = () => {
    if (!isUnitsDirty) {
      setUnitsDirty(true);
    }
  };
  const onChangeUnits = (newUnits: string) =>
    onInputChange(
      newUnits,
      validateRecipeYieldUnits,
      { setInput: setUnits, setErrorMsg: setUnitsErrorMsg },
      parentUnitFunctions
    );

  const showErrorText = () => isAmountInvalid() || isUnitsInvalid();

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
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="numeric"
          mode="outlined"
          textAlign="center"
          onFocus={onAmountFocus}
          style={{ width: "29%", marginHorizontal: 5 }}
        />
        <TextInput
          label="Units"
          value={units}
          onChangeText={onChangeUnits}
          mode="outlined"
          textAlign="center"
          onFocus={onUnitsFocus}
          style={{ width: "33%" }}
        />
      </View>
      <View>
        {showErrorText() && (
          <HelperText type="error" visible={showErrorText()}>
            {[amountErrorMsg, unitsErrorMsg].join("\n").trim()}
          </HelperText>
        )}
      </View>
    </View>
  );
};
