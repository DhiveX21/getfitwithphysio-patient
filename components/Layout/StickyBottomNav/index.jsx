import Link from "next/link";
import React from "react";
import style from "./StickyBottomNav.module.scss";

export default function index() {
  return (
    <>
      <div className={style.sticky_bottom_nav}>
        <div className={style.sticky_bottom_nav__wrapper}>
          <div className={style.sticky_bottom_nav__list}>
            <Link href="/product">
              <div
                className={`${style.sticky_bottom_nav__list__item} border-gray-300 border-r-[1px]`}
              >
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/trolley.png" alt="menu" />
                  </picture>
                </div>
                <div
                  className={`${style.sticky_bottom_nav__list__item__title} text-xxs text-get_light_desc font-semibold`}
                >
                  <h3>Product</h3>
                </div>
              </div>
            </Link>
            <Link href="/dashboard">
              <div
                className={`${style.sticky_bottom_nav__list__item} border-gray-300 border-r-[1px]`}
              >
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/house.png" alt="menu" />
                  </picture>
                </div>
                <div
                  className={`${style.sticky_bottom_nav__list__item__title} text-xxs text-get_light_desc font-semibold`}
                >
                  <h3>Home</h3>
                </div>
              </div>
            </Link>

            <Link href="/services">
              <div
                className={`${style.sticky_bottom_nav__list__item} border-gray-300 border-r-[1px]`}
              >
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/calendar.png" alt="menu" />
                  </picture>
                </div>
                <div
                  className={`${style.sticky_bottom_nav__list__item__title} text-xxs text-get_light_desc font-semibold`}
                >
                  <h3>Appointment</h3>
                </div>
              </div>
            </Link>
            <Link href="/profile">
              <div
                className={`${style.sticky_bottom_nav__list__item} border-gray-300 border-r-[1px]`}
              >
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/profile.png" alt="menu" />
                  </picture>
                </div>
                <div
                  className={`${style.sticky_bottom_nav__list__item__title} text-xxs text-get_light_desc font-semibold`}
                >
                  <h3>Profile</h3>
                </div>
              </div>
            </Link>
            <Link href="/medical-record">
              <div className={`${style.sticky_bottom_nav__list__item} `}>
                <div className={style.sticky_bottom_nav__list__item__icon}>
                  <picture>
                    <img src="/images/icon/clipboard.png" alt="menu" />
                  </picture>
                </div>
                <div
                  className={`${style.sticky_bottom_nav__list__item__title} text-xxs text-get_light_desc font-semibold`}
                >
                  <h3>RekamMedis</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
