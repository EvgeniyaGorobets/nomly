import React, { ReactElement, useContext, useState } from "react";
import {
  Center,
  IconButton,
  Row,
  Fab,
  Icon,
  ScrollView,
  Box,
  Heading,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import type { HomeScreenProps } from "../../Stack";
import { AppContext, AppContextType } from "../../AppContext";
import { RecipeActionSheet } from "./RecipeActionSheet";
import { SearchBar } from "./SearchBar";
import { exportRecipeBook, importRecipeBook } from "../../core/backup";
import { RecipeBook } from "../../core/RecipeBook";

const UploadIcon: ReactElement = <Icon as={AntDesign} name="upload" />;
const DownloadIcon: ReactElement = <Icon as={AntDesign} name="download" />;

const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

export const Home = ({ navigation }: HomeScreenProps) => {
  const context: AppContextType = useContext(AppContext);
  const [selectedRecipe, setSelected] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <Row w="100%" justifyContent="space-between" my="15px">
        <Heading>nomly</Heading>
        <Box flexDirection="row">
          <IconButton
            icon={UploadIcon}
            onPress={async () => {
              const recipeBook: RecipeBook | null = await importRecipeBook();
              if (recipeBook != null) {
                context.saveRecipes(recipeBook as RecipeBook);
              }
            }}
          />
          <IconButton
            icon={DownloadIcon}
            onPress={() => exportRecipeBook(context.recipes)}
          />
        </Box>
      </Row>
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView flex={1} w="100%" my="10px">
        {Object.keys(context.recipes)
          .filter((recipeName: string) => recipeName.includes(searchQuery))
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
                padding="10px"
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
        size="sm"
        icon={PlusIcon}
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
