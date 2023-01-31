"An abstraction on top of the AsyncStorage module";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, value: object | string) => {
  try {
    const stringValue =
      typeof value == "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.log(`Failed to save ${key} with error ${e}`);
  }
};

export const fetchData = async (key: string) => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value == null || typeof value == "string"
      ? value
      : JSON.parse(value);
  } catch (e) {
    console.log(`Failed to fetch ${key} with error ${e}`);
  }
};

export enum StorageKeys {
  RECIPES = "recipe-book",
  COLOR = "color-mode",
  FRACTION = "fraction-mode",
}
