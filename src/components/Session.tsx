import { memo } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, HStack } from '@chakra-ui/react';
import Image from 'next/image';
const Session: React.VFC = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <HStack p={2}>
          <Image
            src={session.user?.image ?? ''}
            width='35'
            height='35'
            alt='user image'
            className='user-image'
          />
          <Button variant='link' onClick={() => signOut()}>
            ログアウト
          </Button>
        </HStack>
      ) : (
        <>
          <Button variant='link' pt={3} onClick={() => signIn()}>
            ログイン
          </Button>
        </>
      )}
    </>
  );
};

export default memo(Session);
