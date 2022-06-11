import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';
import { deleteParameterType } from '@/types/index';
import { queryClient } from '@/lib/react-query';
import { Bookmark } from '@prisma/client';

export const useDeleteBookmark = (data: deleteParameterType, videoId: string) => {
  const { axios } = useAxios();
  const { addNotificationStore } = useNotificationStore();

  const deleteBookmark = async (data: deleteParameterType) => {
    return axios.delete('/bookmarks', data);
  };

  const useHandleDeleteBookmark = () => {
    return useMutation({
      onMutate: async (deletedBookmark) => {
        await queryClient.cancelQueries([
          'bookmarksOfVideo',
          data.data.email,
          data.data.bookmarkId,
        ]);

        const previousBookmarks = queryClient.getQueryData<Bookmark[]>([
          'bookmarksOfVideo',
          data.data.email,
          data.data.bookmarkId,
        ]);

        queryClient.setQueryData(
          ['bookmarksOfVideo', data.data.email, videoId],
          previousBookmarks?.filter((bookmark) => bookmark.id !== deletedBookmark.data.bookmarkId),
        );

        return { previousBookmarks };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['bookmarksOfVideo', data.data.email, videoId]);
        addNotificationStore({ type: 'success', message: '削除しました' });
      },
      mutationFn: deleteBookmark,
    });
  };

  return { useHandleDeleteBookmark };
};
