"An abstraction on top of the AsyncStorage module";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (slot: StorageSlot, value: object | string) => {
  try {
    if (typeof value !== slot.type) {
      throw TypeError(
        `${slot.key} expects object of type ${
          slot.type
        }, but received object of type ${typeof value}`
      );
    }
    const stringValue =
      slot.type === "object" ? JSON.stringify(value) : (value as string);
    // superficial cast as string bc typescript isn't smart enough to realize that I already checked the type of value
    await AsyncStorage.setItem(slot.key, stringValue);
  } catch (e) {
    console.log(`Failed to save ${slot.key} with error:\n ${e}`);
  }
};

export const fetchData = async (slot: StorageSlot) => {
  try {
    const value: string | null = await AsyncStorage.getItem(slot.key);
    return slot.type === "object" && value !== null ? JSON.parse(value) : value;
  } catch (e) {
    console.log(`Failed to fetch ${slot.key} with error:\n ${e}`);
  }
};

type StorageSlot = {
  key: string;
  type: string;
};

export const storage: { [key: string]: StorageSlot } = {
  RECIPES: {
    key: "recipe-book",
    type: "object",
  },
  COLOR: {
    key: "color-mode",
    type: "string",
  },
  FRACTION: {
    key: "fraction-mode",
    type: "string",
  },
};
