import React from "react";
import style from "./Card.module.scss";
import { Button } from "../Button";

export function CardWithThumbnail({
  image = "./images/physio1.png",
  title = "Rifa Rahmalia. Amd. Ft",
  description = "Perbanyak konsumsi makan dan minuman yang banyak mengandung Kalsium. serta perbanyak istirahat dan Olahraga secara rutin.",
  note = "19 September 2022 15:22 WIB",
  imageStyle = "",
  cardStyle = "",
  titleStyle = "",
  descStyle = "",
  noteStyle = "",
}) {
  return (
    <div className={style.card_with_thumbnail}>
      <div
        className={`${style.card_with_thumbnail__wrapper} ${cardStyle} animation-scale-up-center`}
      >
        <div className={style.card_with_thumbnail__thumbnail}>
          <picture>
            <img
              className={`object-cover ${imageStyle}`}
              src={image}
              alt="physioterapi"
            />
          </picture>
        </div>
        <div className={style.card_with_thumbnail__text}>
          <div
            className={`${style.card_with_thumbnail__text__title} ${titleStyle} animation-popup`}
          >
            <h3>{title}</h3>
          </div>
          <div
            className={`${style.card_with_thumbnail__text__description} ${descStyle} animation-popup-1`}
          >
            <p>{description}</p>
          </div>
          <div
            className={`${style.card_with_thumbnail__text__date} ${noteStyle} animation-popup-2`}
          >
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
  cardStyle = "",
  titleStyle = "",
  descStyle = "",
  badgeStyle = "",
}) {
  return (
    <div className={style.card_with_thumbnail2}>
      <div
        className={`${style.card_with_thumbnail2__wrapper} ${cardStyle} animation-scale-up-center`}
      >
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
          <div
            className={`${style.card_with_thumbnail2__text__title} ${titleStyle} animation-popup`}
          >
            <h3>{title}</h3>
          </div>
          <div
            className={`${style.card_with_thumbnail2__text__description} ${descStyle} animation-popup-2`}
          >
            <p>{description}</p>
          </div>
        </div>
        <div className={`${style.card_with_thumbnail2__badge} ${badgeStyle} `}>
          <h4 className="m-0 text-center animation-popup-3">{note}</h4>
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
    <div className={`${style.card_full_image} animation-scale-up-center`}>
      <div
        className={style.card_full_image__wrapper}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className={style.card_full_image__text} style={textStyle}>
          <div
            className={`${style.card_full_image__text__title} text-sm text-get_desc`}
          >
            <h3 className="animation-popup">{title}</h3>
          </div>
          <div
            className={`${style.card_full_image__text__description} text-xs text-get_light_desc animation-popup-2`}
          >
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
    <div className={`${style.card_identity} animation-scale-up-center`}>
      <div className={style.card_identity__wrapper}>
        <div className={`${style.card_identity__title} text-sm text-white`}>
          <span className="animation-popup-2">{title}</span>
        </div>
        {item.map((value, index) => {
          return (
            <div
              key={index}
              className={`${style.card_identity__item} text-xs text-get_text`}
            >
              <label className="font-extrabold animation-popup-2">
                {Object.keys(item[index])[0].replace("_", " ")}
              </label>
              <span className="animation-popup-2">:</span>
              <p className="font-medium animation-popup-2">
                {Object.values(item[index])[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FeedBackCardInput({
  physio_id = "1",
  physioImage = "/images/physio1.png",
  title = "tanggapan",
}) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-center bg-[#EAF7FD] rounded-lg p-[10px]">
        <div className="w-[30%] p-[20px]">
          <picture>
            <img className="rounded-lg" src={physioImage} alt="fisio" />
          </picture>
        </div>
        <div className="flex flex-col gap-[5px] w-[70%]">
          <div className="w-full">
            <h4 className="text-[#68B2BC]">{title}</h4>
          </div>
          <div className="w-full">
            <form action="">
              <textarea
                className="w-full h-[75px] text-sm text-center  p-[10px]"
                placeholder="Fisionya baik dan Mengedukasi..."
                type="text"
              />
            </form>
          </div>
          <div className="w-full text-center">
            <Button
              text="Kirim"
              classNameInject="w-full bg-primary px-[40px] py-[5px] rounded-lg text-white"
              click={() => {
                console.log("Tanggapan");
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HoverableCard({
  image = "/images/article3.png",
  title = "Video",
  description = "Pelatihan dengan bentuk Video",
}) {
  return (
    <div className={`${style.hoverable_card} animation-scale-up-center`}>
      <div
        className={style.hoverable_card__wrapper}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={style.hoverable_card__content}>
          <div
            className={`${style.hoverable_card__title} text-lg text-white font-bold animation-popup`}
          >
            <h3>{title}</h3>
          </div>
          <div
            className={`${style.hoverable_card__description} text-sm text-white animation-popup-2`}
          >
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
