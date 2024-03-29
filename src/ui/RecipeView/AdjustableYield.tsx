import React, { useState } from "react";
import { View } from "react-native";
import {
  HelperText,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

import { Styles } from "../Styles";

import type { Yield } from "../../core/recipe-yield";
import { validateRecipeYieldAmount } from "../../core/recipe-yield";

type AdjustableYieldProps = {
  originalYield: Yield;
  updateIngredients: (yieldAmount: number) => void;
};

export const AdjustableYield = ({
  originalYield,
  updateIngredients,
}: AdjustableYieldProps) => {
  const [yieldAmount, setYieldAmount] = useState<string>(
    originalYield.amount.toString()
  );
  const [selected, setSelected] = useState<string>("1");
  const [isCustomizable, setCustomizable] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const toggleYield = (value: string) => {
    setSelected(value);

    if (value === "custom") {
      setCustomizable(true);
    } else {
      // Turn off the custom yield input field
      setCustomizable(false);
      setInvalid(false);

      // Programatically modify the yield input and update ingredient amounts
      const newYieldAmount: number = originalYield.amount * Number(value);
      setYieldAmount(newYieldAmount.toString());
      updateIngredients(newYieldAmount);
    }
  };

  const onYieldChange = (newAmount: string) => {
    setYieldAmount(newAmount);

    const errorMessage: string = validateRecipeYieldAmount(newAmount);
    setInvalid(errorMessage !== "");
    setErrorMsg(errorMessage);

    if (errorMessage === "") {
      updateIngredients(Number(newAmount));
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <View
        style={{
          ...Styles.row,
          alignItems: "flex-end",
          marginBottom: 10,
        }}
      >
        <Text variant="titleLarge" style={{ width: "50%", paddingBottom: 3 }}>
          Recipe Yield:
        </Text>
        <TextInput
          value={yieldAmount.toString()}
          editable={isCustomizable}
          error={isInvalid}
          onChangeText={onYieldChange}
          textAlign="center"
          mode="outlined"
          style={{
            textAlign: "center",
            width: "15%",
            marginRight: 15,
            fontSize: 20,
            height: 33,
          }}
          outlineStyle={{ borderWidth: isCustomizable ? 1 : 0 }}
        />
        <Text variant="titleLarge" style={{ paddingBottom: 3 }}>
          {originalYield.units}
        </Text>
      </View>
      <View style={Styles.row}>
        <SegmentedButtons
          value={selected}
          onValueChange={toggleYield}
          buttons={[
            {
              value: "1",
              label: "x1",
            },
            {
              value: "2",
              label: "x2",
            },
            {
              value: "4",
              label: "x4",
            },
            {
              value: "custom",
              label: "Custom",
            },
          ]}
          style={{ width: "100%" }}
        />
      </View>
      <View>
        {isInvalid && (
          <HelperText type="error" visible={isInvalid}>
            {errorMsg}
          </HelperText>
        )}
      </View>
    </View>
  );
};
