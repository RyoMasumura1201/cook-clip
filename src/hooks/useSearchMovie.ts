import { useCallback, useState } from 'react';
import { CHANNEL_ID_OF_RYUJI } from '@/config/index';
import { useAxios } from '@/lib/axios';
import { SearchMovieResult } from '@/types';
export const useSearchMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { axios } = useAxios();
  const searchMovie = useCallback(
    async (searchText: string) => {
      try {
        setIsLoading(true);
        const url =
          'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
          CHANNEL_ID_OF_RYUJI +
          '&maxResults=10' +
          '&q=' +
          searchText +
          '&key=' +
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const data = await axios.get<never, SearchMovieResult>(url);
        return data.items;
      } catch (err) {
        console.log(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [axios],
  );

  return { isLoading, isError, searchMovie };
};
