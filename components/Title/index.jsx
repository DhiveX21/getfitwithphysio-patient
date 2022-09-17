import style from "./Title.module.css";

export function SectionTitle({ text = "I'm Title" }) {
  return (
    <>
      <div className={style.sectionTitle}>
        <div className={style.sectionTitle__wrapper}>
          <h2 className="text-primary mt-[2px]">{text}</h2>
        </div>
      </div>
    </>
  );
}

export function MenuTitle({
  text = "I'm Title",
  icon = "/images/icon/booking-online.svg",
}) {
  return (
    <>
      <div className={style.menuTitle}>
        <div
          className={style.menuTitle__wrapper + " bg-primary rounded-[20px]"}
        >
          <picture>
            <img className="h-[75px]" src={icon} alt="menu" />
          </picture>
          <h2 className="text-white mt-[2px]">{text}</h2>
        </div>
      </div>
    </>
  );
}
