// Reference: https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { debounce } from "debounce";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { config } from "../env/config";
import { TopNav } from "../components/elements/TopNav";
import { store } from "../state/store";
import "../styles/globals.css";
import { saveState } from "../hooks/state";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

// Commit the redux state to local storage every 500ms second
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 500)
);

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{config.appName}</title>
        <meta name="description" content={config.description} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <div className="flex flex-col h-full">
              <div>
                <div className="bg-red-400 p-2">
                  This project in in early alpha - most things are still being
                  built and tested! It is not ready for any wonderful users yet!
                </div>
                <TopNav />
              </div>
              <div className="bg-light flex-grow">
                <Component {...pageProps} />
              </div>
            </div>
          </QueryClientProvider>
        </ReduxProvider>
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;
