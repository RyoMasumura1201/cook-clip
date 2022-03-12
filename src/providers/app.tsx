import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';

type Props = {
  children: React.ReactNode;
  session: Session | null | undefined;
};
export const AppProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider>{children}</ChakraProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};
