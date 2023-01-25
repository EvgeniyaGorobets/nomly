import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

/* -- The Navigation Stack -- */

export type AppStack = {
  Home: undefined;
  Form: { recipeName: string } | undefined;
  Recipe: { recipeName: string };
};

export const Stack = createNativeStackNavigator<AppStack>();

/* -- The prop types for each screen -- */

export type HomeScreenProps = NativeStackScreenProps<AppStack, "Home">;
export type RecipeFormProps = NativeStackScreenProps<AppStack, "Form">;
export type RecipeScreenProps = NativeStackScreenProps<AppStack, "Recipe">;
