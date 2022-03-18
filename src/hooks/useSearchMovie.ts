import { CHANNEL_ID_OF_RYUJI } from '@/config/index';
import { useAxios } from '@/lib/axios';
import { SearchMovieResult } from '@/types';
import { useQuery } from 'react-query';
export const useSearchMovie = (searchText: string) => {
  const { axios } = useAxios();
  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    CHANNEL_ID_OF_RYUJI +
    '&maxResults=10' +
    '&q=' +
    searchText +
    '&key=' +
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const getMovies = (): Promise<SearchMovieResult> => {
    return axios.get(url);
  };
  return useQuery('movies', () => getMovies());
};
