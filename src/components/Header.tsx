import { memo } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/layout';
import { HStack, Grid, GridItem } from '@chakra-ui/react';
import Session from './Session';

type Props = {
  isHome?: boolean;
};

const Header: React.VFC<Props> = (props) => {
  const { isHome } = props;
  return (
    <header style={{ textAlign: 'center' }}>
      {isHome ? (
        <Grid templateColumns='repeat(5, 1fr)'>
          <GridItem colStart={3}>
            <Text fontSize='xx-large' fontWeight='bold'>
              Cook Clip
            </Text>
          </GridItem>
          <GridItem>
            <Session />
          </GridItem>
        </Grid>
      ) : (
        <Grid templateColumns='repeat(5, 1fr)'>
          <GridItem colStart={3}>
            <Link href='/'>
              <a>
                <Text fontSize='xx-large' fontWeight='bold'>
                  Cook Clip
                </Text>
              </a>
            </Link>
          </GridItem>
          <GridItem>
            <Session />
          </GridItem>
        </Grid>
      )}
    </header>
  );
};

export default memo(Header);
