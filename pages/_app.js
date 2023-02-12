import "../styles/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import WithMaster from "../hoc/withMaster";
import { SessionProvider, useSession } from "next-auth/react";
import { LoadingLogo } from "../components/Loading";
import { notificationGetAllByUserId } from "../endpoint/Notification";
import Head from "next/head";
import { getSession } from "next-auth/react";
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

export async function getStaticProps({ req }) {
  console.log(req);
  const session = await getSession({ req });
  const body = {
    and_broadcast: true,
    order_by: {
      key: "id",
      value: "desc",
    },
  };

  const notificationData = await notificationGetAllByUserId(
    session.credentials.user_id
      ? session.credentials.user_id
      : session.credentials.id,
    body
  )
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      return [];
    });

  return {
    props: { credentials: session?.credentials, notificationData },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
