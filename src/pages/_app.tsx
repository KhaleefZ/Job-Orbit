import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/lib/theme';
import AppLayout from '@/components/Layout/AppLayout';
import { ClientOnlyProviders } from '@/components/Providers/ClientOnlyProviders';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JOBORBIT - Your Career Mission Control</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Transform your job search with JOBORBIT's intelligent career planning platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider theme={theme}>
        <ClientOnlyProviders>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ClientOnlyProviders>
      </MantineProvider>
    </>
  );
}
