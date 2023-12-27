import style from "./Modal.module.scss";
import Popup from "reactjs-popup";
import { useState } from "react";
import parse from "html-react-parser";

export function RegularModal({ show = false }) {
  return (
    <div
      className={`${style.regular_modal} ${!show ? "hidden" : "flex flex-col"}`}
    >
      <div className={style.regular_modal__wrapper}>
        <div className={style.regular_modal__image}>
          <picture>
            <img src="/images/logo.png" alt="modal" />
          </picture>
        </div>
        <div className={style.regular_modal__content}>
          <div className={style.regular_modal__content__wrapper}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              sed veniam alias maiores nemo? Voluptas necessitatibus officiis
              dolore esse atque. Odit animi, nam eveniet enim doloremque
              laboriosam tempore, quae natus cupiditate officia non
              exercitationem perferendis magni omnis architecto necessitatibus!
              Tempora fugit, recusandae, quae, magni laboriosam eius autem
              quibusdam placeat consequuntur sunt repellat vero reiciendis atque
              suscipit obcaecati! Laudantium fugit rerum id asperiores? Eos,
              eveniet ratione voluptatibus est incidunt nihil sequi explicabo
              nemo, iure expedita autem aut enim iste tenetur quasi, vitae earum
              eius? Recusandae inventore ea consequuntur omnis enim, ipsa
              asperiores laborum porro reiciendis saepe expedita error
              accusantium doloremque? Esse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FullScreenModal({ show = false, close, title, message }) {
  return (
    <div
      className={`${style.full_screen_modal}  ${
        !show ? "hidden" : "flex flex-col"
      } animation-popup`}
    >
      <div
        className={`${style.full_screen_modal__wrapper} bg-gradient-to-b min-h-screen from-primary to-blue-300 max-h-screen`}
      >
        <div className={style.full_screen_modal__image}>
          <picture>
            <img src="/images/logo.png" alt="modal" />
          </picture>
        </div>
        <div className={style.full_screen_modal__title}>
          <h3 className="invert text-xl font-bold">{title}</h3>
        </div>
        <div className={style.full_screen_modal__content}>
          <div className={style.full_screen_modal__content__wrapper}>
            <p className="text-white text-sm">{message}</p>
          </div>
        </div>
        {close ? (
          <div className={style.full_screen_modal__button}>
            <button
              className="bg-danger  px-[40px] rounded-lg text-white py-[4px]  text-sm shadow-slate-500 shadow-md"
              onClick={() => close()}
            >
              Tutup
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
