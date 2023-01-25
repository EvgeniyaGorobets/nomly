import React from "react";
import {
  Row,
  Input,
  Column,
  FormControl,
  Select,
  Icon,
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { UNITS, Unit } from "../../core/RecipeBook";
import { RecipeErrors, PotentialIngredient } from "../../core/form";

type IngredientFormProps = {
  errors: RecipeErrors;
  index: number;
  ingredient: PotentialIngredient;
  deleteIngredient: () => void;
  updateIngredient: (ingredient: PotentialIngredient) => void;
};

export const IngredientForm: React.FC<IngredientFormProps> = ({
  errors,
  index,
  ingredient,
  deleteIngredient,
  updateIngredient,
}) => {
  const updateName = (newName: string) => {
    updateIngredient({
      ...ingredient,
      name: newName,
    });
  };

  const updateAmount = (newAmount: string) => {
    updateIngredient({
      ...ingredient,
      amount: newAmount,
    });
  };

  const updateUnits = (newUnits: Unit) => {
    updateIngredient({
      ...ingredient,
      units: newUnits,
    });
  };

  const summarizeErrors = (): { hasError: boolean; errorMessage: string } => {
    return {
      hasError:
        `ingredientAmount-${index}` in errors ||
        `ingredientName-${index}` in errors,
      errorMessage: [
        errors[`ingredientName-${index}`],
        errors[`ingredientAmount-${index}`],
      ]
        .join("\n")
        .trim(),
    };
  };

  return (
    <Column>
      <Row w="100%" alignItems="center">
        <IconButton
          icon={<Icon as={AntDesign} name="close" />}
          onPress={deleteIngredient}
          w="8%"
        />
        <FormControl
          isRequired
          isInvalid={`ingredientName-${index}` in errors}
          w="55%"
        >
          <Column>
            <Input
              value={ingredient.name}
              onChangeText={(text: string) => updateName(text)}
              variant="underlined"
            />
          </Column>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={`ingredientAmount-${index}` in errors}
          w="12%"
        >
          <Column>
            <Input
              value={ingredient.amount}
              onChangeText={(newAmount: string) => updateAmount(newAmount)}
              keyboardType="numeric"
              variant="underlined"
              textAlign="right"
            />
          </Column>
        </FormControl>
        <FormControl isRequired w="25%">
          <Select
            selectedValue={ingredient.units}
            accessibilityLabel="Choose Ingredient Units"
            _selectedItem={{ bg: "teal.600" }}
            onValueChange={(newUnit: string) => updateUnits(newUnit as Unit)}
            borderRadius={0}
            borderTopWidth={0}
            borderLeftWidth={0}
            borderRightWidth={0}
          >
            {UNITS.map((unit: Unit) => (
              <Select.Item label={unit} value={unit} key={unit} />
            ))}
          </Select>
        </FormControl>
      </Row>
      <Row w="100%">
        <FormControl isInvalid={summarizeErrors().hasError}>
          <FormControl.ErrorMessage>
            {summarizeErrors().errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      </Row>
    </Column>
  );
};
