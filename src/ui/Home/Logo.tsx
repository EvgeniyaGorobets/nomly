import React from "react";
import { Image } from "react-native";
import { useColorModeValue } from "native-base";
// @ts-ignore
import lightLogo from "../../../assets/nomly_logo_light.png";
// @ts-ignore
import darkLogo from "../../../assets/nomly_logo_dark.png";

export const Logo = () => {
  const colorMode: "light" | "dark" = useColorModeValue("light", "dark");

  // need to set a new key on Image to force it to rerender
  // https://stackoverflow.com/questions/50186932/react-native-cant-rerender-image-after-state-change
  return (
    <Image
      key={colorMode}
      source={colorMode === "light" ? lightLogo : darkLogo}
      // alt="nomly logo"  // need higher version of react for alt; might come back to this
    />
  );
};
