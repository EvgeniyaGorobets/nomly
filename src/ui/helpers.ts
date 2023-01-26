// Helpers for styling UI components
import { EdgeInsets } from "react-native-safe-area-context";

export const getSafePadding = (insets: EdgeInsets): string => {
  return `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`;
};
