import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import YouTube from 'react-youtube';
import Layout from '../../components/Layout';
import { YoutubeMovie } from '../../../type';
import { CHANNEL_ID_OF_RYUJI } from '../../..//const';
import { Text, Stack, Box, Spinner } from '@chakra-ui/react';

type Props = {
  video: YoutubeMovie;
};

const MoviePage: NextPage<Props> = ({ video }) => {
  const opts = {
    height: '225',
    width: '400',
  };
  console.log('video');
  console.log(video);
  return (
    <Layout>
      {video ? (
        <Stack textAlign='center'>
          <YouTube videoId={video.id.videoId} opts={opts} />
          <Text>{video.snippet.title}</Text>
        </Stack>
      ) : (
        <Box justifyContent='center'>
          <Spinner />
        </Box>
      )}
    </Layout>
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params');
  console.log(params);
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      CHANNEL_ID_OF_RYUJI +
      '&maxResults=1' +
      '&q=' +
      params?.id +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );

  const data = await res.json();
  console.log('data');
  console.log(data);

  const video = data.items[0];
  console.log('items[0]');
  console.log(video);

  return {
    props: { video },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      CHANNEL_ID_OF_RYUJI +
      '&maxResults=10' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );
  const data = await res.json();
  const items = data.items;

  console.log('items');
  console.log(items);
  const paths = items.map((item: YoutubeMovie) => ({
    params: { id: item.snippet.title },
  }));

  return { paths, fallback: true };
};
