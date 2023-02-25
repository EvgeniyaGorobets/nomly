import React, { useContext, useState } from "react";
import {
  Center,
  Row,
  ScrollView,
  Column,
  Heading,
  Text,
  Icon,
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import type { RecipeScreenProps } from "../../Stack";
import type { Ingredient, Recipe } from "../../core/recipe";
import { AppContext, AppContextType } from "../../AppContext";
import { Header } from "../generic/Header";
import { AdjustableYield } from "./AdjustableYield";
import {
  adjustIngredientAmounts,
  formatIngredientAmount,
} from "../../core/ingredient-amounts";
import { RecipeMenu } from "./RecipeMenu";

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
      <Header
        navigation={navigation}
        title={route.params.recipeName}
        rightComponent={
          <Row flexGrow={0} flexShrink={0} justifyContent="flex-end" margin={0}>
            <IconButton
              onPress={() => {
                navigation.navigate("Form", {
                  recipeName: route.params.recipeName,
                });
              }}
              padding="5px"
              icon={
                <Icon
                  as={AntDesign}
                  name="edit"
                  size="lg"
                  _light={{ color: "light.50" }}
                />
              }
            />
            <RecipeMenu recipeName={route.params.recipeName} />
          </Row>
        }
      />
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
