import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, IconButton } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { Styles } from "../Styles";

import type { Unit, Ingredient } from "../../core/recipe";
import { UNITS } from "../../core/recipe";
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

  const [showDropDown, setShowDropDown] = useState(false);

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
    <View style={{ ...Styles.row, marginVertical: 10 }}>
      <View
        style={{
          ...Styles.column,
          width: "10%",
          alignItems: "flex-end",
        }}
      >
        <IconButton
          icon="close"
          onPress={deleteIngredient}
          style={{ paddingTop: 5 }}
        />
      </View>
      <View
        style={{
          ...Styles.column,
          width: "90%",
        }}
      >
        <View style={{ ...Styles.row, marginBottom: 5 }}>
          <TextInput
            label="Ingredient Name"
            value={ingredientName}
            onChangeText={onChangeName}
            mode="outlined"
            placeholder="Ingredient name"
            onFocus={onNameFocus}
            onBlur={() => setNameBlurred(true)}
            style={{ width: "100%" }}
          />
        </View>
        <View style={Styles.row}>
          <View style={{ width: "40%", marginRight: 5 }}>
            <TextInput
              label="Amount"
              value={ingredientAmount}
              onChangeText={onChangeAmount}
              keyboardType="numeric"
              mode="outlined"
              textAlign="right"
              onFocus={onAmountFocus}
              onBlur={() => setAmountBlurred(true)}
            />
          </View>
          <View style={{ flexGrow: 1 }}>
            <DropDown
              label="Units"
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={ingredient.units}
              setValue={(_value: Unit) => updateUnits(_value)}
              list={UNITS.map((unit: Unit) => {
                return { label: unit, value: unit };
              })}
            />
          </View>
        </View>
      </View>
      <View>
        <HelperText type="error" visible={isNameInvalid() || isAmountInvalid()}>
          {[nameErrorMsg, amountErrorMsg].join("\n").trim()}
        </HelperText>
      </View>
    </View>
  );
};
