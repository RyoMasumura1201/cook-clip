import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

export const useHandleToast = () => {
  const toast = useToast();
  const registerBookmarkToast = useCallback(() => {
    toast({
      title: 'success',
      description: '登録しました',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }, [toast]);

  const deleteBookmarkToast = useCallback(() => {
    toast({
      title: 'success',
      description: '削除しました',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }, [toast]);

  const errorToast = useCallback(() => {
    toast({
      title: 'error',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }, [toast]);

  return { registerBookmarkToast, deleteBookmarkToast, errorToast };
};
