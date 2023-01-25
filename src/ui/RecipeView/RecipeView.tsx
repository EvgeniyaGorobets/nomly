import React, { ReactElement, useContext } from "react";
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

import type { RecipeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { Ingredient, Recipe } from "../../core/RecipeBook";

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" />;
const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

export const RecipeView = ({ navigation, route }: RecipeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const recipe: Recipe = context.recipes[route.params.recipeName];

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <Row w="100%" justifyContent="start" my="15px">
        <IconButton icon={CloseIcon} onPress={() => navigation.goBack()} />
        <Heading>{route.params.recipeName}</Heading>
      </Row>
      <ScrollView w="100%">
        <Row>
          <Text>
            Recipe Yield: {recipe.yield.amount} {recipe.yield.units}
          </Text>
        </Row>
        <Column>
          <Heading size="md">Ingredients</Heading>
          {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
            <Row key={i}>
              <Text>
                {ingredient.amount} {ingredient.units} {ingredient.name}
              </Text>
            </Row>
          ))}
        </Column>
      </ScrollView>
    </Center>
  );
};
