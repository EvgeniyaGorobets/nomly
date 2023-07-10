import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Appbar, FAB, List } from "react-native-paper";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { MainMenu } from "./MainMenu";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { DeleteRecipesModal } from "./DeleteRecipesModal";
import { AlertList } from "./AlertList";

export const Home = ({ navigation }: HomeScreenProps) => {
  const context: AppContextType = useContext(AppContext);

  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <View>
      <Appbar.Header>
        <Logo />
        <MainMenu openDeleteRecipesModal={() => setModalOpen(true)} />
      </Appbar.Header>
      <DeleteRecipesModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView>
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
            />
          ))}
      </ScrollView>
      <FAB icon="plus" onPress={() => navigation.navigate("Form")} />
      <AlertList />
      <RecipeActionSheet
        isOpen={selectedRecipe != ""}
        recipeName={selectedRecipe}
        onClose={() => setSelected("")}
      />
    </View>
  );
};
