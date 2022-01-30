import { memo } from 'react';
import { YoutubeMovie } from '../../type';
import YouTube from 'react-youtube';

type Props = {
  video: YoutubeMovie;
};

const opts = {
  height: '225',
  width: '400',
};

const Movie: React.VFC<Props> = (props) => {
  const { video } = props;
  return <YouTube videoId={video.id.videoId} opts={opts} />;
};

export default memo(Movie);
