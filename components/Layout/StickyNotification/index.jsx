import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./StickyNotification.module.scss";
import { notificationGetAllByUserId } from "../../../endpoint/Notification";
import { useSelector } from "react-redux";

export default function StickyNotification() {
  const { user } = useSelector((state) => state.logedInData);
  const [notificationData, setNotificationData] = useState(null);

  console.log(notificationData);
  useEffect(() => {
    if (user.user_id) {
      const body = {
        and_broadcast: true,
        is_important: true,
      };
      notificationGetAllByUserId(user.user_id, body)
        .then((response) => {
          setNotificationData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  return (
    <>
      <div className={style.sticky_notif}>
        <div className={style.sticky_notif__wrapper}>
          <Link href="/notification">
            <div className={style.sticky_notif__button}>
              <div className={style.sticky_notif__button__icon}>
                <picture>
                  <img src="/images/icon/bell.svg" alt="notification" />
                  <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                </picture>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
