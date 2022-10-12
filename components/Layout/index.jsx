import Header from "./Header";
import Footer from "./Footer";
import StickyBottomNav from "./StickyBottomNav";
import style from "./Layout.module.css";
import { ControlLoading } from "../Control";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setControlLoadingWithTimer } from "../../store/actions/controlActions";
import { useSession } from "next-auth/react";
import Head from "next/head";
import StickyNotification from "./StickyNotification";

export default function Layout(props) {
  const { children } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  //set Loading every change route
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      dispatch(
        setControlLoadingWithTimer(
          1000,
          "Loading",
          "Please Wait",
          "/images/controlLoading.gif"
        )
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <>
      <Head>
        <title>
          GET Fisio | One Stop Solution Women’s Health Physiotherapy Services
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <ControlLoading />
      <Header />
      <div className={style.layout}>{children}</div>
      <StickyNotification />
      <StickyBottomNav />
      <Footer />
    </>
  );
}
