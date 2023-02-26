import React from "react";
import { Row, Icon, Column, Heading, Text, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import type { RecipeErrors } from "../../core/form";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../../core/form";
import { IngredientInput } from "./IngredientInput";
import { Ingredient, Recipe } from "../../core/recipe";

type IngredientSectionProps = {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
  errors: RecipeErrors;
  setErrors: (newErrors: RecipeErrors) => void;
};

export const IngredientFormSection = ({
  recipe,
  setRecipe,
  errors,
  setErrors,
}: IngredientSectionProps) => {
  return (
    <Column flex={1} my="10px" paddingBottom="10px">
      <Heading size="md">Ingredients</Heading>
      {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
        <IngredientInput
          key={i}
          ingredient={ingredient}
          deleteIngredient={() => setRecipe(deleteIngredient(recipe, i))}
          updateIngredient={(ingredient: Ingredient) => {
            setRecipe(updateIngredient(recipe, i, ingredient));
          }}
          setIngredientNameError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientName-${i}`]: hasErr })
          }
          setIngredientAmountError={(hasErr: boolean) =>
            setErrors({ ...errors, [`ingredientAmount-${i}`]: hasErr })
          }
        />
      ))}
      <Pressable
        onPress={() => {
          // new ingredient by default has an error so we must disable the SAVE button
          setErrors({
            ...errors,
            [`ingredientAmount-${recipe.ingredients.length}`]: true,
          });
          setRecipe(addIngredient(recipe));
        }}
      >
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
