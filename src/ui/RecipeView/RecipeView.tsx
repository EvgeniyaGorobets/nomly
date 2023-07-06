import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { IconButton, List, Text } from "react-native-paper";

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
    <View>
      <Header
        navigation={navigation}
        title={route.params.recipeName}
        rightComponent={
          <View>
            <IconButton
              onPress={() => {
                navigation.navigate("Form", {
                  recipeName: route.params.recipeName,
                });
              }}
              icon="square-edit-outline"
            />
            <RecipeMenu recipeName={route.params.recipeName} />
          </View>
        }
      />
      <ScrollView>
        <AdjustableYield
          originalYield={recipe.yield}
          updateIngredients={updateIngredients}
        />
        <View>
          <Text variant="headlineSmall">Ingredients</Text>
          <View>
            <View>
              {ingredients.map((ingredient: Ingredient, i: number) => (
                <List.Item
                  key={i}
                  title={formatIngredientAmount(
                    ingredient,
                    context.fractionMode
                  )}
                />
              ))}
            </View>
            <View>
              {ingredients.map((ingredient: Ingredient, i: number) => (
                <List.Item key={i} title={ingredient.name} />
              ))}
            </View>
          </View>
        </View>
        <View>
          <Text variant="headlineSmall">Notes</Text>
          <Text variant="bodyLarge">{recipe.notes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
