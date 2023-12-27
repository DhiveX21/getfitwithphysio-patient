import React from "react";
import style from "./Video.module.scss";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import NotFound from "../Notfound";

const opts = {
  height: "300px",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export function VideoPlayer1({
  url = "https://www.youtube.com/embed/ND7vNOzkimY?start=3",
  title = "Title Common1",
  description = "Description Common1",
}) {
  var video_id = url.split("v=")[1];
  if (video_id) {
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }

  return (
    <>
      <div className={style.video_player_1}>
        <div className={style.video_player_1__wrapper}>
          <div
            className={`${style.video_player_1__title} text-sm text-get_text font-bold`}
          >
            <h3>{title}</h3>
          </div>
          <div className={style.video_player_1__player}>
            {video_id ? (
              <YouTube
                autoplay={false}
                videoId={video_id}
                opts={opts}
                // onReady={this._onReady}
              />
            ) : (
              <NotFound
                title="Sepertinya Video nya Tidak dapat di putar."
                description="Kami akan memperbaikinnya secepat mungkin."
              ></NotFound>
            )}
          </div>
          <div
            className={`${style.video_player_1__description} text-sm text-get_light_desc`}
          >
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
