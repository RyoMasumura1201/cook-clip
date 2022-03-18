import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { notificationListState } from '@/stores/notifications';
import { nanoid } from 'nanoid';

type InputType = {
  startAt: number;
  videoId: string;
  title: string;
  email: string;
};
export const useRegisterBookmark = (onClose: () => void) => {
  const { axios } = useAxios();
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmark';

  const registerBookmark = async (data: InputType) => {
    return axios.post(url, data);
  };

  const useHandleRegisterBookmark = () => {
    return useMutation(registerBookmark, {
      onSuccess: () => {
        onClose();
        setNotificationList([
          ...notificationList,
          {
            id: nanoid(),
            type: 'success',
            title: 'Success',
            message: '登録しました',
          },
        ]);
      },
    });
  };

  return { useHandleRegisterBookmark };
};
