import React, { useState } from "react";
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

import { UNITS, Unit, Ingredient } from "../../core/recipe";
import {
  onInputChange,
  validateIngredientName,
  validateIngredientAmount,
} from "../../core/form";

type IngredientInputProps = {
  ingredient: Ingredient;
  deleteIngredient: () => void;
  updateIngredient: (ingredient: Ingredient) => void;
  setIngredientNameError: (hasErr: boolean) => void;
  setIngredientAmountError: (hasErr: boolean) => void;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  deleteIngredient,
  updateIngredient,
  setIngredientNameError,
  setIngredientAmountError,
}) => {
  // Variables and functions to keep track of ingredient name
  const [ingredientName, setIngredientName] = useState<string>(ingredient.name);
  const [isNameDirty, setNameDirty] = useState<boolean>(false);
  const [isNameBlurred, setNameBlurred] = useState<boolean>(true);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");

  const isNameInvalid = () =>
    isNameDirty && isNameBlurred && nameErrorMsg !== "";

  const updateName = (newName: string) => {
    updateIngredient({
      ...ingredient,
      name: newName,
    });
  };

  const onNameFocus = () => {
    if (!isNameDirty) {
      setNameDirty(true);
    }
    setNameBlurred(false);
  };

  const onChangeName = (newName: string) =>
    onInputChange(
      newName,
      validateIngredientName,
      { setInput: setIngredientName, setErrorMsg: setNameErrorMsg },
      { updateValue: updateName, updateErrors: setIngredientNameError }
    );

  // variables and functions to keep track of ingredient amount
  const [ingredientAmount, setIngredientAmount] = useState<string>(
    ingredient.amount.toString()
  );
  const [isAmountDirty, setAmountDirty] = useState<boolean>(false);
  const [isAmountBlurred, setAmountBlurred] = useState<boolean>(true);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

  const isAmountInvalid = () =>
    isAmountDirty && isAmountBlurred && amountErrorMsg !== "";

  const updateAmount = (newAmount: string) => {
    updateIngredient({
      ...ingredient,
      amount: Number(newAmount),
    });
  };

  const onAmountFocus = () => {
    if (!isAmountDirty) {
      setAmountDirty(true);
    }
    setAmountBlurred(false);
  };

  const onChangeAmount = (newAmount: string) =>
    onInputChange(
      newAmount,
      validateIngredientAmount,
      { setInput: setIngredientAmount, setErrorMsg: setAmountErrorMsg },
      { updateValue: updateAmount, updateErrors: setIngredientAmountError }
    );

  // Function to keep track of ingredient units
  const updateUnits = (newUnits: Unit) => {
    updateIngredient({
      ...ingredient,
      units: newUnits,
    });
  };

  return (
    <Column>
      <Row w="100%" alignItems="center">
        <IconButton
          icon={
            <Icon
              as={AntDesign}
              name="close"
              _light={{ color: "error.400" }}
              _dark={{ color: "error.400" }}
            />
          }
          onPress={deleteIngredient}
          w="8%"
        />
        <FormControl isRequired isInvalid={isNameInvalid()} w="52%">
          <Column>
            <Input
              value={ingredientName}
              onChangeText={onChangeName}
              variant="underlined"
              placeholder="Ingredient name"
              onFocus={onNameFocus}
              onBlur={() => setNameBlurred(true)}
            />
          </Column>
        </FormControl>
        <FormControl isRequired isInvalid={isAmountInvalid()} w="10%">
          <Column>
            <Input
              value={ingredientAmount}
              onChangeText={onChangeAmount}
              keyboardType="numeric"
              variant="underlined"
              textAlign="right"
              onFocus={onAmountFocus}
              onBlur={() => setAmountBlurred(true)}
            />
          </Column>
        </FormControl>
        <FormControl isRequired w="30%">
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
        <FormControl isInvalid={isNameInvalid() || isAmountInvalid()}>
          <FormControl.ErrorMessage>
            {[nameErrorMsg, amountErrorMsg].join("\n").trim()}
          </FormControl.ErrorMessage>
        </FormControl>
      </Row>
    </Column>
  );
};
