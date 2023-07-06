import React, { useContext, useState } from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Row, ScrollView, Heading, Pressable } from "native-base";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets: EdgeInsets = useSafeAreaInsets();

  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <View>
      <Row
        w="100%"
        justifyContent="space-between"
        my="15px"
        paddingTop={`${insets.top}px`}
      >
        <Logo />
        <MainMenu openModal={() => setModalOpen(true)} />
      </Row>
      <DeleteRecipesModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView flex={1} w="100%" my="10px">
        {Object.keys(context.recipes)
          .filter((recipeName: string) =>
            recipeName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort()
          .map((recipeName: string, i: number) => (
            <Pressable
              key={i}
              onLongPress={() => setSelected(recipeName)}
              onPress={() => {
                navigation.navigate("Recipe", { recipeName: recipeName });
              }}
            >
              <Row
                w="100%"
                paddingX="10px"
                paddingY="15px"
                borderBottomWidth={1}
              >
                <Heading size="sm">{recipeName}</Heading>
              </Row>
            </Pressable>
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
