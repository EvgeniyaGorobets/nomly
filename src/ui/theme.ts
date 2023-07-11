import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const DefaultTheme = merge(CombinedLightTheme, {
  colors: {
    primary: "#4ecca3", // or try "#6cd4b2"
    onPrimary: "#f9f9fa",
    primaryContainer: "#6cd4b2",
    onPrimaryContainer: "#c2f5e4", // this is too dark, needs more contrast

    error: "#ef4444",
  },
});

export const DarkModeTheme = merge(CombinedDarkTheme, {
  colors: {
    background: "#1f2022",
  },
  fonts: {
    titleMedium: {
      fontSize: 20,
    },
  },
});

// extend the theme
const NativeBaseTheme = {
  colors: {
    primary: {
      50: "#c2f5e4",
      100: "#a3edd4",
      200: "#86e2c3",
      300: "#6cd4b2",
      400: "#4ecca3", // this is the logo colour
      500: "#42be95",
      600: "#43a785",
      700: "#429076",
      800: "#407a67",
      900: "#3d6658",
    },
    dark: {
      50: "#5e78b1",
      100: "#526795",
      200: "#4a5876",
      300: "#3f4759",
      400: "#2e3441",
      500: "#272b31",
      600: "#1f2022",
      700: "#151515",
      800: "#0a0908",
      900: "#-3-3-2",
    },
    light: {
      50: "#f9f9fa",
      100: "#edf0f4",
      200: "#d6dbe4",
      300: "#c1c7d1",
      400: "#abb2bf", // this is the 'light' color in OneDarker Palette
      500: "#a2a7b0",
      600: "#9c9d9f",
      700: "#96938d",
      800: "#928a7a",
      900: "#8e8067",
    },
  },
  fontSizes: {
    "2xs": "10px",
    xs: "12px",
    sm: "16px",
    md: "18px",
    lg: "22px",
    xl: "28px",
    "2xl": "32px",
    "3xl": "36px",
  },
  components: {
    Input: {
      defaultProps: {
        variant: "underlined",
        fontSize: "md",
        _light: { color: "dark.600", borderColor: "light.200" },
        _dark: {
          color: "light.400",
          borderColor: "light.500",
          backgroundColor: "dark.600",
        },
        _focus: {
          _dark: {
            borderColor: "primary.300",
            backgroundColor: "dark.500",
          },
        },
        _disabled: {
          borderBottomWidth: 0,
          _dark: { color: "light.100" },
        },
      },
    },
    Text: {
      defaultProps: {
        fontSize: "md",
        _light: { color: "dark.600" },
        _dark: { color: "light.400" },
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
        _light: { color: "red.600" },
        _dark: { color: "light.400" },
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
        _dark: { bg: "dark.600" },
        _light: { bg: "light.50" },
        flex: 1,
        px: 0,
        height: "100%",
        paddingBottom: "0px",
      },
    },
    HStack: {
      defaultProps: {
        _light: { borderColor: "light.200" },
        _dark: { borderColor: "light.500" },
      },
    },
    VStack: {
      defaultProps: {
        _light: { borderColor: "light.200" },
        _dark: { borderColor: "light.500" },
      },
    },
    Button: {
      defaultProps: {
        _text: {
          _dark: { color: "light.100" },
          _light: { color: "light.50" },
        },
      },
    },
    FormControlErrorMessage: {
      defaultProps: {
        _text: {
          _light: { color: "error.500" },
          _dark: { color: "error.400" },
        },
      },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
};
