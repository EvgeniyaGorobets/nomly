import React, { useContext, useState } from "react";
import {
  Button,
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
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { RecipeBook, Recipe } from "../../core/recipe";
import type {
  RecipeErrors,
  PotentialRecipe,
  PotentialYield,
} from "../../core/form";
import type { RecipeFormProps } from "../../Stack";
import { addRecipe, updateRecipe } from "../../core/recipe";
import {
  blankRecipe,
  updateRecipeYield,
  validateRecipe,
  convertFormToRecipe,
  convertRecipeToForm,
} from "../../core/form";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeYieldInput } from "./RecipeYieldInput";
import { RecipeNameInput } from "./RecipeNameInput";
import { getSafePadding } from "../theme";
import { RecipeNotesInput } from "./RecipeNotesInput";
import { IngredientFormSection } from "./IngredientFormSection";

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
        <Heading size="lg">
          {isNewRecipe(route) ? "Add Recipe" : "Edit Recipe"}
        </Heading>
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
          <RecipeNameInput
            errors={errors}
            recipeName={recipeName}
            setRecipeName={setRecipeName}
          />
          <RecipeYieldInput
            errors={errors}
            recipeYield={recipe.yield}
            setRecipeYield={(newYield: PotentialYield) =>
              setRecipe(updateRecipeYield(recipe, newYield))
            }
          />
          <IngredientFormSection
            recipe={recipe}
            setRecipe={setRecipe}
            errors={errors}
          />
          <RecipeNotesInput recipe={recipe} setRecipe={setRecipe} />
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
