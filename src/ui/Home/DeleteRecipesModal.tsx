import React, { useContext } from "react";
import { Text, Row, Button, Modal } from "native-base";

import { AppContext, AppContextType } from "../../AppContext";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const DeleteRecipesModal = ({ isOpen, closeModal }: ModalProps) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <Modal isOpen={isOpen}>
      <Text>
        This will permanently delete all recipes you currently have saved on
        nomly. Are you sure you want to continue?
      </Text>
      <Row>
        <Button onPress={() => closeModal()}>
          <Text>Cancel! Don't delete anything!</Text>
        </Button>
        <Button
          onPress={() => {
            context.saveRecipes({});
            closeModal();
          }}
        >
          <Text>Yes, delete all recipes</Text>
        </Button>
      </Row>
    </Modal>
  );
};
