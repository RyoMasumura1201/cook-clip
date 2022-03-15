import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Session } from 'next-auth';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '@/lib/react-query';

type Props = {
  children: React.ReactNode;
  session: Session | null | undefined;
};
export const AppProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};
