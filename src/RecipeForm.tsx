import React, { ReactElement } from "react";
import {
  Button,
  Text,
  Center,
  IconButton,
  Row,
  Icon,
  Input,
  ScrollView,
  Heading,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RecipeBook } from "./core/RecipeBook";
import type { AppStack } from './Stack';

const CloseIcon: ReactElement = <Icon as={AntDesign} name="close" />;

export const RecipeForm = ({ navigation }: NativeStackScreenProps<AppStack, 'Form'>) => {
  return (
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Row>
          <Heading>Add Recipe</Heading>
          <IconButton icon={CloseIcon} onPress={() => navigation.goBack()} />
        </Row>
        <ScrollView flex={1}>
          <RecipeBook.Consumer>
            {value => <Button>SAVE</Button>}
          </RecipeBook.Consumer>
        </ScrollView>
      </Center>
  );
};
