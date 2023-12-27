import React from "react";

export function NotFound({
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
      <div className="not_found__title text-lg  text-get_pink font-bold">
        <h3>{title}</h3>
      </div>
      <div className="not_found__description text-sm  text-center text-get_light_desc">
        <p>{description}</p>
      </div>
    </div>
  );
}
