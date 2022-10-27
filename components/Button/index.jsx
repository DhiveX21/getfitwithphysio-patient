import style from "./Button.module.css";
export function Button({
  text = "button",
  padding = "10px 20px",
  color = "",
  textColor = "",
  classNameInject = "text-white bg-primary",
  disabled = false,
  click = () => {
    console.log("button is clicked");
  },
  type = "",
  id = null,
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      disabled={disabled}
      className={"w-full" + classNameInject}
    >
      {text}
    </button>
  );
}

export function ButtonWithIcon({
  text = "button",
  classNameInject = "text-white bg-primary",
  click = () => {
    console.log("button is clicked");
  },
  type = "",
  id = null,
  icon = "./images/logo.png",
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      className={style.buttonWithIcon + " " + classNameInject}
    >
      <div className={style.buttonWithIcon__wrapper}>
        <picture>
          <img
            className={style.buttonWithIcon__icon}
            src={icon}
            alt="button logo"
          />
        </picture>
        <p>{text}</p>
      </div>
    </button>
  );
}

export function ButtonWithIcon2({
  text = "button",
  classNameInject = "text-primary bg-white",
  click = () => {
    console.log("button is clicked");
  },
  type = "",
  id = null,
  icon = "./images/logo.png",
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      className={style.buttonWithIcon2 + " " + classNameInject}
    >
      <div className={style.buttonWithIcon2__wrapper}>
        <div className={style.buttonWithIcon2__icon}>
          <picture>
            <img src={icon} alt="menu" />
          </picture>
        </div>
        <div className={style.buttonWithIcon2__title}>
          <h3>{text}</h3>
        </div>
      </div>
    </button>
  );
}
