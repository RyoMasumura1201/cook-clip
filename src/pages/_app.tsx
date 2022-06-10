import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { AppProvider } from '@/providers/app';
import Notifications from '@/components/Notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider session={pageProps.session}>
      <Notifications />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
