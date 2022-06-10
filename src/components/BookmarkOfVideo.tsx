import { Text, Flex, Spacer } from '@chakra-ui/react';
import { Bookmark } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { memo } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useDeleteBookmark } from '@/hooks/useDeleteBookmark';
import { deleteParameterType } from '@/types/index';

type Props = {
  bookmark: Bookmark;
  ytPlayer: YT.Player | undefined;
  refetch: () => void;
};

const BookmarkOfVideo: React.VFC<Props> = (props) => {
  const { bookmark, ytPlayer, refetch } = props;
  const { data: session } = useSession();
  const email = session?.user.email as string;
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

  const deleteParameter: deleteParameterType = {
    data: {
      bookmarkId: bookmark.id,
      email: email,
    },
  };

  const { useHandleDeleteBookmark } = useDeleteBookmark(refetch);

  const deleteBookmark = useHandleDeleteBookmark();

  const removeTimeStamp = () => {
    deleteBookmark.mutateAsync(deleteParameter);
  };
  return (
    <>
      <Flex>
        <Text fontSize='x-large'>
          ・
          <a href='#' onClick={moveToTimestamp} className='link' style={{ color: '#639bb7' }}>
            {toHHMMSS(bookmark.startAt)} : {bookmark.title}
          </a>
        </Text>
        <Spacer />
        <FaTrash
          fontSize='large'
          color='gray'
          style={{ marginTop: '8px' }}
          onClick={removeTimeStamp}
          className='link'
        />
      </Flex>
    </>
  );
};

export default memo(BookmarkOfVideo);
