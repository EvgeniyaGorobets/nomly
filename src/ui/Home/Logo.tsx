import React, { useContext } from "react";
import { Image, View } from "react-native";
// @ts-ignore
import lightLogo from "../../../assets/nomly_logo_light.png";
// @ts-ignore
import darkLogo from "../../../assets/nomly_logo_dark.png";

import { AppContext, AppContextType } from "../../AppContext";

export const Logo = () => {
  const context: AppContextType = useContext(AppContext);
  const logo = context.prefs.darkMode ? darkLogo : lightLogo;

  // need to set a new key on Image to force it to rerender
  // https://stackoverflow.com/questions/50186932/react-native-cant-rerender-image-after-state-change
  return (
    <View></View>
    //<Image
    //  key={context.prefs.darkMode}
    //  source={logo}
    // alt="nomly logo"  // need higher version of react for alt; might come back to this
    ///>
  );
};
