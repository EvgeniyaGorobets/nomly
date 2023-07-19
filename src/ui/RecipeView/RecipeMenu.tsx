import React, { useContext, useState } from "react";
import { Menu, IconButton } from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";
import { deleteRecipe, cloneRecipe } from "../../core/recipe-book";

export const RecipeMenu = ({ recipeName }: { recipeName: string }) => {
  const context: AppContextType = useContext(AppContext);

  const [isVisible, setVisibility] = useState<boolean>(false);
  const toggleVisiblity = () => {
    setVisibility(!isVisible);
  };

  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVisiblity}
      anchor={<IconButton icon="dots-vertical" onPress={toggleVisiblity} />}
      anchorPosition="bottom"
    >
      <Menu.Item
        title="Clone recipe"
        leadingIcon="content-copy"
        onPress={() =>
          context.saveRecipes(cloneRecipe(context.recipes, recipeName))
        }
      />
      <Menu.Item
        title="Delete recipe"
        leadingIcon="delete-outline"
        onPress={() =>
          context.saveRecipes(deleteRecipe(context.recipes, recipeName))
        }
      />
    </Menu>
  );
};
