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
    <Column>
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
              width="20%"
              textAlign="center"
              variant="underlined"
            />
            <Text width="30%" px="5px">
              {originalYield.units}
            </Text>

            <Pressable onPress={() => updateYield(0, originalYield.amount)}>
              <Box
                backgroundColor={selected == 0 ? "blueGray.900" : "white"}
                borderWidth={1}
                borderColor="blueGray.900"
                borderRadius={100}
                width="30px"
                height="30px"
                alignItems="center"
                mx="3px"
              >
                <Text
                  fontSize="sm"
                  color={selected == 0 ? "white" : "blueGray.900"}
                >
                  x1
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => updateYield(1, originalYield.amount * 2)}>
              <Box
                backgroundColor={selected == 1 ? "blueGray.900" : "white"}
                borderWidth={1}
                borderColor="blueGray.900"
                borderRadius={100}
                width="30px"
                height="30px"
                alignItems="center"
                mx="3px"
              >
                <Text
                  fontSize="sm"
                  color={selected == 1 ? "white" : "blueGray.900"}
                >
                  x2
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => updateYield(2, originalYield.amount * 3)}>
              <Box
                backgroundColor={selected == 2 ? "blueGray.900" : "white"}
                borderWidth={1}
                borderColor="blueGray.900"
                borderRadius={100}
                width="30px"
                height="30px"
                alignItems="center"
                mx="3px"
              >
                <Text
                  fontSize="sm"
                  color={selected == 2 ? "white" : "blueGray.900"}
                >
                  x3
                </Text>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelected(3);
                setCustomizable(true);
              }}
            >
              <Box
                backgroundColor={selected == 3 ? "blueGray.900" : "white"}
                borderWidth={1}
                borderColor="blueGray.900"
                borderRadius={100}
                height="30px"
                alignItems="center"
                mx="3px"
              >
                <Text
                  px="3px"
                  fontSize="sm"
                  color={selected == 3 ? "white" : "blueGray.900"}
                >
                  Custom
                </Text>
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
