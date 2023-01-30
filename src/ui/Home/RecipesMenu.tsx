import React, { useContext } from "react";
import { IconButton, Icon, Menu, Text, Row } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { AppContext, AppContextType } from "../../AppContext";
import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import type { RecipeBook } from "../../core/recipe";

export const RecipesMenu = () => {
  const context: AppContextType = useContext(AppContext);
  return (
    <Menu
      w="100%"
      placement="bottom right"
      trigger={(triggerProps) => (
        <IconButton
          {...triggerProps}
          icon={<Icon as={AntDesign} name="ellipsis1" size="md" />}
        />
      )}
    >
      <Menu.Item onPress={() => exportRecipeBook(context.recipes)}>
        <Row alignItems="center">
          <Icon as={AntDesign} name="download" size="md" />
          <Text paddingX="5px">Download recipes</Text>
        </Row>
      </Menu.Item>
      <Menu.Item
        onPress={async () => {
          const recipeBook: RecipeBook | null = await importRecipeBook();
          if (recipeBook != null) {
            context.saveRecipes(recipeBook as RecipeBook);
          }
        }}
      >
        <Row alignItems="center">
          <Icon as={AntDesign} name="upload" size="md" />
          <Text paddingX="5px">Import recipes</Text>
        </Row>
      </Menu.Item>
      <Menu.Item onPress={() => context.saveRecipes({})}>
        <Row alignItems="center">
          <Icon as={AntDesign} name="delete" size="md" color="red.500" />
          <Text paddingX="5px" color="red.500">
            Delete all recipes
          </Text>
        </Row>
      </Menu.Item>
    </Menu>
  );
};
