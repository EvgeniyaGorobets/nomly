import React, { ReactElement, useContext, useState } from "react";
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
  FormControl,
  Text,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import {
  RecipeBook,
  addRecipe,
  updateRecipe,
  Recipe,
} from "../../core/RecipeBook";
import { AppContext, AppContextType } from "../../AppContext";
import {
  RecipeErrors,
  PotentialRecipe,
  PotentialIngredient,
  PotentialYield,
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
import type { RecipeFormProps } from "../../Stack";
import { IngredientForm } from "./IngredientForm";
import { RecipeYieldForm } from "./RecipeYieldForm";
import { RecipeNameForm } from "./RecipeNameForm";
import { getSafePadding } from "../helpers";

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" />;
const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

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
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
      padding={getSafePadding(insets)}
    >
      <Row w="100%" justifyContent="space-between" my="15px">
        <Heading>Add Recipe</Heading>
        <IconButton icon={CloseIcon} onPress={() => navigation.goBack()} />
      </Row>
      <ScrollView flex={1} _contentContainerStyle={{ flex: 1 }}>
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
          <Column my="10px">
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
            <Column borderBottomWidth={1} borderColor="gray.300">
              <Pressable onPress={() => setRecipe(addIngredient(recipe))}>
                <Row alignItems="center">
                  {PlusIcon}
                  <Text>Add Ingredient</Text>
                </Row>
              </Pressable>
            </Column>
          </Column>
          <FormControl>
            <Column>
              <FormControl.Label>Notes</FormControl.Label>
              <Input
                value={recipe.notes}
                onChangeText={(text: string) =>
                  setRecipe(updateRecipeNotes(recipe, text))
                }
                multiline
                numberOfLines={8}
              />
            </Column>
          </FormControl>
        </Column>
        <Column my="15px">
          <Button onPress={() => tryToSaveRecipe()}>SAVE</Button>
        </Column>
      </ScrollView>
    </Center>
  );
};
