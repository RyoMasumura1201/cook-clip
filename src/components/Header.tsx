import { memo } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/layout';
import { BsBookmarkHeartFill } from 'react-icons/bs';
import { Flex, Spacer } from '@chakra-ui/react';
import Session from '@/components/Session';

type Props = {
  isHome?: boolean;
};

const Header: React.VFC<Props> = (props) => {
  const { isHome } = props;
  return (
    <header style={{ textAlign: 'center' }}>
      {isHome ? (
        <Flex>
          <Text fontSize='xx-large' fontWeight='bold' whiteSpace='nowrap' ml='3'>
            Cook Clip
          </Text>
          <Spacer />
          <Link href='/bookmark'>
            <a>
              <Text color='orange' mr='3' p='3' className='link'>
                <BsBookmarkHeartFill size='35' />
              </Text>
            </a>
          </Link>
          <Session />
        </Flex>
      ) : (
        <Flex>
          <Link href='/'>
            <a>
              <Text fontSize='xx-large' fontWeight='bold' whiteSpace='nowrap' ml='3'>
                Cook Clip
              </Text>
            </a>
          </Link>
          <Spacer />
          <Link href='/bookmark'>
            <a>
              <Text color='orange' mr='3' p='3' className='link'>
                <BsBookmarkHeartFill size='35' />
              </Text>
            </a>
          </Link>
          <Session />
        </Flex>
      )}
    </header>
  );
};

export default memo(Header);
