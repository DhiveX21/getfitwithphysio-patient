import Link from "next/link";
import React from "react";
import style from "./StickyBottomNav.module.scss";

export default function index() {
  return (
    <>
      <div className={style.sticky_bottom_nav}>
        <div className={style.sticky_bottom_nav__wrapper}>
          <div className={style.sticky_bottom_nav__list}>
            <Link href="/profile">
              <div className={style.sticky_bottom_nav__list__item}>
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/user.png" alt="menu" />
                  </picture>
                </div>
                <div className={style.sticky_bottom_nav__list__item__title}>
                  <h3>Profile</h3>
                </div>
              </div>
            </Link>
            <Link href="/dashboard">
              <div className={style.sticky_bottom_nav__list__item}>
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/home.png" alt="menu" />
                  </picture>
                </div>
                <div className={style.sticky_bottom_nav__list__item__title}>
                  <h3>Home</h3>
                </div>
              </div>
            </Link>
            <Link href="/profile">
              <div
                className={`${style.sticky_bottom_nav__list__item} border-2 border-danger shadow-sm `}
              >
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/user_2.png" alt="menu" />
                  </picture>
                </div>
                <div className={style.sticky_bottom_nav__list__item__title}>
                  <h3>Profile</h3>
                </div>
              </div>
            </Link>
            <Link href="/services">
              <div className={style.sticky_bottom_nav__list__item}>
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/appointment_icon.svg" alt="menu" />
                  </picture>
                </div>
                <div className={style.sticky_bottom_nav__list__item__title}>
                  <h3>Appointment</h3>
                </div>
              </div>
            </Link>
            <Link href="/medical-record">
              <div className={style.sticky_bottom_nav__list__item}>
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img
                      src="/images/icon/medical-result_icon.svg"
                      alt="menu"
                    />
                  </picture>
                </div>
                <div className={style.sticky_bottom_nav__list__item__title}>
                  <h3>Rekam Medis</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
