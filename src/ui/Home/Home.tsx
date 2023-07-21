import React, { useContext, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, FAB, List, Searchbar } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { MainMenu } from "./MainMenu";
import { Logo } from "./Logo";
import { DeleteRecipesModal } from "./DeleteRecipesModal";
import { AlertList } from "./AlertList";
import { Styles } from "../Styles";

export const Home = ({ navigation }: HomeScreenProps) => {
  const context: AppContextType = useContext(AppContext);

  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <View style={Styles.screen}>
      <Appbar.Header>
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
        />
      </View>
      <ScrollView style={Styles.content}>
        {Object.keys(context.recipes)
          .filter((recipeName: string) =>
            recipeName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort()
          .map((recipeName: string, i: number) => (
            <List.Item
              key={i}
              title={recipeName}
              onLongPress={() => setSelected(recipeName)}
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
        isOpen={selectedRecipe != ""}
        recipeName={selectedRecipe}
        onClose={() => setSelected("")}
      />
    </View>
  );
};
