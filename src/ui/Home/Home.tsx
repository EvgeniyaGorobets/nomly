import React, { useContext, useState } from "react";
import {
  Center,
  Row,
  Fab,
  Icon,
  ScrollView,
  Heading,
  Pressable,
  useColorModeValue,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { RecipesMenu } from "./RecipesMenu";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { getSafePadding } from "../theme";
import { DeleteRecipesModal } from "./DeleteRecipesModal";

export const Home = ({ navigation }: HomeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const colorMode: "light" | "dark" = useColorModeValue("light", "dark");
  const insets: EdgeInsets = useSafeAreaInsets();

  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Center padding={getSafePadding(insets)}>
      <Row w="100%" justifyContent="space-between" my="15px">
        <Logo colorMode={colorMode} />
        <RecipesMenu openModal={() => setModalOpen(true)} />
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
      <Fab
        renderInPortal={false}
        shadow={2}
        icon={<Icon as={AntDesign} name="plus" size="lg" />}
        padding="10px"
        onPress={() => navigation.navigate("Form")}
      />
      <RecipeActionSheet
        isOpen={selectedRecipe != ""}
        recipeName={selectedRecipe}
        onClose={() => setSelected("")}
      />
    </Center>
  );
};
