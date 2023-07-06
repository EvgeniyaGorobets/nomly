import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

type SearchBarProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <View>
      <Searchbar placeholder="Search" onChangeText={setQuery} value={query} />
    </View>
  );
};
