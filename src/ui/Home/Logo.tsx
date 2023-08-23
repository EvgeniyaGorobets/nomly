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
    <View>
      <Image
        key={String(context.prefs.darkMode)}
        source={logo}
        style={{ width: 120, height: 30, marginHorizontal: 10 }}
      />
    </View>
  );
};
