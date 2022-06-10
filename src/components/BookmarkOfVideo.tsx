import { Text } from '@chakra-ui/react';
import { Bookmark } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { memo } from 'react';

type Props = {
  bookmark: Bookmark;
  ytPlayer: YT.Player | undefined;
};

const BookmarkOfVideo: React.VFC<Props> = (props) => {
  const { bookmark, ytPlayer } = props;
  const toHHMMSS = (secValue: Decimal) => {
    const secInt = parseInt(secValue.toString(), 10);
    const hours = Math.floor(secInt / 3600);
    const minutes = Math.floor((secInt - hours * 3600) / 60);
    const seconds = secInt - hours * 3600 - minutes * 60;

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSecounds = seconds < 10 ? '0' + seconds : seconds;

    if (formattedHours == '00') {
      return formattedMinutes + ':' + formattedSecounds;
    }

    return formattedHours + ':' + formattedMinutes + ':' + formattedSecounds;
  };

  const moveToTimestamp = () => {
    ytPlayer?.seekTo(parseInt(bookmark.startAt.toString(), 10), true);
  };
  return (
    <Text fontSize='x-large'>
      ・
      <a href='#' onClick={moveToTimestamp} className='link' style={{ color: '#639bb7' }}>
        {toHHMMSS(bookmark.startAt)} : {bookmark.title}
      </a>
    </Text>
  );
};

export default memo(BookmarkOfVideo);
