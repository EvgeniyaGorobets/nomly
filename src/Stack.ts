import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AppStack = {
  Home: undefined;
  Form: undefined;
};

export const Stack = createNativeStackNavigator<AppStack>();