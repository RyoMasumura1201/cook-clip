import { memo } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Text, Button } from '@chakra-ui/react';

const Session: React.VFC = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <Text>{session.user?.name}</Text>
          <Button onClick={() => signOut()}>ログアウト</Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>ログイン</Button>
        </>
      )}
    </>
  );
};

export default memo(Session);
