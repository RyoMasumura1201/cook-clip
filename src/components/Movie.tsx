import { memo } from 'react';
import Link from 'next/link';
import { Box, Center, Text } from '@chakra-ui/react';
import { Video } from '@prisma/client';
import Image from 'next/image';

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
  const src = 'https://img.youtube.com/vi/' + video.videoId + '/mqdefault.jpg';
  return (
    <Box w='375px' h='260px' m='0 auto' textAlign='center'>
      <Link href={url}>
        <a className='link'>
          <Center>
            <Image src={src} width='320px' height='180px' alt='thumbnail' />
          </Center>
          <Text>{video.title}</Text>
        </a>
      </Link>
    </Box>
  );
};

export default memo(Movie);
