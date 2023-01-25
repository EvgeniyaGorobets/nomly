import React, { useContext } from "react";
import { Actionsheet, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppContext, AppContextType } from "../../AppContext";
import type { HomeScreenProps } from "../../Stack";
import { deleteRecipe, cloneRecipe } from "../../core/RecipeBook";

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
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          startIcon={<Icon as={AntDesign} size="6" name="edit" />}
          onPress={() => {
            navigation.navigate("Form", { recipeName: recipeName });
            onClose();
          }}
        >
          Edit
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon as={AntDesign} size="6" name="copy1" />}
          onPress={() => {
            context.saveRecipes(cloneRecipe(context.recipes, recipeName));
            onClose();
          }}
        >
          Clone
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon as={AntDesign} size="6" name="delete" />}
          onPress={() => {
            context.saveRecipes(deleteRecipe(context.recipes, recipeName));
            onClose();
          }}
        >
          Delete
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
