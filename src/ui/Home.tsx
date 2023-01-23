import React, { ReactElement } from "react";
import {
  Text,
  Center,
  IconButton,
  Row,
  Fab,
  Icon,
  Input,
  ScrollView,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RecipeBook } from "../core/RecipeBook";
import type { AppStack } from '../Stack';
import { AppContext, AppContextType } from "../AppContext";

const UploadIcon: ReactElement = <Icon as={AntDesign} name="upload" />;

const PlusIcon: ReactElement = <Icon as={AntDesign} name="plus" />;

const searchBar: ReactElement = (
  <Input
    placeholder="Search People & Places"
    width="100%"
    borderRadius="4"
    py="3"
    px="1"
    fontSize="14"
    InputLeftElement={
      <Icon
        m="2"
        ml="3"
        size="6"
        color="gray.400"
        as={AntDesign}
        name="search1"
      />
    }
  />
);

export const Home = ({ navigation }: NativeStackScreenProps<AppStack, 'Home'>) => {
  return (
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Row>
          <Text>nomly</Text>
          <IconButton icon={UploadIcon} />
        </Row>
        {searchBar}
        <ScrollView flex={1}>
          <AppContext.Consumer>
            {(context: AppContextType) => 
              Object.keys(context.recipes).map((recipeName: string, i: number) => (
                <Text key={i}>{recipeName}</Text>
              ))
            }
          </AppContext.Consumer>
        </ScrollView>
        <Fab renderInPortal={false} shadow={2} size="sm" icon={PlusIcon} onPress={() => navigation.navigate('Form')} />
      </Center>
  );
};
