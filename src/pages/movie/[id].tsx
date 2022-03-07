import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import YouTube from 'react-youtube';
import { Text, Box, Button, useDisclosure, AspectRatio } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { YoutubeMovie } from '@/types/index';
import { CHANNEL_ID_OF_RYUJI } from '@/config/index';
import { Loading } from '@/components/Loading';
import { RegistarTimeStamp } from '@/components/RegistarTimeStamp';
import { useState } from 'react';

type Props = {
  video: YoutubeMovie;
};

const MoviePage: NextPage<Props> = ({ video }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [YTPlayer, setYTPlayer] = useState<YT.Player>();
  const [time, setTime] = useState<number>();
  const opts = {
    width: '100%',
    height: '100%',
  };

  const makeYTPlayer = (e: { target: YT.Player }) => {
    setYTPlayer(e.target);
  };

  const handleMakeTimestamp = () => {
    YTPlayer?.pauseVideo();
    setTime(YTPlayer?.getCurrentTime());
    if (session) {
      onOpen();
    } else {
      signIn();
    }
  };

  return (
    <Layout>
      {video ? (
        <>
          <Box textAlign='center'>
            <Text fontWeight='bold' fontSize='large' mb='3'>
              {video.snippet.title}
            </Text>
            <AspectRatio ratio={16 / 9} maxW='640px' m='0 auto'>
              <YouTube videoId={video.id.videoId} opts={opts} onReady={makeYTPlayer} />
            </AspectRatio>
            <Button colorScheme='orange' onClick={handleMakeTimestamp} mt='3'>
              タイムスタンプ作成
            </Button>
          </Box>
          <RegistarTimeStamp
            isOpen={isOpen}
            onClose={onClose}
            time={time}
            videoId={video.id.videoId}
          />
        </>
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
