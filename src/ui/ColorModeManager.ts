import { StorageManager, ColorMode } from "native-base";

import { saveData, fetchData, storage } from "../core/storage";

export const ColorModeManager: StorageManager = {
  get: async (): Promise<ColorMode> => {
    try {
      const colorMode = await fetchData(storage.COLOR);
      return colorMode === "dark" ? "dark" : "light";
    } catch (err) {
      console.log(`Error fetching color mode: ${err}`);
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await saveData(storage.COLOR, value as string);
    } catch (err) {
      console.log(`Error saving color mode: ${err}`);
    }
  },
};
