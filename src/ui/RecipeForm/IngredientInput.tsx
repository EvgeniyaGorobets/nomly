import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, IconButton } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { Styles } from "../Styles";

import type { Unit, Ingredient } from "../../core/ingredient";
import {
  UNITS,
  validateIngredientName,
  validateIngredientAmount,
} from "../../core/ingredient";

type IngredientInputProps = {
  ingredient: Ingredient;
  deleteIngredient: () => void;
  setIngredient: (ingredient: Ingredient) => void;
  setIngredientNameError: (hasErr: boolean) => void;
  setIngredientAmountError: (hasErr: boolean) => void;
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  deleteIngredient,
  setIngredient,
  setIngredientNameError,
  setIngredientAmountError,
}) => {
  /* State and callbacs for the ingredient name input */
  const [ingredientName, setIngredientName] = useState<string>(ingredient.name);
  const [isNameDirty, setNameDirty] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");

  const isNameInvalid = () => isNameDirty && nameErrorMsg !== "";

  const onChangeName = (newName: string) => {
    // Update local state
    setIngredientName(newName);
    if (!isNameDirty) {
      setNameDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage: string = validateIngredientName(newName);
    setNameErrorMsg(errorMessage);
    setIngredientNameError(errorMessage !== "");

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setIngredient({ ...ingredient, name: newName });
    }
  };
  /* End of ingredient name */

  /* State and callbacs for the ingredient amount input */
  const [ingredientAmount, setIngredientAmount] = useState<string>(
    ingredient.amount.toString()
  );
  const [isAmountDirty, setAmountDirty] = useState<boolean>(false);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

  const isAmountInvalid = () => isAmountDirty && amountErrorMsg !== "";

  const onChangeAmount = (newAmount: string) => {
    // Update local state
    setIngredientAmount(newAmount);
    if (!isAmountDirty) {
      setAmountDirty(true);
    }

    // Update error state locally and in parent
    const errorMessage: string = validateIngredientAmount(newAmount);
    setAmountErrorMsg(errorMessage);
    setIngredientAmountError(errorMessage !== "");

    // Update parent state only if input is valid
    if (errorMessage === "") {
      setIngredient({ ...ingredient, amount: Number(newAmount) });
    }
  };
  /* End of ingredient amount */

  /* State and callbacks for the ingredient units dropdown */
  const [showDropDown, setShowDropDown] = useState(false);

  const updateUnits = (newUnits: Unit) => {
    setIngredient({ ...ingredient, units: newUnits });
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
            value={ingredientName}
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
              value={ingredientAmount}
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
              setValue={(_value: Unit) => updateUnits(_value)}
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
