import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";

import { AdjustableYield } from "./AdjustableYield";
import { RecipeMenu } from "./RecipeMenu";

import { Styles } from "../Styles";
import { AppContext } from "../../AppContext";

import type { RecipeScreenProps } from "../../Stack";
import type { Ingredient } from "../../core/ingredient";
import type { Recipe } from "../../core/recipe-book";
import {
  adjustIngredientAmounts,
  formatIngredientAmount,
} from "../../core/ingredient-amounts";

export const RecipeView = ({ navigation, route }: RecipeScreenProps) => {
  const { recipes, prefs } = useContext(AppContext);
  const recipe: Recipe = recipes[route.params.recipeName];

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients
  );

  // If the original recipe changes, update the state
  useEffect(() => {
    setIngredients(recipe.ingredients);
  }, [recipe.ingredients]);

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
        <RecipeMenu recipeName={route.params.recipeName} nav={navigation} />
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
                  title={formatIngredientAmount(ingredient, prefs.fractionMode)}
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
