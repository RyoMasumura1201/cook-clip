import { memo } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/layout';
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
          <Session />
        </Flex>
      ) : (
        <Flex position='fixed' width='100%' zIndex='1' bg='white'>
          <Link href='/'>
            <a>
              <Text fontSize='xx-large' fontWeight='bold' whiteSpace='nowrap' ml='3'>
                Cook Clip
              </Text>
            </a>
          </Link>
          <Spacer />
          <Session />
        </Flex>
      )}
    </header>
  );
};

export default memo(Header);
