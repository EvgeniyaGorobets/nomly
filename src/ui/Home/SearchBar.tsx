import React from "react";
import { Row, Icon, Input } from "native-base";
import { AntDesign } from "@expo/vector-icons";

type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <Row w="100%">
      <Input
        variant="outline"
        w="100%"
        placeholder="Search recipes by name"
        value={query}
        onChangeText={setQuery}
        borderRadius="4"
        py="3"
        px="1"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            as={AntDesign}
            name="search1"
            _dark={{
              color: "light.500",
            }}
            _light={{
              color: "light.300",
            }}
          />
        }
      />
    </Row>
  );
};
