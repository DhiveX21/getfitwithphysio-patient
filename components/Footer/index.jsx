import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.wrapper}>
        <div className={style.contact}>
          <div className={style.title}>
            <h2>Kontak Kami</h2>
          </div>
          <div className={style.subtitle}>
            <h3>0895619258715</h3>
          </div>
        </div>
        <div className={style.address}>
          <div className={style.title}>
            <h2>Alamat Kami</h2>
          </div>
          <div className={style.subtitle}>
            <h3>
              Jl. Johar No.1A, RT.5/RW.3, Gondangdia, Kec. Menteng, Kota Jakarta
              Pusat, Daerah Khusus Ibukota Jakarta 10350
            </h3>
          </div>
        </div>
        <div className={style.socmed}>
          <div className={style.title}>
            <h2>Social Media Kami</h2>
          </div>
          <div className={style.socmed__list}>
            <div className={"hover-float " + style.socmed__item}>
              <picture>
                <img src="/images/instagram.png" alt="instagram" />
              </picture>
            </div>
            <div className={"hover-float " + style.socmed__item}>
              <picture>
                <img src="/images/linkedin.png" alt="linkedin" />
              </picture>
            </div>
            <div className={"hover-float " + style.socmed__item}>
              <picture>
                <img src="/images/telegram.png" alt="telegram" />
              </picture>
            </div>
            <div className={"hover-float " + style.socmed__item}>
              <picture>
                <img src="/images/twitter_square.png" alt="twitter" />
              </picture>
            </div>
            <div className={"hover-float " + style.socmed__item}>
              <picture>
                <img src="/images/youtube.png" alt="youtube" />
              </picture>
            </div>
          </div>
        </div>
        <div className={style.playstore}>
          <div className={style.title}>
            <h2>Tunggu kami nanti di...</h2>
          </div>
          <div className={style.playstore__list}>
            <div className="footer__playstore_list__item">
              <picture>
                <img src="/images/appstore.png" alt="appstore" />
              </picture>
            </div>
            <div className="footer__playstore_list__item">
              <picture>
                <img src="/images/playstore.png" alt="playstore" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
