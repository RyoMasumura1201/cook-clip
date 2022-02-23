import { memo } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
const Session: React.VFC = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Flex pt='3' pb='3'>
          <Image
            src={session.user?.image ?? ''}
            width='35'
            height='35'
            alt='user image'
            className='user-image'
          />
          <Button variant='link' onClick={() => signOut()} ml='3' mr='3'>
            ログアウト
          </Button>
        </Flex>
      ) : (
        <Flex pt='4' pb='3'>
          <Button variant='link' onClick={() => signIn()} mr='3'>
            ログイン
          </Button>
        </Flex>
      )}
    </>
  );
};

export default memo(Session);
