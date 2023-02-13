import React, { ReactElement } from "react";
import { IconButton, Row, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import type { RecipeFormProps, RecipeScreenProps } from "../../Stack";

type HeaderProps = {
  navigation: RecipeFormProps["navigation"] | RecipeScreenProps["navigation"];
  title: string;
  rightComponent?: ReactElement;
};

export const Header = ({ navigation, title, rightComponent }: HeaderProps) => {
  const insets: EdgeInsets = useSafeAreaInsets();

  return (
    <Row
      w="100%"
      alignItems="center"
      _dark={{ backgroundColor: "dark.500" }}
      _light={{ backgroundColor: "primary.400" }}
      paddingTop={`${insets.top}px`}
      paddingBottom="5px"
    >
      <IconButton
        marginRight="5px"
        icon={
          <Icon
            as={Ionicons}
            name="arrow-back"
            size="xl"
            _light={{ color: "light.50" }}
            _dark={{ color: "light.500" }}
          />
        }
        onPress={() => navigation.goBack()}
      />
      <Text
        fontSize="xl"
        fontWeight="medium"
        flexGrow={1}
        _light={{ color: "light.50" }}
      >
        {title}
      </Text>
      {rightComponent}
    </Row>
  );
};
