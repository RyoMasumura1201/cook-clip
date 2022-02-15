import {
  Text,
  Box,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const RegistarTimeStamp: React.VFC<Props> = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タイムスタンプ登録</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing='2'>
            <Text fontWeight='bold'>タイトル</Text>
            <Input />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            登録
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
