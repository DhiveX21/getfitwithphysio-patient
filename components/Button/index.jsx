import style from "./Button.module.css";
import { useSelector } from "react-redux";
export function Button({
  text = "button",
  padding = "10px 20px",
  color = "",
  textColor = "",
  classNameInject = "text-white bg-primary",
  disabled = false,
  click = () => {},
  type = "",
  id = null,
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      disabled={disabled}
      className={"w-full animation-scale-up-center" + classNameInject}
    >
      {text}
    </button>
  );
}

export function SubmitButton({
  text = "button",
  classNameInject = "text-white bg-primary",
  click = () => {},
  type = "submit",
  id = null,
  disabled = false,
}) {
  const subLoading = useSelector(
    (state) => state.controlData.controlSubLoading
  );
  return (
    <button
      className={` ${
        subLoading.active
          ? "bg-gray-200 rounded-lg px-[20px] py-[3px] text-white animation-scale-up-center " +
            classNameInject
          : "rounded-lg px-[20px] py-[3px] text-white animation-scale-up-center " +
            classNameInject
      }`}
      type={type}
      id={id}
      onClick={click}
      disabled={subLoading.active || disabled}
    >
      <span className="flex justify-center">
        {subLoading.active ? (
          <img
            className="animation-popup"
            src="/images/loading-button.gif"
            width={"45px"}
            alt="loading"
          ></img>
        ) : (
          <p className="animation-popup">{text}</p>
        )}
      </span>
    </button>
  );
}

export function ButtonWithIcon({
  text = "button",
  classNameInject = "text-white bg-primary",
  click = () => {},
  type = "",
  id = null,
  icon = "./images/logo.png",
  disabled = false,
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      disabled={disabled}
      className={
        style.buttonWithIcon + " animation-scale-up-center " + classNameInject
      }
    >
      <div className={`${style.buttonWithIcon__wrapper}`}>
        <picture>
          <img
            className={`${style.buttonWithIcon__icon} animation-popup-1`}
            src={icon}
            alt="button logo"
          />
        </picture>
        <p className="animation-popup-2">{text}</p>
      </div>
    </button>
  );
}

export function ButtonWithIcon2({
  text = "button",
  classNameInject = "text-primary bg-white",
  click = () => {},
  type = "",
  id = null,
  icon = "./images/logo.png",
}) {
  return (
    <button
      type={type}
      id={id}
      onClick={click}
      className={
        style.buttonWithIcon2 + " animation-scale-up-center " + classNameInject
      }
    >
      <div className={`${style.buttonWithIcon2__wrapper} `}>
        <div className={`${style.buttonWithIcon2__icon} animation-popup`}>
          <picture className="aspect-square">
            <img src={icon} alt="menu" />
          </picture>
        </div>
        <div className={`${style.buttonWithIcon2__title} animation-popup-2`}>
          <h3>{text}</h3>
        </div>
      </div>
    </button>
  );
}
