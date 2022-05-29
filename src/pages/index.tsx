import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Wrap, WrapItem, HStack, Input, Button } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import Movie from '@/components/Movie';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import { useSearchMovie } from '@/hooks/useSearchMovie';
import { Video } from '@prisma/client';

type Props = {
  items: Video[];
};

const Home: NextPage<Props> = () => {
  const [searchText, setSearchText] = useState('');
  const { isLoading, isError, data, refetch } = useSearchMovie(searchText);

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };
  const handleSearchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
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
        <Wrap justify='center' mt='4' spacing='1'>
          {data?.slice(0, 20).map((item: Video) => (
            <WrapItem key={item.videoId} m='0 auto'>
              <Movie video={item} />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Layout>
  );
};

export default Home;
