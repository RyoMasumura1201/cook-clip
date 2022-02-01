import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import YouTube from 'react-youtube';
import Layout from '../../components/Layout';
import { YoutubeMovie } from '../../../type';
import { CHANNEL_ID_OF_RYUJI } from '../../..//const';
import { Text, Stack, Box } from '@chakra-ui/react';

type Props = {
  video: YoutubeMovie;
};

const opts = {
  height: '225',
  width: '400',
};

const MoviePage: NextPage<Props> = ({ video }) => {
  return (
    <Layout>
      <Stack textAlign='center'>
        <YouTube videoId={video.id.videoId} opts={opts} />
        <Text>{video.snippet.title}</Text>
      </Stack>
    </Layout>
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      CHANNEL_ID_OF_RYUJI + //リュウジさんのchannelId
      '&maxResults=1' +
      '&q=' +
      params?.id +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
  );

  const data = await res.json();

  const video = data.items[0];

  return {
    props: { video },
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
