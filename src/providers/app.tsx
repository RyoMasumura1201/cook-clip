import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Session } from 'next-auth';

type Props = {
  children: React.ReactNode;
  session: Session | null | undefined;
};
export const AppProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  );
};
