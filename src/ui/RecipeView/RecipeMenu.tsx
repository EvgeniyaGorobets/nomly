import React, { useContext } from "react";
import { IconButton, Icon, Menu, Text, Row } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { AppContext, AppContextType } from "../../AppContext";
import { deleteRecipe, cloneRecipe } from "../../core/recipe";

export const RecipeMenu = ({ recipeName }: { recipeName: string }) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <Menu
      w="100%"
      placement="bottom right"
      defaultIsOpen={false}
      _dark={{ backgroundColor: "dark.500" }}
      _light={{ backgroundColor: "light.50" }}
      trigger={(triggerProps) => (
        <IconButton
          {...triggerProps}
          padding="5px"
          icon={
            <Icon
              as={Ionicons}
              name="ellipsis-vertical"
              size="lg"
              _dark={{ color: "light.400" }}
              _light={{ color: "light.50" }}
            />
          }
        />
      )}
    >
      <Menu.Item
        onPress={() =>
          context.saveRecipes(cloneRecipe(context.recipes, recipeName))
        }
      >
        <Row alignItems="center">
          <Icon as={AntDesign} size="6" name="copy1" />
          <Text paddingX="5px">Clone recipe</Text>
        </Row>
      </Menu.Item>
      <Menu.Item
        onPress={() =>
          context.saveRecipes(deleteRecipe(context.recipes, recipeName))
        }
      >
        <Row alignItems="center">
          <Icon
            as={AntDesign}
            size="6"
            name="delete"
            _dark={{ color: "error.400" }}
            _light={{ color: "error.500" }}
          />
          <Text
            paddingX="5px"
            _dark={{ color: "error.400" }}
            _light={{ color: "error.500" }}
          >
            Delete recipe
          </Text>
        </Row>
      </Menu.Item>
    </Menu>
  );
};
