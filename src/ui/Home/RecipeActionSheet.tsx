import React, { useContext } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Style } from "react-native-paper/lib/typescript/src/components/List/utils";

import { AppContext, AppContextType } from "../../AppContext";
import type { HomeScreenProps } from "../../Stack";
import { deleteRecipe, cloneRecipe } from "../../core/recipe";

type NavigationProp = HomeScreenProps["navigation"];

type RecipeActionProps = {
  recipeName: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RecipeActionSheet: React.FC<RecipeActionProps> = ({
  recipeName,
  isOpen,
  onClose,
}) => {
  const context: AppContextType = useContext(AppContext);
  const navigation = useNavigation<NavigationProp>();

  return (
    <BottomSheet index={0} snapPoints={["25%"]}>
      <View>
        <List.Item
          title="Edit Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="pencil" />
          )}
          onPress={() => {
            navigation.navigate("Form", { recipeName: recipeName });
            onClose();
          }}
        />
        <List.Item
          title="Clone Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="content-copy" />
          )}
          onPress={() => {
            context.saveRecipes(cloneRecipe(context.recipes, recipeName));
            onClose();
          }}
        />
        <List.Item
          title="Delete Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="delete-outline" />
          )}
          onPress={() => {
            context.saveRecipes(deleteRecipe(context.recipes, recipeName));
            onClose();
          }}
        />
      </View>
    </BottomSheet>
  );
};
