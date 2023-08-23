import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  screen: {
    height: "100%",
  },
  content: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
