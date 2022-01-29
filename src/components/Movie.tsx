import { memo } from 'react';

type Props = {
  video: any;
};
const Movie: React.VFC<Props> = (props) => {
  const { video } = props;
  const url = 'https://www.youtube.com/embed/' + video.id.videoId;
  return <iframe id='ytplayer' src={url} width='480' height='270' />;
};

export default memo(Movie);
