import React, { useContext } from "react";
import {
  IconButton,
  Icon,
  Menu,
  Text,
  Row,
  Switch,
  useColorMode,
} from "native-base";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

import { AppContext, AppContextType } from "../../AppContext";
import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import type { RecipeBook } from "../../core/recipe";
import type { AppAlert } from "../../core/alert";

export const MainMenu = ({ openModal }: { openModal: () => void }) => {
  const context: AppContextType = useContext(AppContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const tryToImportRecipes = async (): Promise<void> => {
    let recipeBook: RecipeBook | null | undefined;

    try {
      recipeBook = await importRecipeBook();
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Recipe import failed",
        description: `${err}`,
      };
      context.setAlerts([...context.alerts, alert]);
      console.log(`Failed to import recipes with error:\n ${err}`);
    }

    if (recipeBook === null) {
      const alert: AppAlert = {
        status: "warning",
        title: "Recipe import cancelled",
        description: "No file was selected by the user.",
      };
      context.setAlerts([...context.alerts, alert]);
    } else if (recipeBook !== undefined) {
      // if recipe book isn't null or undefined, then save it
      // context.saveRecipes is wrapped in its own try/catch block, so we don't need to check for promise rejections again
      context.saveRecipes(recipeBook as RecipeBook);
    }
  };

  const tryToExportRecipes = async (): Promise<void> => {
    try {
      await exportRecipeBook(context.recipes);
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Recipe book download failed",
        description: `${err}`,
      };
      context.setAlerts([...context.alerts, alert]);
      console.log(`Failed to download recipes with error:\n ${err}`);
    }
  };

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
          icon={
            <Icon
              as={Ionicons}
              name="ellipsis-vertical"
              size="md"
              _dark={{ color: "light.400" }}
              _light={{ color: "dark.600" }}
            />
          }
        />
      )}
    >
      <Menu.Group title="Recipes">
        <Menu.Item onPress={tryToExportRecipes}>
          <Row alignItems="center">
            <Icon
              as={AntDesign}
              name="download"
              size="md"
              _dark={{ color: "light.400" }}
              _light={{ color: "dark.600" }}
            />
            <Text paddingX="5px">Download recipes</Text>
          </Row>
        </Menu.Item>
        <Menu.Item onPress={tryToImportRecipes}>
          <Row alignItems="center">
            <Icon
              as={AntDesign}
              name="upload"
              size="md"
              _dark={{ color: "light.400" }}
              _light={{ color: "dark.600" }}
            />
            <Text paddingX="5px">Import recipes</Text>
          </Row>
        </Menu.Item>
        <Menu.Item onPress={() => openModal()}>
          <Row alignItems="center">
            <Icon
              as={AntDesign}
              name="delete"
              size="md"
              _dark={{ color: "error.400" }}
              _light={{ color: "error.500" }}
            />
            <Text
              paddingX="5px"
              _dark={{ color: "error.400" }}
              _light={{ color: "error.500" }}
            >
              Delete all recipes
            </Text>
          </Row>
        </Menu.Item>
      </Menu.Group>
      <Menu.Group title="Settings">
        <Menu.Item>
          <Row alignItems="center">
            <Icon
              as={Feather}
              name="sun"
              size="md"
              _dark={{ color: "light.400" }}
              _light={{ color: "dark.600" }}
            />
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
            <Icon
              as={Feather}
              name="moon"
              size="md"
              _dark={{ color: "light.400" }}
              _light={{ color: "dark.600" }}
            />
          </Row>
        </Menu.Item>
        <Menu.Item>
          <Row alignItems="center">
            <Text fontStyle="medium" fontSize="md">
              0.75
            </Text>
            <Switch
              size="md"
              isChecked={context.fractionMode}
              onToggle={() => context.toggleFractionMode(!context.fractionMode)}
              aria-label={
                context.fractionMode
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
