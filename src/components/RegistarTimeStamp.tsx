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
import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const RegistarTimeStamp: React.VFC<Props> = (props) => {
  const { isOpen, onClose } = props;

  const [title, setTitle] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const registerTimeStamp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={registerTimeStamp}>
          <ModalHeader>タイムスタンプ登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing='2'>
              <Text fontWeight='bold'>タイトル</Text>
              <Input value={title} onChange={onChangeTitle} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              登録
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
