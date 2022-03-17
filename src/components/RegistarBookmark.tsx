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
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegisterBookmark } from '@/hooks/useRegisterBookmark';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  startAt: number | undefined;
  videoId: string;
};
export const RegistarBookmark: React.VFC<Props> = (props) => {
  const { isOpen, onClose, startAt, videoId } = props;

  const { data: session } = useSession();
  const email = session?.user.email as string;

  const schema = z.object({
    title: z.string().min(1, '1文字以上入力してください'),
    startAt: z
      .string()
      .refine((v) => {
        return !isNaN(Number(v));
      })
      .transform((v) => {
        return Number(v);
      }),
    videoId: z.string(),
    email: z.string(),
  });
  type InputType = z.infer<typeof schema>;
  const { register, handleSubmit, formState } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const { registerBookmark } = useRegisterBookmark(onClose);

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
              <VisuallyHiddenInput {...register('startAt')} defaultValue={startAt} />
              <VisuallyHiddenInput {...register('videoId')} defaultValue={videoId} />
              <VisuallyHiddenInput {...register('email')} defaultValue={email} />
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
