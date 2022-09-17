import React from "react";
import style from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.wrapper}>
        <div className={"hover-float " + style.logo}>
          <Link href="/dashboard">
            <picture>
              <img src="/images/logo.png" alt="getfit logo" />
            </picture>
          </Link>
        </div>
        {/* <div className="header__back">a</div> */}
        <div className={style.search}>
          <div className={style.search__wrapper}>
            <form action="" className="relative">
              <input
                className="w-[100%] "
                placeholder="Ex: Telekonsultasi"
                type="text"
              />
              <button>
                <img
                  className="absolute top-[30%] right-[10px]"
                  src="/images/icon/loupe.svg"
                  alt="loupe"
                />
              </button>
            </form>
          </div>
        </div>
        <div className={style.help}>
          <picture className="">
            <img src="/images/icon/help.svg" alt="contact us" />
          </picture>
        </div>
      </div>
    </div>
  );
}
