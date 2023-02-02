import React, { useContext, useState } from "react";
import {
  Center,
  Row,
  Fab,
  Icon,
  ScrollView,
  Box,
  Heading,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { RecipesMenu } from "./RecipesMenu";
import { SearchBar } from "./SearchBar";
import { getSafePadding } from "../theme";

export const Home = ({ navigation }: HomeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const insets: EdgeInsets = useSafeAreaInsets();

  return (
    <Center padding={getSafePadding(insets)}>
      <Row w="100%" justifyContent="space-between" my="15px">
        <Heading>nomly</Heading>
        <RecipesMenu />
      </Row>
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
              <Box
                w="100%"
                paddingX="10px"
                paddingY="15px"
                borderBottomWidth={1}
                borderColor="gray.300"
              >
                <Heading size="sm">{recipeName}</Heading>
              </Box>
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
