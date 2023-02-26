import React, { useState } from "react";
import { Input, Column, FormControl, Row, Heading } from "native-base";

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

  const onChangeUnits = (newUnits: string) =>
    onInputChange(
      newUnits,
      validateRecipeYieldUnits,
      { setInput: setUnits, setErrorMsg: setUnitsErrorMsg },
      parentUnitFunctions
    );

  return (
    <Column>
      <Row alignItems="center" w="100%" paddingY="5px">
        <Heading size="md" w="55%">
          Recipe Yield
        </Heading>
        <FormControl isRequired isInvalid={isAmountInvalid()} w="15%">
          <Input
            value={amount}
            onChangeText={onChangeAmount}
            keyboardType="numeric"
            variant="underlined"
            textAlign="center"
            onFocus={() => {
              if (!isAmountDirty) {
                setAmountDirty(true);
              }
              setAmountBlurred(false);
            }}
            onBlur={() => setAmountBlurred(true)}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isUnitsInvalid()} w="30%">
          <Input
            value={units}
            onChangeText={onChangeUnits}
            variant="underlined"
            textAlign="center"
            marginLeft="5px"
            onFocus={() => {
              if (!isUnitsDirty) {
                setUnitsDirty(true);
              }
              setUnitsBlurred(false);
            }}
            onBlur={() => setUnitsBlurred(true)}
          />
        </FormControl>
      </Row>
      <Row w="100%">
        <FormControl
          isRequired
          isInvalid={isAmountInvalid() || isUnitsInvalid()}
        >
          <FormControl.ErrorMessage>
            {[amountErrorMsg, unitsErrorMsg].join("\n").trim()}
          </FormControl.ErrorMessage>
        </FormControl>
      </Row>
    </Column>
  );
};
