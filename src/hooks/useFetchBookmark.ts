import { useAxios } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Bookmark } from '@/types';
import { useSession } from 'next-auth/react';
export const useFetchBookmark = (videoId: string) => {
  const { axios } = useAxios();
  const { data } = useSession();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/bookmarks';
  const getBookmarks = (): Promise<Bookmark> => {
    return axios.get(url, { params: { userId: data?.user.id, videoId } });
  };
  return useQuery('bookmarksOfVideo', () => getBookmarks());
};
