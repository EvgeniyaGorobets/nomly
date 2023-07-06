import React, { useContext, useState } from "react";
import { View, ViewStyle } from "react-native";
import {
  Appbar,
  Menu,
  Switch,
  Text,
  Divider,
  IconButton,
} from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";
import { FlexStyles } from "../Styles";
import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import type { RecipeBook } from "../../core/recipe";
import type { AppAlert } from "../../core/alert";

const PrefsMenuItemStyle: ViewStyle = {
  ...FlexStyles.row,
  justifyContent: "space-around",
  alignItems: "center",
};

export const MainMenu = ({ openModal }: { openModal: () => void }) => {
  const context: AppContextType = useContext(AppContext);
  const [isVisible, setVisibility] = useState<boolean>(false);
  const toggleVisiblity = () => {
    setVisibility(!isVisible);
  };

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
    }
  };

  return (
    <View>
      <Menu
        visible={isVisible}
        onDismiss={toggleVisiblity}
        anchor={
          <Appbar.Action icon="dots-vertical" onPress={toggleVisiblity} />
        }
        anchorPosition="bottom"
      >
        <Text variant="titleMedium">Recipe Book</Text>
        <Menu.Item
          title="Download recipes"
          leadingIcon="download"
          onPress={tryToExportRecipes}
        />
        <Menu.Item
          title="Import recipes"
          leadingIcon="upload"
          onPress={tryToImportRecipes}
        />
        <Menu.Item
          title="Delete all recipes"
          leadingIcon="upload"
          onPress={openModal}
        />
        <Divider />
        <Text variant="titleMedium">Preferences</Text>
        <Menu.Item
          title={
            <View style={PrefsMenuItemStyle}>
              <IconButton icon="white-balance-sunny" />
              <Switch
                value={context.prefs.darkMode}
                onValueChange={() =>
                  context.togglePreference("darkMode", !context.prefs.darkMode)
                }
                aria-label={
                  context.prefs.darkMode
                    ? "switch to dark mode"
                    : "switch to light mode"
                }
              />
              <IconButton icon="weather-night" />
            </View>
          }
        />
        <Menu.Item
          title={
            <View style={PrefsMenuItemStyle}>
              <Text variant="bodyMedium">0.75</Text>
              <Switch
                value={context.prefs.fractionMode}
                onValueChange={() =>
                  context.togglePreference(
                    "fractionMode",
                    !context.prefs.fractionMode
                  )
                }
                aria-label={
                  context.prefs.fractionMode
                    ? "switch to decimal mode"
                    : "switch to fraction mode"
                }
              />
              <Text variant="bodyMedium">¾</Text>
            </View>
          }
        />
      </Menu>
    </View>
  );
};
