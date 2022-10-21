import React from "react";
import style from "./Video.module.scss";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const opts = {
  height: "300px",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export function VideoPlayer1({
  path = "https://www.youtube.com/embed/ND7vNOzkimY?start=3",
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
            <YouTube
              videoId="2g811Eo7K8U"
              opts={opts}
              // onReady={this._onReady}
            />
          </div>
          <div className={style.video_player_1__description}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
