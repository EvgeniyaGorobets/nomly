module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-navigation-tabs" +
      "|react-native-splash-screen" +
      "|react-native-screens" +
      "|react-native-reanimated" +
      "|expo-document-picker" +
      "|expo-file-system" +
      "|expo-modules-core" +
      "|react-native-vector-icons" +
      "|react-native-paper-dropdown" +
      "|@react-navigation" +
      "|react-native-paper" +
      ")/)",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
