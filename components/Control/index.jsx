import React from "react";
import style from "./Control.module.scss";
import { useSelector } from "react-redux";

export function ControlLoading({
  image = "/images/example.jpg",
  title = "Title Common1",
  description = "Description Common1",
  noteTitle = "noteTitle",
  noteDescription = "note Description",
}) {
  const loadingCondition = useSelector((state) => state.controlData);
  return (
    <>
      {loadingCondition.controlLoading.active ? (
        <div className={style.control_loading}>
          <div className={style.control_loading__wrapper}>
            <div className={style.control_loading__image}>
              <picture>
                <img
                  src={loadingCondition.controlLoading.image}
                  alt="loading..."
                />
              </picture>
            </div>
            <div className={style.control_loading__title + " animate-pulse"}>
              <h2>{loadingCondition.controlLoading.title}</h2>
            </div>
            <div className={style.control_loading__desc}>
              <p>{loadingCondition.controlLoading.description}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
