import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { YoutubeMovie } from '../../../type';
import { Text } from '@chakra-ui/react';

type Props = {
  item: YoutubeMovie;
};

const MoviePage: NextPage<Props> = ({ item }) => {
  return (
    <Layout>
      <Text>Post: {item.snippet.title}</Text>
    </Layout>
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      'UCW01sMEVYQdhcvkrhbxdBpw' + //リュウジさんのchannelId
      '&maxResults=1' +
      '&q=' +
      params?.id +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );

  const data = await res.json();

  const item = data.items[0];

  return {
    props: { item },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      'UCW01sMEVYQdhcvkrhbxdBpw' + //リュウジさんのchannelId
      '&maxResults=10' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );
  const data = await res.json();
  const items = data.items;

  const paths = items.map((item: YoutubeMovie) => ({
    params: { id: item.snippet.title },
  }));

  return { paths, fallback: true };
};
