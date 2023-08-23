import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, Text } from "react-native-paper";

import { Styles } from "../Styles";

import {
  validateRecipeYieldAmount,
  validateRecipeYieldUnits,
} from "../../core/recipe-yield";
import type { Yield } from "../../core/recipe-yield";

type RecipeYieldProps = {
  recipeYield: Yield;
  setYieldAmount: (newAmount: number) => void;
  setYieldUnits: (newUnits: string) => void;
  setYieldAmountErrors: (hasErr: boolean) => void;
  setYieldUnitsErrors: (hasErr: boolean) => void;
};

export const RecipeYieldInput = ({
  recipeYield,
  setYieldAmount,
  setYieldUnits,
  setYieldAmountErrors,
  setYieldUnitsErrors,
}: RecipeYieldProps) => {
  /* State and callbacks for yield amount input */
  const [amount, setAmount] = useState<string>(recipeYield.amount.toString());
  const [isAmountDirty, setAmountDirty] = useState<boolean>(false);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

  const isAmountInvalid = () => isAmountDirty && amountErrorMsg !== "";

  const onChangeAmount = (newAmount: string) => {
    // Update local state
    setAmount(newAmount);
    if (!isAmountDirty) {
      setAmountDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage: string = validateRecipeYieldAmount(newAmount);
    setAmountErrorMsg(errorMessage);
    setYieldAmountErrors(errorMessage !== "");

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setYieldAmount(Number(newAmount));
    }
  };
  /* End of yield amount */

  /* State and callbacks for yield units input */
  const [units, setUnits] = useState<string>(recipeYield.units);
  const [isUnitsDirty, setUnitsDirty] = useState<boolean>(false);
  const [unitsErrorMsg, setUnitsErrorMsg] = useState<string>("");

  const isUnitsInvalid = () => isUnitsDirty && unitsErrorMsg !== "";

  const onChangeUnits = (newUnits: string) => {
    // Update local state
    setUnits(newUnits);
    if (!isUnitsDirty) {
      setUnitsDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage: string = validateRecipeYieldUnits(newUnits);
    setUnitsErrorMsg(errorMessage);
    setYieldUnitsErrors(errorMessage !== "");

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setYieldUnits(newUnits);
    }
  };

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
          style={{ width: "29%", marginHorizontal: 5 }}
          accessibilityHint="Recipe yield amount input"
        />
        <TextInput
          label="Units"
          value={units}
          onChangeText={onChangeUnits}
          mode="outlined"
          textAlign="center"
          style={{ width: "33%" }}
          accessibilityHint="Recipe yield units input"
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
