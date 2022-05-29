import { useAxios } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Video } from '@prisma/client';
export const useSearchMovie = (searchText: string) => {
  const { axios } = useAxios();
  const url = '/videos';
  const getMovies = (): Promise<Video[]> => {
    return axios.get(url, {
      params: {
        searchText,
      },
    });
  };
  return useQuery('movies', () => getMovies());
};
