import { useAxios } from '@/lib/axios';
import { SubmitHandler } from 'react-hook-form';

type InputType = {
  startAt: number;
  videoId: string;
  title: string;
  email: string;
};
export const useRegisterBookmark = (onClose: () => void) => {
  const { axios } = useAxios();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmark';

  const registerBookmark: SubmitHandler<InputType> = async (data) => {
    const { startAt, videoId, title, email } = data;
    console.log(startAt);
    const res = await axios.post(url, {
      title,
      startAt,
      videoId,
      email: email,
    });
    console.log(res);
    onClose();
  };

  return { registerBookmark };
};
