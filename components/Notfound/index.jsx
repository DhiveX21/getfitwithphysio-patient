import React from "react";

export default function NotFound({
  image = "/images/icon/404.png",
  title = "umm, Sepertinya Kosong.",
  description = "Belum ada apa-apa disini, mungkin kamu perlu mengisi nya terlebih dahulu.",
}) {
  return (
    <div className="not_found__wrapper w-full flex flex-col p-[20px]  items-center min-h-[200px] my-[20px]">
      <div className="not_found__image">
        <picture className="flex justify-center items-center p-[30px]">
          <img className="w-1/2" src={image} alt="not found" />
        </picture>
      </div>
      <div className="not_found__title text-[30px] leading-[30px] text-danger">
        <h3>{title}</h3>
      </div>
      <div className="not_found__description text-[20px] leading-[20px] text-center text-slate-400">
        <p>{description}</p>
      </div>
    </div>
  );
}
