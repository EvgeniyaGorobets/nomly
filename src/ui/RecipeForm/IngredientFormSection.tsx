import React from "react";
import { Row, Icon, Column, Heading, Text, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import type {
  RecipeErrors,
  PotentialRecipe,
  PotentialIngredient,
} from "../../core/form";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../core/form";
import { IngredientInput } from "./IngredientInput";

type IngredientSectionProps = {
  recipe: PotentialRecipe;
  setRecipe: (recipe: PotentialRecipe) => void;
  errors: RecipeErrors;
};

export const IngredientFormSection = ({
  recipe,
  setRecipe,
  errors,
}: IngredientSectionProps) => {
  return (
    <Column flex={1} my="10px" paddingBottom="10px">
      <Heading size="md">Ingredients</Heading>
      {recipe.ingredients.map((ingredient: PotentialIngredient, i: number) => (
        <IngredientInput
          key={i}
          errors={errors}
          index={i}
          ingredient={ingredient}
          deleteIngredient={() => setRecipe(deleteIngredient(recipe, i))}
          updateIngredient={(ingredient: PotentialIngredient) => {
            setRecipe(updateIngredient(recipe, i, ingredient));
          }}
        />
      ))}
      <Pressable onPress={() => setRecipe(addIngredient(recipe))}>
        <Row alignItems="center">
          <Icon
            as={AntDesign}
            name="plus"
            size="md"
            m="5px"
            _light={{ color: "primary.500" }}
            _dark={{ color: "primary.300" }}
          />
          <Column borderBottomWidth={1} flexGrow={1} paddingY="8px">
            <Text>Add Ingredient</Text>
          </Column>
        </Row>
      </Pressable>
    </Column>
  );
};
