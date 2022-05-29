import { memo } from 'react';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { Box, Center } from '@chakra-ui/react';
import { Video } from '@prisma/client';

type Props = {
  video: Video;
};

const opts = {
  height: '180px',
  width: '320px',
};

const Movie: React.VFC<Props> = (props) => {
  const { video } = props;
  const url = '/movie/' + video.videoId;
  return (
    <Box w='375px' h='260px' m='0 auto' textAlign='center'>
      <Center>
        <YouTube videoId={video.videoId} opts={opts} />
      </Center>
      <Link href={url}>
        <a className='link'>{video.title}</a>
      </Link>
    </Box>
  );
};

export default memo(Movie);
