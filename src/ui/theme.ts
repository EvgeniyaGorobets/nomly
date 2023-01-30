import { extendTheme } from "native-base";
import { EdgeInsets } from "react-native-safe-area-context";

export const getSafePadding = (insets: EdgeInsets): string => {
  return `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`;
};

// extend the theme
export const THEME = extendTheme({
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
type MyThemeType = typeof THEME;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
