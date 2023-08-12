import React, { useContext, useState } from "react";
import { View, ViewStyle } from "react-native";
import {
  Appbar,
  Menu,
  Switch,
  Text,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";

import { Styles } from "../Styles";
import { AppContext } from "../../AppContext";

import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import type { RecipeBook } from "../../core/recipe-book";
import type { AppAlert } from "../../core/alert";

const PrefsMenuItemStyle: ViewStyle = {
  ...Styles.row,
  justifyContent: "flex-start",
  alignItems: "center",
};

export const MainMenu = ({
  openDeleteRecipesModal,
}: {
  openDeleteRecipesModal: () => void;
}) => {
  const theme = useTheme();

  const { alerts, setAlerts, recipes, saveRecipes, prefs, togglePreference } =
    useContext(AppContext);
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
      setAlerts([...alerts, alert]);
    }

    if (recipeBook === null) {
      const alert: AppAlert = {
        status: "warning",
        title: "Recipe import cancelled",
        description: "No file was selected by the user.",
      };
      setAlerts([...alerts, alert]);
    } else if (recipeBook !== undefined) {
      // if recipe book isn't null or undefined, then save it
      // saveRecipes is wrapped in its own try/catch block, so we don't need to check for promise rejections again
      saveRecipes(recipeBook as RecipeBook);
    }
  };

  const tryToExportRecipes = async (): Promise<void> => {
    try {
      await exportRecipeBook(recipes);
    } catch (err) {
      const alert: AppAlert = {
        status: "error",
        title: "Recipe book download failed",
        description: `${err}`,
      };
      setAlerts([...alerts, alert]);
    }
  };

  return (
    <View>
      <Menu
        visible={isVisible}
        onDismiss={toggleVisiblity}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={toggleVisiblity}
            accessibilityHint="Toggle main menu"
          />
        }
        anchorPosition="bottom"
        contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
      >
        <Menu.Item title="Recipe Book" titleStyle={{ fontSize: 20 }} />
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
          leadingIcon="delete-outline"
          onPress={openDeleteRecipesModal}
        />
        <Divider />
        <Menu.Item title="Preferences" titleStyle={{ fontSize: 20 }} />
        <View style={PrefsMenuItemStyle}>
          <IconButton
            icon="white-balance-sunny"
            style={{ width: 50, alignItems: "center" }}
          />
          <View style={{ width: 50 }}>
            <Switch
              value={prefs.darkMode}
              onValueChange={() =>
                togglePreference("darkMode", !prefs.darkMode)
              }
              aria-label={
                prefs.darkMode ? "switch to dark mode" : "switch to light mode"
              }
            />
          </View>
          <IconButton
            icon="weather-night"
            style={{ width: 50, alignItems: "center" }}
          />
        </View>
        <View style={PrefsMenuItemStyle}>
          <View style={{ width: 50, alignItems: "center", margin: 6 }}>
            <Text variant="bodyMedium">0.75</Text>
          </View>
          <View style={{ width: 50 }}>
            <Switch
              value={prefs.fractionMode}
              onValueChange={() =>
                togglePreference("fractionMode", !prefs.fractionMode)
              }
              aria-label={
                prefs.fractionMode
                  ? "switch to decimal mode"
                  : "switch to fraction mode"
              }
            />
          </View>
          <View style={{ width: 50, alignItems: "center", margin: 6 }}>
            <Text variant="bodyLarge">¾</Text>
          </View>
        </View>
      </Menu>
    </View>
  );
};
