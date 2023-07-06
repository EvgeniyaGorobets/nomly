import React, { useContext } from "react";
import { View } from "react-native";
import { Text, Portal, Modal, Button, Divider } from "react-native-paper";

import { AppContext, AppContextType } from "../../AppContext";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const DeleteRecipesModal = ({ isOpen, closeModal }: ModalProps) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <Portal>
      <Modal visible={isOpen}>
        <View>
          <Text variant="headlineLarge">Delete all recipes?</Text>
        </View>
        <Divider />
        <View>
          <Text variant="bodyLarge">
            This will permanently delete all recipes you currently have saved on
            <Text style={{ fontWeight: "bold" }}> nomly</Text>. Are you sure you
            want to continue?
          </Text>
        </View>
        <Divider />
        <View>
          <Button
            mode="contained"
            onPress={() => {
              context.saveRecipes({});
              closeModal();
            }}
          >
            Yes, delete all recipes
          </Button>
          <Button mode="outlined" onPress={() => closeModal()}>
            Cancel! Don't delete anything!
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
