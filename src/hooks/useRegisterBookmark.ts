import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';
import { Bookmark } from '@prisma/client';
import { useHandleToast } from '@/hooks/useHandleToast';

type InputType = {
  startAt?: number;
  videoId?: string;
  title: string;
  email?: string;
};

export const useRegisterBookmark = (
  onClose: () => void,
  startAt: number | undefined,
  videoId: string,
  email: string,
) => {
  const { axios } = useAxios();
  const { registerBookmarkToast } = useHandleToast();

  const registerBookmark = async (data: InputType): Promise<Bookmark> => {
    data.startAt = startAt;
    data.videoId = videoId;
    data.email = email;
    return axios.post('/bookmarks', data);
  };

  const useHandleRegisterBookmark = () => {
    return useMutation({
      onSuccess: async () => {
        onClose();
        await queryClient.cancelQueries(['bookmarksOfVideo', email, videoId]);
        const bookmarks = await axios.get('/bookmarks', {
          params: {
            videoId,
            email,
          },
        });
        queryClient.setQueryData(['bookmarksOfVideo', email, videoId], bookmarks);
        queryClient.invalidateQueries(['bookmarksOfVideo', email, videoId]);
        registerBookmarkToast();
      },
      mutationFn: registerBookmark,
    });
  };

  return { useHandleRegisterBookmark };
};
