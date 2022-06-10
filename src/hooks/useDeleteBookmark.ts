import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';
import { deleteParameterType } from '@/types/index';

export const useDeleteBookmark = (refetch: () => void) => {
  const { axios } = useAxios();
  const { addNotificationStore } = useNotificationStore();

  const deleteBookmark = async (data: deleteParameterType) => {
    return axios.delete('/bookmarks', data);
  };

  const useHandleDeleteBookmark = () => {
    return useMutation(deleteBookmark, {
      onSuccess: () => {
        addNotificationStore({ type: 'success', message: '削除しました' });
        refetch();
      },
    });
  };

  return { useHandleDeleteBookmark };
};
