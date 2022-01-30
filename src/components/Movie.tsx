import { memo } from 'react';
import { YoutubeMovie } from '../../type';
import YouTube from 'react-youtube';
import { Box, Stack, Text, VStack } from '@chakra-ui/react';

type Props = {
  video: YoutubeMovie;
};

const opts = {
  height: '225',
  width: '400',
};

const Movie: React.VFC<Props> = (props) => {
  const { video } = props;
  return (
    <Box width='400px' height='300px'>
      <Stack textAlign='center'>
        <YouTube videoId={video.id.videoId} opts={opts} />
        <Text>{video.snippet.title}</Text>
      </Stack>
    </Box>
  );
};

export default memo(Movie);
