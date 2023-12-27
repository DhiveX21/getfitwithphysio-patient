import React from "react";
import style from "./Progress.module.scss";

export function VerticalProgressWithIcon({
  progress = [
    {
      icon: "/images/icon/search_fisio.svg",
      title: "Memesan Tanggal Appointment",
      description: "Sesi Booking untuk menentukan Tanggal Appointment mu",
      status: "2",
    },
    {
      icon: "/images/icon/booking-online.svg",
      title: "Mencari Fisioterapi",
      description: "Mencari Fisio terbaik dari kami untuk mu...",
      status: "1",
    },
    {
      icon: "/images/icon/waiting.svg",
      title: "Menunggu Tanggal Appointment",
      description: "Menunggu waktu pertemuan kita... :)",
      status: "0",
    },
  ],
}) {
  return (
    <div className={style.vertical_progress_with_icon}>
      <div className={style.vertical_progress_with_icon__wrapper}>
        <div
          className={`${style.vertical_progress_with_icon__title} text-lg text-get_pink font-semibold`}
        >
          <h3>Status</h3>
        </div>
        <div className={style.vertical_progress_with_icon__item}>
          <div className={style.vertical_progress_with_icon__item__wrapper}>
            {progress.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    style.vertical_progress_with_icon__item__card
                  } ${
                    item.status === "1"
                      ? "border-l-4 border-get_blue"
                      : item.status === "2"
                      ? "border-l-4 border-get_cyan"
                      : ""
                  }`}
                  style={
                    item.status === "0"
                      ? {
                          backgroundColor: "#BEBEBE",
                          width: "90%",
                          opacity: "50%",
                          filter: "grayscale(100%)",
                        }
                      : item.status === "1"
                      ? {
                          backgroundColor: "#78dcca89",
                          width: "100%",
                          opacity: "100%",
                        }
                      : item.status === "2"
                      ? {
                          backgroundColor: "#78dcca89",
                          width: "95%",
                          opacity: "50%",
                        }
                      : {
                          backgroundColor: "#BEBEBE",
                          width: "90%",
                          opacity: "50%",
                        }
                  }
                >
                  <div
                    className={
                      style.vertical_progress_with_icon__item__card__thumbnail
                    }
                  >
                    <picture className="aspect-square">
                      <img src={item.icon} alt="progress status" />
                    </picture>
                  </div>
                  <div
                    className={`${style.vertical_progress_with_icon__item__card__content}`}
                  >
                    <div
                      className={`${style.vertical_progress_with_icon__item__card__content__title} text-sm text-get_blue font-bold`}
                    >
                      <h3>{item.title}</h3>
                    </div>
                    <div
                      className={`${style.vertical_progress_with_icon__item__card__content__subtitle} text-xs text-get_desc`}
                    >
                      <p>{item.description}</p>
                    </div>
                    {item.action ? item.action : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
