import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import YouTube from 'react-youtube';
import { Text, Box, Button, useDisclosure, AspectRatio } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { Loading } from '@/components/Loading';
import { RegistarBookmark } from '@/components/RegistarBookmark';
import { useFetchBookmarksOfVideo } from '@/hooks/useFetchBookmarksOfVideo';
import { useState } from 'react';
import { prisma } from '@/lib/prisma';
import { Video } from '@prisma/client';
import { BookmarkOfVideo } from '@/components/BookmarkOfVideo';

type Props = {
  video: Video;
};

const MoviePage: NextPage<Props> = ({ video }) => {
  const { data: session } = useSession();
  const email = session?.user.email as string;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [YTPlayer, setYTPlayer] = useState<YT.Player>();
  const [startAt, setStartAt] = useState<number>();
  const opts = {
    width: '100%',
    height: '100%',
  };

  const makeYTPlayer = (e: { target: YT.Player }) => {
    setYTPlayer(e.target);
  };

  const handleMakeTimestamp = () => {
    YTPlayer?.pauseVideo();
    setStartAt(YTPlayer?.getCurrentTime());
    if (session) {
      onOpen();
    } else {
      signIn();
    }
  };

  const { isLoading, isError, data, refetch } = useFetchBookmarksOfVideo(video?.videoId, email);

  return (
    <Layout>
      {video ? (
        <>
          <Box textAlign='center'>
            <Text fontWeight='bold' fontSize='large' mb='3'>
              {video.title}
            </Text>
            <AspectRatio ratio={16 / 9} maxW='640px' m='0 auto'>
              <YouTube videoId={video.videoId} opts={opts} onReady={makeYTPlayer} />
            </AspectRatio>
            <Button colorScheme='orange' onClick={handleMakeTimestamp} mt='3' mb='10'>
              タイムスタンプ作成
            </Button>
            {data?.map((item) => (
              <BookmarkOfVideo bookmark={item} key={item.id} />
            ))}
          </Box>
          <RegistarBookmark
            isOpen={isOpen}
            onClose={onClose}
            startAt={startAt}
            videoId={video.videoId}
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
  const videoId = params?.id as string;
  const video = await prisma.video.findUnique({
    where: {
      videoId: videoId,
    },
  });

  return {
    props: { video },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const videos = await prisma.video.findMany();

  const paths = videos.map((item) => ({
    params: { id: item.videoId },
  }));

  return { paths, fallback: true };
};
