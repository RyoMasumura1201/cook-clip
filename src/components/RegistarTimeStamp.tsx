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

import { useSession } from 'next-auth/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  time: number | undefined;
  videoId: string;
};
export const RegistarTimeStamp: React.VFC<Props> = (props) => {
  const { isOpen, onClose, time, videoId } = props;

  const { data: session } = useSession();

  const [title, setTitle] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const registerTimeStamp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(time);

    const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmarks';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        startAt: time,
        movieId: videoId,
        email: session?.user?.email,
      }),
    });
    console.log(res);
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
