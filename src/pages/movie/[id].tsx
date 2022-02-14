import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import YouTube from 'react-youtube';
import { Text, Box, VStack, Button } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { YoutubeMovie } from '../../../type';
import { CHANNEL_ID_OF_RYUJI } from '../../..//const';
import { Loading } from '../../components/Loading';

type Props = {
  video: YoutubeMovie;
};

const MoviePage: NextPage<Props> = ({ video }) => {
  const opts = {
    height: '270',
    width: '480',
  };

  const handleMakeTimestamp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const iframe = document.getElementsByTagName('iframe');
    console.log(iframe[0]);
  };

  let player;
  const makeYTPlayer = () => {
    console.log('YT');
    player = new YT.Player('widget2', {});
    console.log(player);
  };

  return (
    <Layout>
      {video ? (
        <VStack textAlign='center' spacing='3'>
          <Text fontWeight='bold' fontSize='large'>
            {video.snippet.title}
          </Text>
          <Box m='0 auto'>
            <YouTube videoId={video.id.videoId} opts={opts} onReady={makeYTPlayer} />
          </Box>
          <Button colorScheme='orange' onClick={handleMakeTimestamp}>
            タイムスタンプ作成
          </Button>
        </VStack>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
      CHANNEL_ID_OF_RYUJI +
      '&maxResults=1' +
      '&q=' +
      params?.id +
      '&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
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
      CHANNEL_ID_OF_RYUJI +
      '&maxResults=10' +
      '&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  );
  const data = await res.json();
  const items = data.items;

  const paths = items.map((item: YoutubeMovie) => ({
    params: { id: item.snippet.title },
  }));

  return { paths, fallback: true };
};
