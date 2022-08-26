import "../styles/globals.css";
import "nextjs-breadcrumbs/dist/index.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import WithMaster from "../hoc/withMaster";
import { SessionProvider, useSession } from "next-auth/react";
import { LoadingLogo } from "../components/Loading";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
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

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <LoadingLogo icon="/images/roundedLogo.png" />;
  }

  return children;
}
