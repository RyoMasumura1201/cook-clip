import {
  Text,
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
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegisterBookmark } from '@/hooks/useRegisterBookmark';
import React, { memo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  startAt: number | undefined;
  videoId: string;
  refetch: () => void;
};
const RegistarBookmark: React.VFC<Props> = (props) => {
  const { isOpen, onClose, startAt, videoId, refetch } = props;

  const { data: session } = useSession();
  const email = session?.user.email as string;

  const schema = z.object({
    title: z.string().min(1, '1文字以上入力してください'),
  });
  type InputType = z.infer<typeof schema>;
  const { register, handleSubmit, formState } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const { useHandleRegisterBookmark } = useRegisterBookmark(
    onClose,
    refetch,
    startAt,
    videoId,
    email,
  );
  const registerBookmark = useHandleRegisterBookmark();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(async (data) => registerBookmark.mutateAsync(data))}>
          <ModalHeader>タイムスタンプ登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing='2'>
              <Text fontWeight='bold'>タイトル</Text>
              <Input {...register('title')} />
              <Text color='red.500'>{formState.errors.title?.message}</Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit' isLoading={registerBookmark.isLoading}>
              登録
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default memo(RegistarBookmark);
