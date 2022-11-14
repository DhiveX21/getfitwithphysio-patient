import "../styles/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import WithMaster from "../hoc/withMaster";
import { SessionProvider, useSession } from "next-auth/react";
import { LoadingLogo } from "../components/Loading";
import Head from "next/head";
import "reactjs-popup/dist/index.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>
          GET Fisio | One Stop Solution Women’s Health Physiotherapy Services
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Provider store={store}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <LoadingLogo icon="/images/roundedLogo.png" />;
  }

  return children;
}
