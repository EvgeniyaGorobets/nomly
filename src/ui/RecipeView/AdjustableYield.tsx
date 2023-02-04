import React, { useState } from "react";
import {
  Row,
  Text,
  Pressable,
  Box,
  Column,
  Input,
  FormControl,
  Heading,
} from "native-base";

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
    <Column paddingY="15px" borderBottomWidth={1}>
      <Heading size="md">Recipe Yield:</Heading>
      <FormControl isInvalid={isInvalid && isBlurred}>
        <Column>
          <Row width="100%" alignItems="center">
            <Input
              value={yieldAmount.toString()}
              isDisabled={!isCustomizable}
              onChangeText={(text: string) => tryToUpdateYield(text)}
              onFocus={() => setBlurred(false)}
              onBlur={() => setBlurred(true)}
              width="15%"
              textAlign="center"
            />
            <Text width="30%" px="5px">
              {originalYield.units}
            </Text>
            <Pressable onPress={() => updateYield(0, originalYield.amount)}>
              <Box {...getButtonStyle(selected, 0).button} width="35px">
                <Text {...getButtonStyle(selected, 0).text}>x1</Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => updateYield(1, originalYield.amount * 2)}>
              <Box {...getButtonStyle(selected, 1).button} width="35px">
                <Text {...getButtonStyle(selected, 1).text}>x2</Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => updateYield(2, originalYield.amount * 4)}>
              <Box {...getButtonStyle(selected, 2).button} width="35px">
                <Text {...getButtonStyle(selected, 2).text}>x4</Text>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelected(3);
                setCustomizable(true);
              }}
            >
              <Box {...getButtonStyle(selected, 3).button}>
                <Text {...getButtonStyle(selected, 3).text}>Custom</Text>
              </Box>
            </Pressable>
          </Row>
          <Row width="100%">
            <FormControl.ErrorMessage>
              Recipe yield must be a number
            </FormControl.ErrorMessage>
          </Row>
        </Column>
      </FormControl>
    </Column>
  );
};
