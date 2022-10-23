import Header from "./Header";
import Footer from "./Footer";
import StickyBottomNav from "./StickyBottomNav";
import style from "./Layout.module.css";
import { ControlLoading, FirstLoginForm } from "../Control";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setControlLoadingWithTimer,
  setFirstLoginForm,
} from "../../store/actions/controlActions";
import { useSession, getSession } from "next-auth/react";
import StickyNotification from "./StickyNotification";
import { patientGetOneByUserId } from "../../endpoint/User";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";

export default function Layout(props) {
  const {
    children,
    withoutHeader = false,
    withoutFooter = false,
    withoutStickyNotification = false,
    withoutStickyBottomNav = false,
  } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  //set Loading every change route
  useEffect(() => {
    //checking if the patient haven't completing the data
    const credentials = getLocalStorage("credentials");
    if (credentials) {
      if (credentials.item.name === credentials.item.phone_number) {
        patientGetOneByUserId(credentials.item.id)
          .then((response) => {
            if (response.status === 200) {
              setLocalStorage("credentials", response.data.data);
              router.reload(window.location.pathname);
            }
          })
          .catch((error) => {
            console.error(error);
            dispatch(setFirstLoginForm(true));
          });
      } else {
        dispatch(setFirstLoginForm(false));
      }
    }

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
      <ControlLoading />
      <FirstLoginForm />
      {!withoutHeader ? <Header /> : ""}
      <div className={style.layout}>{children}</div>
      {!withoutStickyNotification ? <StickyNotification /> : ""}
      {!withoutStickyBottomNav ? <StickyBottomNav /> : ""}
      {!withoutFooter ? <Footer /> : ""}
    </>
  );
}
