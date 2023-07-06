import React, { useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import { Yield } from "../../core/recipe";
import { isNumeric } from "../../core/form";

const getButtonStyle = (selected: number, current: number) => ({
  text: {
    fontSize: "sm",
    fontWeight: selected == current ? "medium" : "normal",
    paddingX: "5px",
    paddingBottom: "2px",
    _light: { color: selected === current ? "light.50" : "light.500" },
    _dark: { color: selected === current ? "light.50" : "light.400" },
  },
  button: {
    _light: {
      backgroundColor: selected == current ? "primary.300" : "light.50",
      borderColor: selected == current ? "primary.400" : "light.500",
    },
    _dark: {
      backgroundColor: selected == current ? "primary.400" : "dark.600",
      borderColor: selected == current ? "primary.300" : "light.400",
    },
    borderWidth: 1,
    borderRadius: 100,
    height: "35px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row" as const, // need to cast as const because of weird type error
    mx: "3px",
  },
});

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
  const [selected, setSelected] = useState<number>(0);
  const [isCustomizable, setCustomizable] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [isBlurred, setBlurred] = useState<boolean>(true);

  const updateYield = (index: number, newAmount: number) => {
    updateIngredients(newAmount);
    setYieldAmount(newAmount.toString());
    setSelected(index);
    setInvalid(false);
    setCustomizable(false);
  };

  const tryToUpdateYield = (newAmount: string) => {
    setYieldAmount(newAmount);
    if (isNumeric(newAmount)) {
      setInvalid(false);
      updateIngredients(Number(newAmount));
    } else {
      setInvalid(true);
    }
  };

  return (
    <View>
      <Text variant="headlineSmall">Recipe Yield:</Text>
      <View>
        <View>
          <TextInput
            value={yieldAmount.toString()}
            disabled={!isCustomizable}
            onChangeText={(text: string) => tryToUpdateYield(text)}
            onFocus={() => setBlurred(false)}
            onBlur={() => setBlurred(true)}
            textAlign="center"
            mode="outlined"
          />
          <Text variant="bodyLarge">{originalYield.units}</Text>
          <Button
            mode="contained-tonal"
            onPress={() => updateYield(0, originalYield.amount)}
          >
            <Text {...getButtonStyle(selected, 0).text}>x1</Text>
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => updateYield(1, originalYield.amount * 2)}
          >
            <Text {...getButtonStyle(selected, 1).text}>x2</Text>
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => updateYield(2, originalYield.amount * 4)}
          >
            <Text {...getButtonStyle(selected, 2).text}>x4</Text>
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => {
              setSelected(3);
              setCustomizable(true);
            }}
          >
            <Text {...getButtonStyle(selected, 3).text}>Custom</Text>
          </Button>
        </View>
        <View>
          <HelperText type="error" visible={isInvalid && isBlurred}>
            Recipe yield must be a number
          </HelperText>
        </View>
      </View>
    </View>
  );
};
