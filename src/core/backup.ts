import { StorageAccessFramework as SAF } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import type { RecipeBook } from "./recipe-book";
import { UNITS } from "./ingredient";
import { isNumeric } from "./utils";

const FILE_NAME: string = "nomly-recipe-book.json";
const MIME_TYPE: string = "application/json";

export const exportRecipeBook = async (
  recipeBook: RecipeBook
): Promise<void> => {
  try {
    // request permissions to use Android file system
    const permissions = await SAF.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Get SAF URI from response
      const safUri: string = permissions.directoryUri;

      // Make a new file within SAF
      const fileUri: string = await SAF.createFileAsync(
        safUri,
        FILE_NAME,
        MIME_TYPE
      );

      // write to Expo File system
      SAF.writeAsStringAsync(fileUri, JSON.stringify(recipeBook));
    }
  } catch (err) {
    console.log(`Failed to export recipe book with error:\n ${err}`);
  }
};

const isObject = (obj: any) => {
  // https://stackoverflow.com/a/8511350
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};

const hasValidYield = (recipe: any): boolean => {
  if (!("yield" in recipe) || !isObject(recipe.yield)) {
    console.log("Recipe is missing yield or recipe yield is not an Object");
    return false;
  } else if (!("amount" in recipe.yield) || !isNumeric(recipe.yield.amount)) {
    console.log(
      "Recipe yield is missing amount or amount is not a numeric string"
    );
    return false;
  } else if (
    !("units" in recipe.yield) ||
    typeof recipe.yield.units != "string"
  ) {
    console.log("Recipe yield is missing units or units are not a string");
    return false;
  }
  return true;
};

const isValidIngredient = (ingredient: any, i: number) => {
  console.log(`Validating ingredient ${i}`);
  if (!isObject(ingredient)) {
    console.log("Ingredient is not an Object");
    return false;
  } else if (!("name" in ingredient) || typeof ingredient.name != "string") {
    console.log(
      "Ingredient is missing a name or the ingredient name is not a string"
    );
    return false;
  } else if (!("amount" in ingredient) || !isNumeric(ingredient.amount)) {
    console.log(
      `Ingredient is missing an amount or the amount is not a numeric string: ${ingredient.amount}`
    );
    return false;
  } else if (
    !("units" in ingredient) ||
    UNITS.indexOf(ingredient.units) == -1
  ) {
    console.log(
      `Ingredient is missing units or units are not one of the valid UNITS: ${ingredient.units}`
    );
    return false;
  }
  return true;
};

const hasValidIngredients = (recipe: any): boolean => {
  if (!("ingredients" in recipe) || !Array.isArray(recipe.ingredients)) {
    console.log(
      "Recipe is missing ingredients, or ingredients are not an array"
    );
  }
  return recipe.ingredients.every(isValidIngredient);
};

const hasValidNotes = (recipe: any): boolean => {
  if ("notes" in recipe && typeof recipe.notes == "string") {
    return true;
  }
  console.log("Recipe is missing notes or recipe notes are not a string");
  return false;
};

const isValidRecipe = (recipe: any): boolean => {
  if (!isObject(recipe)) {
    console.log("Recipe is not an Object");
    return false;
  }
  return (
    hasValidYield(recipe) &&
    hasValidIngredients(recipe) &&
    hasValidNotes(recipe)
  );
};

const isValidRecipeBook = (recipeBook: any): boolean => {
  if (!isObject(recipeBook)) {
    console.log("Recipe book is not an Object");
    return false;
  }
  return Object.keys(recipeBook).every((recipeName: string) => {
    console.log(`Validating ${recipeName} recipe`);
    return isValidRecipe(recipeBook[recipeName]);
  });
};

export const importRecipeBook = async (): Promise<RecipeBook | null> => {
  try {
    // request permissions to use Android file system
    const permissions = await SAF.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const document: DocumentPicker.DocumentResult =
        await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true, // need to cache it to be able to read it
          multiple: false,
          type: MIME_TYPE,
        });

      // user cancelled during document picking
      if (document.type == "cancel") {
        return null;
      }

      // read file selected by user and parse it into a JSON
      const recipesText: string = await SAF.readAsStringAsync(document.uri);
      const recipeBook: any = JSON.parse(recipesText);

      if (isValidRecipeBook(recipeBook)) {
        console.log("Recipe book is valid; importing.");
        return recipeBook as RecipeBook;
      }
    }
  } catch (err) {
    console.log(`Failed to import recipes with error:\n ${err}`);
  }
  return null;
};

// TODO: abstract permissions into its own function with its own error handling
