import React from "react";
import style from "./Video.module.scss";
import { useSelector } from "react-redux";

export function VideoPlayer1({
  path = "/images/oploverz - SXF 13 [1080p][E11C083C].mkv",
  title = "Title Common1",
  description = "Description Common1",
}) {
  const loadingCondition = useSelector((state) => state.controlData);
  return (
    <>
      <div className={style.video_player_1}>
        <div className={style.video_player_1__wrapper}>
          <div className={style.video_player_1__title}>
            <h3>{title}</h3>
          </div>
          <div className={style.video_player_1__player}>
            <video src={path} type="video exercise" />
          </div>
          <div className={style.video_player_1__description}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
