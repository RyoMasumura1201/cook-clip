import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { AppProvider } from '@/providers/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
