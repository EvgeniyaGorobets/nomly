import React, { useContext, useState } from "react";
import { Center, Row, ScrollView, Column, Heading, Text } from "native-base";

import type { RecipeScreenProps } from "../../Stack";
import type { Ingredient, Recipe } from "../../core/recipe";
import { AppContext, AppContextType } from "../../AppContext";
import { Header } from "../generic/Header";
import { AdjustableYield } from "./AdjustableYield";
import {
  adjustIngredientAmounts,
  formatIngredientAmount,
} from "../../core/ingredient-amounts";

export const RecipeView = ({ navigation, route }: RecipeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const recipe: Recipe = context.recipes[route.params.recipeName];

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients
  );

  const updateIngredients = (newYield: number) => {
    setIngredients(
      adjustIngredientAmounts(recipe.ingredients, recipe.yield.amount, newYield)
    );
  };

  return (
    <Center>
      <Header navigation={navigation} title={route.params.recipeName} />
      <ScrollView w="100%" px={4}>
        <AdjustableYield
          originalYield={recipe.yield}
          updateIngredients={updateIngredients}
        />
        <Column paddingY="15px" borderBottomWidth={1}>
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
          <Heading marginBottom="5px" size="md">
            Notes
          </Heading>
          <Text>{recipe.notes}</Text>
        </Column>
      </ScrollView>
    </Center>
  );
};
