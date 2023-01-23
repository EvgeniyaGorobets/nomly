import React, { ReactElement, useState } from "react";
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
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RecipeBook, addRecipe } from "./core/RecipeBook";
import { AppContext, AppContextType } from "./AppContext";
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
  convertPotentialRecipe,
} from "./core/form";
import type { AppStack } from "./Stack";
import { IngredientForm } from "./IngredientForm";
import { RecipeYieldForm } from "./RecipeYieldForm";
import { RecipeNameForm } from "./RecipeNameForm";
import { Pressable } from "react-native";

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" />;
const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

export const RecipeForm = ({
  navigation,
}: NativeStackScreenProps<AppStack, "Form">) => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [recipe, setRecipe] = useState<PotentialRecipe>(blankRecipe());
  const [errors, setErrors] = useState<RecipeErrors>({});

  const tryToSaveRecipe = (
    recipeBook: RecipeBook,
    saveRecipeBook: (recipes: RecipeBook) => void
  ) => {
    const errors: RecipeErrors | null = validateRecipe(
      recipeBook,
      recipe,
      recipeName
    );
    if (errors) {
      setErrors(errors);
    } else {
      saveRecipeBook(
        addRecipe(recipeBook, convertPotentialRecipe(recipe), recipeName)
      );
      navigation.goBack();
    }
  };

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <Row w="100%" justifyContent="space-between" my="15px">
        <Heading>Add Recipe</Heading>
        <IconButton icon={CloseIcon} onPress={() => navigation.goBack()} />
      </Row>
      <AppContext.Consumer>
        {(context: AppContextType) => (
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
              <Button onPress={() => tryToSaveRecipe(context.recipes, context.saveRecipes)}>
                SAVE
              </Button>
            </Column>
          </ScrollView>
        )}
      </AppContext.Consumer>
    </Center>
  );
};
