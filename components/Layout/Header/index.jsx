import React from "react";
import style from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <div className={`${style.header} animation-scale-up-center`}>
      <div className={style.wrapper}>
        {router.asPath === "/dashboard" ? (
          <div className={"hover-float " + style.logo}>
            <picture>
              <img
                className="opacity-[50%] cursor-pointer hover:opacity-[100] duration-500 animation-popup"
                src="/images/logo.png"
                alt="getfit logo"
              />
            </picture>
          </div>
        ) : (
          <div
            onClick={() => {
              router.back();
            }}
            className={"hover-float " + style.logo}
          >
            <picture>
              <img
                className="opacity-[50%] cursor-pointer hover:opacity-[100] duration-500 animation-popup"
                src="/images/icon/back.svg"
                alt="getfit logo"
              />
            </picture>
          </div>
        )}

        {/* <div className="header__back">a</div> */}
        <div className={`${style.search} animation-popup-2`}>
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
        <div className={`${style.help} animation-popup-2`}>
          <picture className="">
            <img src="/images/icon/help.svg" alt="contact us" />
          </picture>
        </div>
      </div>
    </div>
  );
}
