import React from "react";
import { Control, useFormState } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

import { Styles } from "../Styles";

import type { RecipeForm } from "../../core/form";

type IngredientErrorProps = {
  index: number;
  control: Control<RecipeForm>;
};

export const IngredientError: React.FC<IngredientErrorProps> = ({
  index,
  control,
}) => {
  const { dirtyFields, errors } = useFormState<RecipeForm>({
    control,
    name: [`ingredients.${index}.name`, `ingredients.${index}.amount`],
  });

  const isNameInvalid = () =>
    dirtyFields.ingredients?.[index]?.name &&
    !!errors.ingredients?.[index]?.name;

  const isAmountInvalid = () =>
    dirtyFields.ingredients?.[index]?.amount &&
    !!errors.ingredients?.[index]?.amount;

  const isIngredientInvalid = () => isNameInvalid() || isAmountInvalid();

  return (
    <View style={Styles.row}>
      {isIngredientInvalid() && (
        <HelperText
          type="error"
          visible={isIngredientInvalid()}
          style={{ paddingLeft: 0 }}
        >
          {[
            errors.ingredients?.[index]?.name?.message,
            errors.ingredients?.[index]?.amount?.message,
          ]
            .join("\n")
            .trim()}
        </HelperText>
      )}
    </View>
  );
};
