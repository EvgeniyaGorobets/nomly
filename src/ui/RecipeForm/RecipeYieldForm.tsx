import React from "react";
import { Input, Column, FormControl, Row, Heading } from "native-base";

import { PotentialYield, RecipeErrors } from "../../core/form";

type RecipeYieldProps = {
  errors: RecipeErrors;
  recipeYield: PotentialYield;
  setRecipeYield: (newYield: PotentialYield) => void;
};

export const RecipeYieldForm: React.FC<RecipeYieldProps> = ({
  errors,
  recipeYield,
  setRecipeYield,
}) => {
  const setYieldAmount = (newAmount: string) => {
    setRecipeYield({
      ...recipeYield,
      amount: newAmount,
    });
  };

  const setYieldUnits = (newUnits: string) => {
    setRecipeYield({
      ...recipeYield,
      units: newUnits,
    });
  };

  const summarizeErrors = (): { hasError: boolean; errorMessage: string } => {
    return {
      hasError: "yieldAmount" in errors || "yieldUnits" in errors,
      errorMessage: [errors.yieldAmount, errors.yieldUnits].join("\n").trim(),
    };
  };

  return (
    <Column>
      <Row alignItems="center" w="100%" paddingY="5px">
        <Heading size="md" w="55%">
          Recipe Yield
        </Heading>
        <FormControl isRequired isInvalid={"yieldAmount" in errors} w="15%">
          <Input
            value={recipeYield.amount}
            keyboardType="numeric"
            onChangeText={(text: string) => setYieldAmount(text)}
            variant="underlined"
          />
        </FormControl>
        <FormControl isRequired isInvalid={"yieldUnits" in errors} w="30%">
          <Input
            value={recipeYield.units}
            onChangeText={(text: string) => setYieldUnits(text)}
            variant="underlined"
          />
        </FormControl>
      </Row>
      <Row w="100%">
        <FormControl isRequired isInvalid={summarizeErrors().hasError}>
          <FormControl.ErrorMessage>
            {summarizeErrors().errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      </Row>
    </Column>
  );
};
