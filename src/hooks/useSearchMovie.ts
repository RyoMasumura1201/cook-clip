import { useState } from 'react';
import { CHANNEL_ID_OF_RYUJI } from '../../const';
export const useSearchMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchMovie = async (searchText: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
          CHANNEL_ID_OF_RYUJI +
          '&maxResults=10' +
          '&q=' +
          searchText +
          '&key=' +
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      );
      const data = await res.json();
      const items = data.items;
      return items;
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, searchMovie };
};
