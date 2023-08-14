import React, { useContext } from "react";
import { View } from "react-native";
import { List, MD3Theme, useTheme } from "react-native-paper";
import { type Style } from "react-native-paper/lib/typescript/src/components/List/utils";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { type BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { AppContext, AppContextType } from "../../AppContext";
import type { HomeScreenProps } from "../../Stack";
import { deleteRecipe, cloneRecipe } from "../../core/recipe-book";

type NavigationProp = HomeScreenProps["navigation"];

type RecipeActionProps = {
  recipeName: string;
  innerRef: React.RefObject<BottomSheetModalMethods>;
};

export const RecipeActionSheet: React.FC<RecipeActionProps> = ({
  recipeName,
  innerRef,
}) => {
  const theme: MD3Theme = useTheme();
  const context: AppContextType = useContext(AppContext);
  const navigation = useNavigation<NavigationProp>();

  return (
    <BottomSheetModal
      index={0}
      snapPoints={["25%"]}
      enablePanDownToClose={true}
      ref={innerRef}
      backgroundStyle={{ backgroundColor: theme.colors.surfaceVariant }}
    >
      <View>
        <List.Item
          title="Edit Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="pencil" />
          )}
          onPress={() => {
            innerRef.current?.dismiss();
            navigation.navigate("Form", { recipeName: recipeName });
          }}
        />
        <List.Item
          title="Clone Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="content-copy" />
          )}
          onPress={() => {
            innerRef.current?.dismiss();
            context.saveRecipes(cloneRecipe(context.recipes, recipeName));
          }}
        />
        <List.Item
          title="Delete Recipe"
          left={(props: { color: string; style: Style }) => (
            <List.Icon {...props} icon="delete-outline" />
          )}
          onPress={() => {
            innerRef.current?.dismiss();
            context.saveRecipes(deleteRecipe(context.recipes, recipeName));
          }}
        />
      </View>
    </BottomSheetModal>
  );
};
