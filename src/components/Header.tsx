import { memo } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/layout';
import Session from './Session';

type Props = {
  isHome?: boolean;
};

const Header: React.VFC<Props> = (props) => {
  const { isHome } = props;
  return (
    <header style={{ textAlign: 'center' }}>
      {isHome ? (
        <>
          <Text fontSize='xx-large' fontWeight='bold'>
            Cook Clip
          </Text>
          <Session />
        </>
      ) : (
        <>
          <Link href='/'>
            <a>
              <Text fontSize='xx-large' fontWeight='bold'>
                Cook Clip
              </Text>
            </a>
          </Link>
          <Session />
        </>
      )}
    </header>
  );
};

export default memo(Header);
