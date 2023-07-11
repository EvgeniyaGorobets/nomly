import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";

import { AdjustableYield } from "./AdjustableYield";
import { RecipeMenu } from "./RecipeMenu";

import { Styles } from "../Styles";
import { AppContext } from "../../AppContext";

import type { AppContextType } from "../../AppContext";
import type { RecipeScreenProps } from "../../Stack";
import type { Ingredient, Recipe } from "../../core/recipe";
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
    <View style={Styles.screen}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={route.params.recipeName} />
        <Appbar.Action
          icon="pencil"
          onPress={() => {
            navigation.navigate("Form", {
              recipeName: route.params.recipeName,
            });
          }}
        />
        <RecipeMenu recipeName={route.params.recipeName} />
      </Appbar.Header>
      <ScrollView style={Styles.content}>
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
                    context.prefs.fractionMode
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
        <Divider />
        <View>
          <Text variant="headlineSmall">Notes</Text>
          <Text variant="bodyLarge">{recipe.notes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
