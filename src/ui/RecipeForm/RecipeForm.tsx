import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { View, ScrollView } from "react-native";
import { Appbar, Button, Divider, useTheme } from "react-native-paper";

import { RecipeYieldInput } from "./RecipeYieldInput";
import { RecipeNameInput } from "./RecipeNameInput";
import { RecipeNotesInput } from "./RecipeNotesInput";
import { IngredientFormSection } from "./IngredientFormSection";

import { type RecipeFormProps } from "../../Stack";
import { AppContext } from "../../AppContext";

import {
  type RecipeBook,
  updateRecipe,
  getBlankRecipe,
} from "../../core/recipe-book";
import {
  type RecipeForm as Form,
  recipeToForm,
  formToRecipe,
} from "../../core/form";

import { Styles } from "../Styles";

export const RecipeForm = ({ navigation, route }: RecipeFormProps) => {
  const theme = useTheme();
  const { recipes, saveRecipes } = useContext(AppContext);

  const initialRecipeName = route.params?.recipeName || "";
  const initialRecipe =
    (route.params?.recipeName && recipes[route.params?.recipeName]) ||
    getBlankRecipe();
  const formDefaults = recipeToForm(initialRecipeName, initialRecipe);

  const { control, handleSubmit, getFieldState, formState } = useForm<Form>({
    defaultValues: formDefaults,
    mode: "onBlur",
  });

  const saveRecipe: SubmitHandler<Form> = (data: Form) => {
    const newRecipeBook: RecipeBook = updateRecipe(
      recipes,
      formToRecipe(data),
      initialRecipeName,
      data.recipeName
    );
    saveRecipes(newRecipeBook);
    // TODO: consider going to a new screen instead of going back
    navigation.goBack();
  };

  const screenTitle = route.params?.recipeName ? "Edit Recipe" : "Add Recipe";

  return (
    <View style={Styles.screen}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={navigation.goBack}
          accessibilityHint="Go back to previous screen"
        />
        <Appbar.Content title={screenTitle} />
      </Appbar.Header>
      <ScrollView style={Styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <RecipeNameInput
            control={control}
            initialRecipeName={initialRecipeName}
          />
          <RecipeYieldInput
            control={control}
            errors={formState.errors.yield}
            getFieldState={getFieldState}
          />
          <Divider />
          <IngredientFormSection control={control} />
          <Divider />
          <RecipeNotesInput control={control} name="notes" />
        </View>
        <View>
          <Button
            mode="contained"
            disabled={!formState.isValid}
            onPress={handleSubmit(saveRecipe)}
            accessibilityHint="Save recipe"
            labelStyle={{ ...theme.fonts.titleLarge, fontWeight: "800" }}
          >
            SAVE
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
