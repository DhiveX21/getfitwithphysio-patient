import React from "react";
import style from "./Card.module.css";

export function CardWithThumbnail({
  image = "./images/physio1.png",
  title = "Rifa Rahmalia. Amd. Ft",
  description = "Perbanyak konsumsi makan dan minuman yang banyak mengandung Kalsium. serta perbanyak istirahat dan Olahraga secara rutin.",
  note = "19 September 2022 15:22 WIB",
}) {
  return (
    <div className={style.card_with_thumbnail}>
      <div className={style.card_with_thumbnail__wrapper}>
        <div className={style.card_with_thumbnail__thumbnail}>
          <picture>
            <img className="object-cover" src={image} alt="physioterapi" />
          </picture>
        </div>
        <div className={style.card_with_thumbnail__text}>
          <div className={style.card_with_thumbnail__text__title}>
            <h3>{title}</h3>
          </div>
          <div className={style.card_with_thumbnail__text__description}>
            <p>{description}</p>
          </div>
          <div className={style.card_with_thumbnail__text__date}>
            <p>{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardWithThumbnail2({
  image = "/images/article1.png",
  title = "Telefisio",
  description = "treatment Fisioterapi online.",
  note = "Baru",
}) {
  return (
    <div className={style.card_with_thumbnail2}>
      <div className={style.card_with_thumbnail2__wrapper}>
        <div
          className={style.card_with_thumbnail2__thumbnail + " max-h-[125px]"}
        >
          <picture className="h-full">
            <img
              className="object-cover overflow-hidden"
              src={image}
              alt="physioterapi"
            />
          </picture>
        </div>
        <div className={style.card_with_thumbnail2__text}>
          <div className={style.card_with_thumbnail2__text__title}>
            <h3>{title}</h3>
          </div>
          <div className={style.card_with_thumbnail2__text__description}>
            <p>{description}</p>
          </div>
        </div>
        <div className={style.card_with_thumbnail2__badge}>
          <h4 className="m-0 text-center">{note}</h4>
        </div>
      </div>
    </div>
  );
}

export function CardFullImage({
  image = "/images/tele_physio_detail.jpg",
  title = "Telefisio",
  description = "treatment Fisioterapi online.",
  textStyle = {},
}) {
  return (
    <div className={style.card_full_image}>
      <div
        className={style.card_full_image__wrapper}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className={style.card_full_image__text} style={textStyle}>
          <div className={style.card_full_image__text__title}>
            <h3>{title}</h3>
          </div>
          <div className={style.card_full_image__text__description}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardIdentity({
  title = "Telefisio",
  item = [{ name: "MuhammadArdhiansyah" }],
}) {
  return (
    <div className={style.card_identity}>
      <div className={style.card_identity__wrapper}>
        <div className={style.card_identity__title}>
          <span>{title}</span>
        </div>
        {item.map((value, index) => {
          return (
            <div className={style.card_identity__item}>
              <label>{Object.keys(item[index])[0].replace("_", " ")}</label>
              <span>:</span>
              <p>{Object.values(item[index])[0]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
