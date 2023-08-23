import React, { useContext } from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const DeleteRecipesModal = ({ isOpen, closeModal }: ModalProps) => {
  const theme = useTheme();
  const context: AppContextType = useContext(AppContext);

  return (
    <Portal>
      <Dialog visible={isOpen}>
        <Dialog.Title>Delete all recipes?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            This will permanently delete all recipes you currently have saved on
            <Text style={{ fontWeight: "bold" }}> nomly</Text>. Are you sure you
            want to continue?
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-between" }}>
          <Button
            onPress={() => closeModal()}
            style={{ padding: 5 }}
            labelStyle={theme.fonts.bodyLarge}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              context.saveRecipes({});
              closeModal();
            }}
            style={{ padding: 5 }}
            labelStyle={theme.fonts.bodyLarge}
          >
            Yes, delete all recipes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
