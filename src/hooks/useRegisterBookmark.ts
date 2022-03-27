import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';

type InputType = {
  startAt: number;
  videoId: string;
  title: string;
  email: string;
};
export const useRegisterBookmark = (onClose: () => void) => {
  const { axios } = useAxios();
  const { addNotificationStore } = useNotificationStore();

  const registerBookmark = async (data: InputType) => {
    return axios.post('/bookmarks', data);
  };

  const useHandleRegisterBookmark = () => {
    return useMutation(registerBookmark, {
      onSuccess: () => {
        onClose();
        addNotificationStore({ type: 'success', message: '登録しました' });
      },
    });
  };

  return { useHandleRegisterBookmark };
};
