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
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { RecipeScreenProps } from "../../Stack";
import type { Ingredient, Recipe } from "../../core/recipe";
import { AppContext, AppContextType } from "../../AppContext";
import { getSafePadding } from "../theme";
import { AdjustableYield } from "./AdjustableYield";
import {
  adjustIngredientAmounts,
  formatIngredientAmount,
} from "../../core/ingredient-amounts";

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" size="md" />;

export const RecipeView = ({ navigation, route }: RecipeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const recipe: Recipe = context.recipes[route.params.recipeName];
  const insets: EdgeInsets = useSafeAreaInsets();

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients
  );

  const updateIngredients = (newYield: number) => {
    setIngredients(
      adjustIngredientAmounts(recipe.ingredients, recipe.yield.amount, newYield)
    );
  };

  return (
    <Center padding={getSafePadding(insets)}>
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
        <AdjustableYield
          originalYield={recipe.yield}
          updateIngredients={updateIngredients}
        />
        <Column paddingY="15px" borderBottomWidth={1} borderColor="gray.300">
          <Heading size="md">Ingredients</Heading>
          <Row>
            <Column paddingRight="15px">
              {ingredients.map((ingredient: Ingredient, i: number) => (
                <Row key={i}>
                  <Text>
                    {formatIngredientAmount(ingredient, context.fractionMode)}
                  </Text>
                </Row>
              ))}
            </Column>
            <Column>
              {ingredients.map((ingredient: Ingredient, i: number) => (
                <Row key={i}>
                  <Text>{ingredient.name}</Text>
                </Row>
              ))}
            </Column>
          </Row>
        </Column>
        <Column paddingY="15px">
          <Heading size="md">Notes</Heading>
          <Text>{recipe.notes}</Text>
        </Column>
      </ScrollView>
    </Center>
  );
};
