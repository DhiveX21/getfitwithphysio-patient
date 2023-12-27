import React from "react";
import style from "./Common.module.scss";

export function Common1({
  image = "/images/example.jpg",
  title = "Title Common1",
  description = "Description Common1",
  noteTitle = "noteTitle",
  noteDescription = "note Description",
}) {
  return (
    <div className={style.common_1}>
      <div className={style.common_1__wrapper}>
        <div
          className={`${style.common_1__title}  font-semibold text-get_pink`}
        >
          <h3>Status</h3>
        </div>
        <div className={style.common_1__item}>
          <div className={style.common_1__item__wrapper}>
            <div className={style.common_1__item__thumbnail}>
              <picture>
                <img src={image} alt="inform" />
              </picture>
            </div>
            <div
              className={`${style.common_1__item__title} text-lg font-bold text-get_blue`}
            >
              <h2>{title}</h2>
            </div>
            <div
              className={`${style.common_1__item__description} text-sm text-get_desc`}
            >
              <p>{description}</p>
            </div>
            <div className={style.common_1__item__note}>
              <div
                className={`${style.common_1__item__note__title} text-sm text-get_desc`}
              >
                <h4>{noteTitle}</h4>
              </div>
              <div
                className={`${style.common_1__item__note__description} text-get_pink text-sm`}
              >
                <p>{noteDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
