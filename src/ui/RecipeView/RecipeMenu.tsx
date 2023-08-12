import React, { useContext, useState } from "react";
import { Appbar, Menu, useTheme } from "react-native-paper";

import { AppContext } from "../../AppContext";
import { type RecipeScreenProps } from "../../Stack";
import { deleteRecipe, cloneRecipe } from "../../core/recipe-book";

type RecipeMenuProps = {
  recipeName: string;
  nav: RecipeScreenProps["navigation"];
};

export const RecipeMenu = ({ recipeName, nav }: RecipeMenuProps) => {
  const theme = useTheme();

  const [isVisible, setVisibility] = useState<boolean>(false);
  const toggleVisiblity = () => {
    setVisibility(!isVisible);
  };

  const { recipes, saveRecipes } = useContext(AppContext);
  const cloneThisRecipe = () => {
    saveRecipes(cloneRecipe(recipes, recipeName));
    nav.navigate("Recipe", { recipeName: `${recipeName} (Copy)` });
  };
  const deleteThisRecipe = () => {
    saveRecipes(deleteRecipe(recipes, recipeName));
    nav.goBack();
  };

  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVisiblity}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          onPress={toggleVisiblity}
          accessibilityHint="Open recipe menu"
          style={{ marginLeft: 0 }}
        />
      }
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
    >
      <Menu.Item
        title="Clone recipe"
        leadingIcon="content-copy"
        onPress={cloneThisRecipe}
      />
      <Menu.Item
        title="Delete recipe"
        leadingIcon="delete-outline"
        onPress={deleteThisRecipe}
      />
    </Menu>
  );
};
