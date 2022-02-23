import { memo } from 'react';
import Link from 'next/link';
import { YoutubeMovie } from '../../type';
import YouTube from 'react-youtube';
import { Box, Stack, AspectRatio, Text, Center } from '@chakra-ui/react';

type Props = {
  video: YoutubeMovie;
};

const opts = {
  height: '180px',
  width: '320px',
};

const Movie: React.VFC<Props> = (props) => {
  const { video } = props;
  const url = '/movie/' + video.snippet.title;
  return (
    <Box w='375px' h='260px' m='0 auto' textAlign='center'>
      <Center>
        <YouTube videoId={video.id.videoId} opts={opts} />
      </Center>
      <Link href={url}>
        <a className='link'>{video.snippet.title}</a>
      </Link>
    </Box>
  );
};

export default memo(Movie);
