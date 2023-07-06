import React, { useState } from "react";
import { View } from "react-native";
import { Input, Column, FormControl, Row, Heading } from "native-base";
import { TextInput, Text } from "react-native-paper";

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
  const [isAmountBlurred, setAmountBlurred] = useState<boolean>(true);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

  const isAmountInvalid = () =>
    isAmountDirty && isAmountBlurred && amountErrorMsg !== "";

  const onAmountFocus = () => {
    if (!isAmountDirty) {
      setAmountDirty(true);
    }
    setAmountBlurred(false);
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
  const [isUnitsBlurred, setUnitsBlurred] = useState<boolean>(true);
  const [unitsErrorMsg, setUnitsErrorMsg] = useState<string>("");

  const isUnitsInvalid = () =>
    isUnitsDirty && isUnitsBlurred && unitsErrorMsg !== "";

  const onUnitsFocus = () => {
    if (!isUnitsDirty) {
      setUnitsDirty(true);
    }
    setUnitsBlurred(false);
  };

  const onChangeUnits = (newUnits: string) =>
    onInputChange(
      newUnits,
      validateRecipeYieldUnits,
      { setInput: setUnits, setErrorMsg: setUnitsErrorMsg },
      parentUnitFunctions
    );

  return (
    <View>
      <View>
        <Text variant="headlineSmall">Recipe Yield</Text>
        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="numeric"
          mode="outlined"
          textAlign="center"
          onFocus={onAmountFocus}
          onBlur={() => setAmountBlurred(true)}
        />
        <TextInput
          value={units}
          onChangeText={onChangeUnits}
          mode="outlined"
          textAlign="center"
          onFocus={onUnitsFocus}
          onBlur={() => setUnitsBlurred(true)}
        />
      </View>
      <View>
        <FormControl
          isRequired
          isInvalid={isAmountInvalid() || isUnitsInvalid()}
        >
          <FormControl.ErrorMessage>
            {[amountErrorMsg, unitsErrorMsg].join("\n").trim()}
          </FormControl.ErrorMessage>
        </FormControl>
      </View>
    </View>
  );
};
