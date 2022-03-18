import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

type InputType = {
  startAt: number;
  videoId: string;
  title: string;
  email: string;
};
export const useRegisterBookmark = (onClose: () => void) => {
  const { axios } = useAxios();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmark';

  const registerBookmark = async (data: InputType) => {
    return axios.post(url, data);
  };

  const useHandleRegisterBookmark = () => {
    return useMutation(registerBookmark, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return { useHandleRegisterBookmark };
};
