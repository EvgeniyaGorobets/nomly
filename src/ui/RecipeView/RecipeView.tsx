import React, { ReactElement, useContext, useState } from "react";
import {
  Center,
  IconButton,
  Row,
  Icon,
  ScrollView,
  Column,
  Heading,
  Text,
  Pressable,
  Box,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { RecipeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { Ingredient, Recipe } from "../../core/recipe";
import { getSafePadding } from "../helpers";
import { adjustIngredientAmounts } from "../../core/yield";

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" size="md" />;

export const RecipeView = ({ navigation, route }: RecipeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const recipe: Recipe = context.recipes[route.params.recipeName];
  const insets: EdgeInsets = useSafeAreaInsets();

  const [yieldAmount, setYieldAmount] = useState<number>(recipe.yield.amount);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients
  );

  const adjustRecipe = (newYield: number) => {
    setYieldAmount(newYield);
    setIngredients(
      adjustIngredientAmounts(recipe.ingredients, recipe.yield.amount, newYield)
    );
  };

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
      padding={getSafePadding(insets)}
    >
      <Row
        w="100%"
        justifyContent="space-between"
        my="15px"
        alignItems="center"
      >
        <Heading size="lg">{route.params.recipeName}</Heading>
        <IconButton icon={CloseIcon} onPress={() => navigation.goBack()} />
      </Row>
      <ScrollView w="100%">
        <Row>
          <Text>
            Recipe Yield: {yieldAmount} {recipe.yield.units}
          </Text>
          <Box flexGrow={1}></Box>
          <Pressable onPress={() => adjustRecipe(recipe.yield.amount)}>
            <Box
              backgroundColor="blueGray.900"
              borderRadius={100}
              width="30px"
              height="30px"
              alignItems="center"
              mx="3px"
            >
              <Text color="white">x1</Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => adjustRecipe(recipe.yield.amount * 2)}>
            <Box
              backgroundColor="blueGray.900"
              borderRadius={100}
              width="30px"
              height="30px"
              alignItems="center"
              mx="3px"
            >
              <Text color="white">x2</Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => adjustRecipe(recipe.yield.amount * 3)}>
            <Box
              backgroundColor="blueGray.900"
              borderRadius={100}
              width="30px"
              height="30px"
              alignItems="center"
              mx="3px"
            >
              <Text color="white">x3</Text>
            </Box>
          </Pressable>
        </Row>
        <Column>
          <Heading size="md">Ingredients</Heading>
          {ingredients.map((ingredient: Ingredient, i: number) => (
            <Row key={i}>
              <Text>
                {ingredient.amount} {ingredient.units} {ingredient.name}
              </Text>
            </Row>
          ))}
        </Column>
        <Column>
          <Heading size="md">Notes</Heading>
          <Text>{recipe.notes}</Text>
        </Column>
      </ScrollView>
    </Center>
  );
};
