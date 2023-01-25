import React, { ReactElement, useState } from "react";
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

const UploadIcon: ReactElement = <Icon as={AntDesign} name="upload" />;

const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

export const Home = ({ navigation }: HomeScreenProps) => {
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
        <IconButton icon={UploadIcon} />
      </Row>
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <ScrollView flex={1} w="100%" my="10px">
        <AppContext.Consumer>
          {(context: AppContextType) =>
            Object.keys(context.recipes)
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
              ))
          }
        </AppContext.Consumer>
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
