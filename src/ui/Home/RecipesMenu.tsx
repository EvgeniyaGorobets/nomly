import React, { useContext, useState } from "react";
import {
  IconButton,
  Icon,
  Menu,
  Text,
  Row,
  Switch,
  useColorMode,
} from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";

import { AppContext, AppContextType } from "../../AppContext";
import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import type { RecipeBook } from "../../core/recipe";

export const RecipesMenu = () => {
  const context: AppContextType = useContext(AppContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [fractionMode, setFractionMode] = useState<boolean>(false);

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
      <Menu.Group title="Recipes">
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
      </Menu.Group>
      <Menu.Group title="Settings">
        <Menu.Item>
          <Row alignItems="center">
            <Icon as={Feather} name="sun" size="md" />
            <Switch
              size="md"
              isChecked={colorMode === "dark"}
              onToggle={toggleColorMode}
              aria-label={
                colorMode === "light"
                  ? "switch to dark mode"
                  : "switch to light mode"
              }
            />
            <Icon as={Feather} name="moon" size="md" />
          </Row>
        </Menu.Item>
        <Menu.Item>
          <Row alignItems="center">
            <Text fontStyle="medium" fontSize="md">
              0.75
            </Text>
            <Switch
              size="md"
              isChecked={fractionMode}
              onToggle={() => setFractionMode(!fractionMode)}
              aria-label={
                fractionMode
                  ? "switch to decimal mode"
                  : "switch to fraction mode"
              }
            />
            <Text fontStyle="medium" fontSize="lg">
              ¾
            </Text>
          </Row>
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );
};
