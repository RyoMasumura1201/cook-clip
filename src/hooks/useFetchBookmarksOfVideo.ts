import { useAxios } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Bookmark } from '@prisma/client';

export const useFetchBookmarksOfVideo = (videoId: string, email: string) => {
  console.log('******fetchbookmark');
  console.log(email);
  console.log('******fetchbookmark');
  const { axios } = useAxios();
  const url = '/bookmarks';
  const getBookmarksOfVideo = (): Promise<Bookmark[]> => {
    return axios.get(url, {
      params: {
        videoId,
        email,
      },
    });
  };
  return useQuery('bookmarksOfVideo', () => getBookmarksOfVideo());
};
