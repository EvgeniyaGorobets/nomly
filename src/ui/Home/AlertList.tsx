import React, { useContext } from "react";
import {
  Row,
  Icon,
  Heading,
  Alert,
  Text,
  Column,
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { AppContext, AppContextType } from "../../AppContext";
import { AppAlert, deleteAlert } from "../../core/alert";

export const AlertList = ({}) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <Column zIndex={100} w="100%">
      {context.alerts.map((alert: AppAlert, i: number) => (
        <Alert
          key={i}
          status={alert.status}
          variant="top-accent"
          maxHeight="80px"
          width="100%"
          marginBottom="5px"
        >
          <Row w="100%">
            <Column flexGrow={1}>
              <Row>
                <Alert.Icon />
                <Heading size="xs">{alert.title}</Heading>
              </Row>
              <Row>
                <Text fontSize="xs">{alert.description}</Text>
              </Row>
            </Column>
            <Column justifyContent="flex-start" alignItems="center">
              <IconButton
                marginTop="-10px"
                height="25px"
                width="25px"
                icon={
                  <Icon
                    as={AntDesign}
                    name="close"
                    size="sm"
                    _light={{ color: "dark.300" }}
                    _dark={{ color: "light.500" }}
                  />
                }
                onPress={() =>
                  context.setAlerts(deleteAlert(i, context.alerts))
                }
              />
            </Column>
          </Row>
        </Alert>
      ))}
    </Column>
  );
};
