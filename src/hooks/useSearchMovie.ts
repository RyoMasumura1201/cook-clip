import { useAxios } from '@/lib/axios';
import { YoutubeMovie } from '@/types';
import { useQuery } from 'react-query';
export const useSearchMovie = (searchText: string) => {
  const { axios } = useAxios();
  const url = '/videos';
  const getMovies = (): Promise<YoutubeMovie[]> => {
    return axios.get(url, {
      params: {
        searchText,
      },
    });
  };
  return useQuery('movies', () => getMovies());
};
