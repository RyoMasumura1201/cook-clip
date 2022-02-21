import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Wrap, WrapItem, HStack, Input, Button, FormControl } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Movie from '../components/Movie';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { YoutubeMovie } from '../../type';
import { CHANNEL_ID_OF_RYUJI } from '../../const';
import { useSearchMovie } from '../hooks/useSearchMovie';

type Props = {
  items: YoutubeMovie[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      CHANNEL_ID_OF_RYUJI +
      '&maxResults=10' +
      '&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  );
  const data = await res.json();
  const items = data.items;
  return {
    props: { items },
  };
};

const Home: NextPage<Props> = ({ items }) => {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState<YoutubeMovie[]>(items);
  const { isLoading, isError, searchMovie } = useSearchMovie();
  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };
  const handleSearchMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = await searchMovie(searchText);
    if (!isError) {
      setMovieList([...items]);
    }
  };
  return (
    <Layout isHome>
      <form onSubmit={handleSearchMovie}>
        <HStack w={{ base: '90%', md: '70%' }} m='0 auto'>
          <Input value={searchText} onChange={onChangeSearchText} />
          <Button colorScheme='orange' type='submit'>
            検索
          </Button>
        </HStack>
      </form>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <Wrap justify='center' mt='4' spacing='10'>
          {movieList?.map((item: YoutubeMovie) => (
            <WrapItem key={item.id.videoId}>
              <Movie video={item} />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Layout>
  );
};

export default Home;
