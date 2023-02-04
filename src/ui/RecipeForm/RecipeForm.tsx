import React, { useContext, useState } from "react";
import {
  Button,
  Center,
  IconButton,
  Row,
  Icon,
  Input,
  ScrollView,
  Column,
  Heading,
  Text,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { RecipeBook, Recipe } from "../../core/recipe";
import type {
  RecipeErrors,
  PotentialRecipe,
  PotentialIngredient,
  PotentialYield,
} from "../../core/form";
import type { RecipeFormProps } from "../../Stack";
import { addRecipe, updateRecipe } from "../../core/recipe";
import {
  blankRecipe,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  updateRecipeYield,
  updateRecipeNotes,
  validateRecipe,
  convertFormToRecipe,
  convertRecipeToForm,
} from "../../core/form";
import { AppContext, AppContextType } from "../../AppContext";
import { IngredientForm } from "./IngredientForm";
import { RecipeYieldForm } from "./RecipeYieldForm";
import { RecipeNameForm } from "./RecipeNameForm";
import { getSafePadding } from "../theme";

type RouteProp = RecipeFormProps["route"];

const getInitialRecipe = (
  route: RouteProp,
  recipes: RecipeBook
): [string, PotentialRecipe] => {
  if (route.params?.recipeName) {
    return [
      route.params.recipeName,
      convertRecipeToForm(recipes[route.params.recipeName]),
    ];
  } else {
    return ["", blankRecipe()];
  }
};

const isNewRecipe = (route: RouteProp): boolean => {
  return typeof route.params?.recipeName == "undefined";
};

export const RecipeForm = ({ navigation, route }: RecipeFormProps) => {
  const context: AppContextType = useContext(AppContext);
  const [initialRecipeName, initialRecipe]: [string, PotentialRecipe] =
    getInitialRecipe(route, context.recipes);

  const [recipeName, setRecipeName] = useState<string>(initialRecipeName);
  const [recipe, setRecipe] = useState<PotentialRecipe>(initialRecipe);
  const [errors, setErrors] = useState<RecipeErrors>({});

  const insets: EdgeInsets = useSafeAreaInsets();

  const tryToSaveRecipe = () => {
    const errors: RecipeErrors | null = validateRecipe(
      context.recipes,
      recipe,
      recipeName,
      isNewRecipe(route)
    );
    if (errors) {
      setErrors(errors);
    } else {
      const validatedRecipe: Recipe = convertFormToRecipe(recipe);
      const newRecipeBook: RecipeBook = isNewRecipe(route)
        ? addRecipe(context.recipes, validatedRecipe, recipeName)
        : updateRecipe(context.recipes, validatedRecipe, recipeName);
      context.saveRecipes(newRecipeBook);
      navigation.goBack();
    }
  };

  return (
    <Center padding={getSafePadding(insets)}>
      <Row
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={0}
        marginTop="5px"
      >
        <Heading size="lg">Add Recipe</Heading>
        <IconButton
          icon={
            <Icon
              as={AntDesign}
              name="close"
              size="lg"
              _light={{ color: "dark.300" }}
              _dark={{ color: "light.500" }}
            />
          }
          onPress={() => navigation.goBack()}
        />
      </Row>
      <ScrollView flexGrow={1} _contentContainerStyle={{ flexGrow: 1 }}>
        <Column flex={1}>
          <RecipeNameForm
            errors={errors}
            recipeName={recipeName}
            setRecipeName={setRecipeName}
          />
          <RecipeYieldForm
            errors={errors}
            recipeYield={recipe.yield}
            setRecipeYield={(newYield: PotentialYield) =>
              setRecipe(updateRecipeYield(recipe, newYield))
            }
          />
          <Column my="5px" flex={1}>
            <Heading size="md">Ingredients</Heading>
            {recipe.ingredients.map(
              (ingredient: PotentialIngredient, i: number) => (
                <IngredientForm
                  key={i}
                  errors={errors}
                  index={i}
                  ingredient={ingredient}
                  deleteIngredient={() =>
                    setRecipe(deleteIngredient(recipe, i))
                  }
                  updateIngredient={(ingredient: PotentialIngredient) => {
                    setRecipe(updateIngredient(recipe, i, ingredient));
                  }}
                />
              )
            )}
            <Column borderBottomWidth={1}>
              <Pressable onPress={() => setRecipe(addIngredient(recipe))}>
                <Row alignItems="center" paddingY="8px">
                  <Icon
                    as={AntDesign}
                    name="plus"
                    size="md"
                    m="5px"
                    _light={{ color: "primary.500" }}
                    _dark={{ color: "primary.300" }}
                  />
                  <Text marginLeft="5px">Add Ingredient</Text>
                </Row>
              </Pressable>
            </Column>
          </Column>
          <Column>
            <Heading size="md" marginBottom="5px">
              Notes
            </Heading>
            <Input
              value={recipe.notes}
              onChangeText={(text: string) =>
                setRecipe(updateRecipeNotes(recipe, text))
              }
              multiline
              numberOfLines={12}
              textAlignVertical="top"
              variant="outline"
            />
          </Column>
        </Column>
        <Column my="15px" w="100%">
          <Button onPress={() => tryToSaveRecipe()}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              _dark={{ color: "light.100" }}
              _light={{ color: "light.50" }}
            >
              SAVE
            </Text>
          </Button>
        </Column>
      </ScrollView>
    </Center>
  );
};
