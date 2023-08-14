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

const fonts = {
  titleMedium: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "300",
  },
};

export const DefaultTheme = merge(CombinedLightTheme, {
  colors: {
    primary: "rgb(0, 108, 83)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(129, 248, 209)",
    onPrimaryContainer: "rgb(0, 33, 23)",
    secondary: "rgb(76, 99, 90)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(206, 233, 220)",
    onSecondaryContainer: "rgb(8, 32, 24)",
    tertiary: "rgb(64, 99, 118)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(195, 232, 254)",
    onTertiaryContainer: "rgb(0, 30, 43)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 253, 249)",
    onBackground: "rgb(25, 28, 27)",
    surface: "rgb(251, 253, 249)",
    onSurface: "rgb(25, 28, 27)",
    surfaceVariant: "rgb(234, 240, 237)",
    // ^ This is the only color I changed from the OG palette
    // Originally it was "rgb(219, 229, 223)",
    // But I moved the lightness from 88% to 93%
    onSurfaceVariant: "rgb(63, 73, 68)",
    outline: "rgb(112, 121, 116)",
    outlineVariant: "rgb(191, 201, 195)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 47)",
    inverseOnSurface: "rgb(239, 241, 238)",
    inversePrimary: "rgb(99, 219, 181)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 246, 241)",
      level2: "rgb(231, 241, 236)",
      level3: "rgb(223, 237, 231)",
      level4: "rgb(221, 236, 229)",
      level5: "rgb(216, 233, 226)",
    },
    surfaceDisabled: "rgba(25, 28, 27, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 27, 0.38)",
    backdrop: "rgba(41, 50, 46, 0.4)",
  },
  fonts: fonts,
});

export const DarkModeTheme = merge(CombinedDarkTheme, {
  colors: {
    primary: "rgb(99, 219, 181)",
    onPrimary: "rgb(0, 56, 42)",
    primaryContainer: "rgb(0, 81, 62)",
    onPrimaryContainer: "rgb(129, 248, 209)",
    secondary: "rgb(178, 204, 192)",
    onSecondary: "rgb(30, 53, 45)",
    secondaryContainer: "rgb(52, 76, 67)",
    onSecondaryContainer: "rgb(206, 233, 220)",
    tertiary: "rgb(167, 204, 225)",
    onTertiary: "rgb(12, 52, 69)",
    tertiaryContainer: "rgb(39, 75, 93)",
    onTertiaryContainer: "rgb(195, 232, 254)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 27)",
    onBackground: "rgb(225, 227, 224)",
    surface: "rgb(25, 28, 27)",
    onSurface: "rgb(225, 227, 224)",
    surfaceVariant: "rgb(63, 73, 68)",
    onSurfaceVariant: "rgb(191, 201, 195)",
    outline: "rgb(137, 147, 142)",
    outlineVariant: "rgb(63, 73, 68)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(225, 227, 224)",
    inverseOnSurface: "rgb(46, 49, 47)",
    inversePrimary: "rgb(0, 108, 83)",
    elevation: {
      level0: "transparent",
      level1: "rgb(29, 38, 35)",
      level2: "rgb(31, 43, 39)",
      level3: "rgb(33, 49, 44)",
      level4: "rgb(34, 51, 46)",
      level5: "rgb(35, 55, 49)",
    },
    surfaceDisabled: "rgba(225, 227, 224, 0.12)",
    onSurfaceDisabled: "rgba(225, 227, 224, 0.38)",
    backdrop: "rgba(41, 50, 46, 0.4)",
  },
  fonts: fonts,
});
