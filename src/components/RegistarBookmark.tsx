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
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAxios } from '@/lib/axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  startAt: number | undefined;
  videoId: string;
};
export const RegistarBookmark: React.VFC<Props> = (props) => {
  const { isOpen, onClose, startAt, videoId } = props;

  const { data: session } = useSession();

  const { axios } = useAxios();
  const schema = z.object({ title: z.string().min(1, '1文字以上入力してください') });
  type InputType = z.infer<typeof schema>;
  const { register, handleSubmit, formState } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const registerBookmark: SubmitHandler<InputType> = async (data) => {
    console.log(startAt);
    const { title } = data;

    const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmark';
    const res = await axios.post(url, {
      title,
      startAt,
      videoId,
      email: session?.user?.email,
    });
    console.log(res);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(registerBookmark)}>
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
            <Button colorScheme='blue' mr={3} type='submit'>
              登録
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
