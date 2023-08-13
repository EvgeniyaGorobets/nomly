import React, { useContext, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, FAB, List, Searchbar, useTheme } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { MainMenu } from "./MainMenu";
import { Logo } from "./Logo";
import { DeleteRecipesModal } from "./DeleteRecipesModal";
import { AlertList } from "./AlertList";
import { Styles } from "../Styles";

export const Home = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();
  const context: AppContextType = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchbarOutlineColor, setSearbarOutlineColor] = useState<string>(
    theme.colors.outline
  );

  const [selectedRecipe, setSelected] = useState<string>("");
  const recipeActionSheetRef = useRef<BottomSheetModal>(null);
  const openRecipeActionSheet = (recipeName: string) => {
    setSelected(recipeName);
    recipeActionSheetRef.current?.present();
  };
  const closeRecipeActionSheet = () => {
    setSelected("");
    recipeActionSheetRef.current?.dismiss();
  };

  return (
    <View style={Styles.screen}>
      <Appbar.Header style={{ ...Styles.row, justifyContent: "space-between" }}>
        <Logo />
        <MainMenu openDeleteRecipesModal={() => setModalOpen(true)} />
      </Appbar.Header>
      <DeleteRecipesModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <View style={{ ...Styles.content, marginBottom: 0 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onFocus={() => setSearbarOutlineColor(theme.colors.primary)}
          onBlur={() => setSearbarOutlineColor(theme.colors.outline)}
          style={{
            backgroundColor: theme.colors.surfaceVariant,
            borderWidth: 1,
            borderColor: searchbarOutlineColor,
          }}
        />
      </View>
      <BottomSheetModalProvider>
        <ScrollView
          style={Styles.content}
          onTouchStart={closeRecipeActionSheet}
        >
          {Object.keys(context.recipes)
            .filter((recipeName: string) =>
              recipeName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort()
            .map((recipeName: string, i: number) => (
              <List.Item
                key={i}
                title={recipeName}
                onLongPress={() => openRecipeActionSheet(recipeName)}
                onPress={() => {
                  navigation.navigate("Recipe", { recipeName: recipeName });
                }}
                titleStyle={{ fontSize: 18 }}
              />
            ))}
        </ScrollView>
        <FAB
          icon="plus"
          onPress={() => navigation.navigate("Form")}
          style={Styles.fab}
        />
        <AlertList />
        <RecipeActionSheet
          recipeName={selectedRecipe}
          innerRef={recipeActionSheetRef}
        />
      </BottomSheetModalProvider>
    </View>
  );
};
