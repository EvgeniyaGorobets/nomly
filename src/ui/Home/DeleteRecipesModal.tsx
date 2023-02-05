import React, { useContext } from "react";
import { Text, Row, Button, Modal, Heading, Column } from "native-base";

import { AppContext, AppContextType } from "../../AppContext";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const DeleteRecipesModal = ({ isOpen, closeModal }: ModalProps) => {
  const context: AppContextType = useContext(AppContext);

  return (
    <Modal isOpen={isOpen} size="lg">
      <Modal.Content>
        <Modal.Header>
          <Row justifyContent="center" w="100%">
            <Heading size="md">Delete all recipes?</Heading>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Text>
            This will permanently delete all recipes you currently have saved on
            <Text fontWeight="bold"> nomly</Text>. Are you sure you want to
            continue?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Column w="100%">
            <Button
              _text={{ fontWeight: "medium" }}
              marginBottom="10px"
              onPress={() => {
                context.saveRecipes({});
                closeModal();
              }}
            >
              Yes, delete all recipes
            </Button>
            <Button
              onPress={() => closeModal()}
              _light={{ borderColor: "error.500" }}
              _dark={{ borderColor: "error.400" }}
              _text={{
                fontWeight: "medium",
                _light: { color: "error.500" },
                _dark: { color: "error.400" },
              }}
              variant="outline"
            >
              Cancel! Don't delete anything!
            </Button>
          </Column>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
