import '../styles/globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react";
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

  return (
    // Higher order component
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <Toaster />
          <NextNProgress
            color="#ec4899"
            startPosition={0.4}
            stopDelayMs={200}
            height={3}
            showOnShallow={false}
            options={{
              showSpinner: false
            }}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
