import React, { useContext } from "react";
import { View } from "react-native";
import { Banner, Text } from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";
import { AppAlert, deleteAlert } from "../../core/alert";

export const AlertList = ({}) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <View>
      {context.alerts.map((alert: AppAlert, i: number) => (
        <Banner
          visible={true}
          actions={[
            {
              label: "Dismiss",
              onPress: () => context.setAlerts(deleteAlert(i, context.alerts)),
            },
          ]}
          icon="alert"
        >
          <Text variant="displayMedium">{alert.title}</Text>
          <Text variant="bodyMedium">{alert.description}</Text>
        </Banner>
      ))}
    </View>
  );
};
