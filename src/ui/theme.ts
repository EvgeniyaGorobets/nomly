import { extendTheme, StorageManager, ColorMode } from "native-base";
import { EdgeInsets } from "react-native-safe-area-context";

import { saveData, fetchData, StorageKeys } from "../core/storage";

export const getSafePadding = (insets: EdgeInsets): string => {
  return `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`;
};

export const colorModeManager: StorageManager = {
  get: async (): Promise<ColorMode> => {
    try {
      const colorMode = await fetchData(StorageKeys.COLOR);
      return colorMode === "dark" ? "dark" : "light";
    } catch (err) {
      console.log(`Error fetching color mode: ${err}`);
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await saveData(StorageKeys.COLOR, value as string);
    } catch (err) {
      console.log(`Error saving color mode: ${err}`);
    }
  },
};

// extend the theme
export const theme = extendTheme({
  fontSizes: {
    "2xs": "10px",
    xs: "12px",
    sm: "16px",
    md: "18px",
    lg: "24px",
    xl: "28px",
    "2xl": "32px",
    "3xl": "36px",
  },
  components: {
    Input: {
      defaultProps: {
        fontSize: "md",
      },
    },
    Text: {
      defaultProps: {
        fontSize: "md",
      },
    },
    Heading: {
      sizes: {
        sm: {
          fontSize: "18px",
        },
        md: {
          fontSize: "22px",
        },
        lg: {
          fontSize: "28px",
        },
      },
      defaultProps: {
        fontWeight: "medium",
      },
    },
    Icon: {
      defaultProps: {
        mx: "5px",
        my: "5px",
      },
    },
    // each screen is a Center component
    Center: {
      defaultProps: {
        _dark: { bg: "blueGray.900" },
        _light: { bg: "blueGray.50" },
        px: 4,
        flex: 1,
        height: "100%",
        paddingBottom: "0px",
        // figure out how to set proper safe area padding here as well
      },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
});

// not sure what the stuff below is for
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
