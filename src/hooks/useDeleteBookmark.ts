import { useAxios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { deleteParameterType } from '@/types/index';
import { queryClient } from '@/lib/react-query';
import { Bookmark } from '@prisma/client';
import { useHandleToast } from '@/hooks/useHandleToast';

export const useDeleteBookmark = (data: deleteParameterType, videoId: string) => {
  const { axios } = useAxios();
  const { deleteBookmarkToast } = useHandleToast();

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
        deleteBookmarkToast();
      },
      mutationFn: deleteBookmark,
    });
  };

  return { useHandleDeleteBookmark };
};
