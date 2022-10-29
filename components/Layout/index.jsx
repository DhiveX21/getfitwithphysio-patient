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
  setControlLoading,
} from "../../store/actions/controlActions";
import { useSession } from "next-auth/react";
import StickyNotification from "./StickyNotification";

import { FullScreenModal } from "../Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import { notificationGetAllByUserId } from "../../endpoint/Notification";
import { setControlNotification } from "../../store/actions/controlActions";

export default function Layout(props) {
  const firstLoginFormCondition = useSelector(
    (state) => state.controlData.firstLoginForm
  );
  const controlNotification = useSelector(
    (state) => state.controlData.controlNotification
  );

  const {
    children,
    withoutHeader = false,
    withoutFooter = false,
    withoutStickyNotification = false,
    withoutStickyBottomNav = false,
  } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  //triger first form login
  useEffect(() => {
    //checking if the patient haven't completing the data
    // check if localstorage is from patient API
    // if localstorage is not from patient API , soo get it
    if (session && !session.credentials.user_id) {
      //get patientData by id user
      const res = signIn("credentials", {
        user_id: session.credentials.id,
        type: "patient",
        redirect: false,
      });
      res.then((response) => {
        if (response.ok === false) {
          dispatch(setFirstLoginForm(true));
        }
      });
    }
  }, [session]);

  useEffect(() => {
    if (session && session.credentials.user_id) {
      // check if localstorage is from patient API
      // if localstorage is not from patient API , soo get it
      //  get notification by id user
      //SAMPE SINI LAGI REQUEST IS READ
      const body = {
        and_broadcast: true,
        is_important: true,
        order_by: {
          key: "id",
          value: "desc",
        },
      };
      notificationGetAllByUserId(
        session.credentials.user_id
          ? session.credentials.user_id
          : session.credentials.id,
        body
      )
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].is_read === undefined) {
              dispatch(
                setControlNotification(
                  true,
                  response.data.data[i].title,
                  response.data.data[i].description,
                  session.credentials.user_id,
                  response.data.data[i].id
                )
              );
              break;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session]);

  //set Loading every change route
  useEffect(() => {
    const handleRouteChange = (cond) => {
      dispatch(
        setControlLoading(
          cond,
          "Loading",
          "Please Wait",
          "/images/controlLoading.gif"
        )
      );
    };

    router.events.on("routeChangeStart", () => {
      handleRouteChange(true);
    });
    router.events.on("routeChangeComplete", () => {
      handleRouteChange(false);
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        handleRouteChange(true);
      });
      router.events.off("routeChangeComplete", () => {
        handleRouteChange(false);
      });
    };
  }, []);

  return (
    <>
      <ControlLoading />
      {firstLoginFormCondition.active ? (
        <FirstLoginForm />
      ) : controlNotification.active ? (
        <FullScreenModal
          show={controlNotification.active}
          title={controlNotification.notification.title}
          message={controlNotification.notification.message}
          close={() => dispatch(setControlNotification(false, "", ""))}
        ></FullScreenModal>
      ) : (
        <>
          {!withoutHeader ? <Header /> : ""}
          <div className={`${style.layout} animation-popup`}>{children}</div>
          {!withoutStickyNotification ? <StickyNotification /> : ""}
          {!withoutStickyBottomNav ? <StickyBottomNav /> : ""}
          {!withoutFooter ? <Footer /> : ""}
        </>
      )}
    </>
  );
}
