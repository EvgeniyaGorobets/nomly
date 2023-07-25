import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, IconButton } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { Styles } from "../Styles";

import { type Ingredient, type Unit } from "../../core/ingredient";
import {
  UNITS,
  validateIngredientName,
  validateIngredientAmount,
} from "../../core/ingredient";
import { IngredientErrors } from "../../core/recipe-errors";

type IngredientInputProps = {
  ingredient: Ingredient;
  deleteIngredient: () => void;
  setIngredient: (callback: (prevIngredient: Ingredient) => Ingredient) => void;
  setIngredientError: (
    callback: (prevErrors: IngredientErrors) => IngredientErrors
  ) => void;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  deleteIngredient,
  setIngredient,
  setIngredientError,
}) => {
  /* State and callbacs for the ingredient name input */
  const [name, setName] = useState<string>(ingredient.name);
  const [isNameDirty, setNameDirty] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");

  const isNameInvalid = () => isNameDirty && nameErrorMsg !== "";

  const onChangeName = (newName: string) => {
    // Update local state
    setName(newName);
    if (!isNameDirty) {
      setNameDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage: string = validateIngredientName(newName);
    setNameErrorMsg(errorMessage);
    setIngredientError((prevErrors: IngredientErrors) => {
      return { ...prevErrors, name: errorMessage !== "" };
    });

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setIngredient((prevIngredient: Ingredient) => {
        return { ...prevIngredient, name: newName };
      });
    }
  };
  /* End of ingredient name */

  /* State and callbacks for the ingredient amount input */
  const [amount, setAmount] = useState<string>(ingredient.amount.toString());
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
    const errorMessage: string = validateIngredientAmount(newAmount);
    setAmountErrorMsg(errorMessage);
    setIngredientError((prevErrors: IngredientErrors) => {
      return { ...prevErrors, amount: errorMessage !== "" };
    });

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setIngredient((prevIngredient: Ingredient) => {
        return { ...prevIngredient, amount: Number(newAmount) };
      });
    }
  };
  /* End of ingredient amount */

  /* State and callbacks for the ingredient units dropdown */
  const [showDropDown, setShowDropDown] = useState(false);

  const onChangeUnits = (newUnits: Unit) => {
    setIngredient((prevIngredient: Ingredient) => {
      return { ...prevIngredient, units: newUnits };
    });
  };
  /* End of ingredient units */

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
          accessibilityHint={`Delete ${ingredient.name} from ingredients`}
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
            value={name}
            onChangeText={onChangeName}
            mode="outlined"
            placeholder="Ingredient name"
            style={{ width: "100%" }}
          />
        </View>
        <View style={Styles.row}>
          <View style={{ width: "40%", marginRight: 5 }}>
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={onChangeAmount}
              keyboardType="numeric"
              mode="outlined"
              textAlign="right"
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
              setValue={(_value: Unit) => onChangeUnits(_value)}
              list={UNITS.map((unit: Unit) => {
                return { label: unit, value: unit };
              })}
            />
          </View>
        </View>
        <View style={Styles.row}>
          {(isNameInvalid() || isAmountInvalid()) && (
            <HelperText
              type="error"
              visible={isNameInvalid() || isAmountInvalid()}
              style={{ paddingLeft: 0 }}
            >
              {[nameErrorMsg, amountErrorMsg].join("\n").trim()}
            </HelperText>
          )}
        </View>
      </View>
    </View>
  );
};
