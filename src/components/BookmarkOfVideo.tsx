import { Text } from '@chakra-ui/react';
import { Bookmark } from '@prisma/client';
type Props = {
  bookmark: Bookmark;
};
export const BookmarkOfVideo: React.VFC<Props> = (props) => {
  const { bookmark } = props;
  return (
    <Text fontSize='large'>
      {bookmark.title} : {bookmark.startAt}
    </Text>
  );
};
