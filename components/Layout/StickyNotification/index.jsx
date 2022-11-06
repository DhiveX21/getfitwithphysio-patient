import Link from "next/link";
import style from "./StickyNotification.module.scss";

export default function StickyNotification() {
  return (
    <>
      <div className={style.sticky_notif}>
        <div className={style.sticky_notif__wrapper}>
          <Link href="/notification">
            <div className={style.sticky_notif__button}>
              <div className={style.sticky_notif__button__icon}>
                <picture>
                  <img src="/images/icon/message.png" alt="notification" />
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
