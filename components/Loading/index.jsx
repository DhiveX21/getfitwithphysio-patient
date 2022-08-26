import style from "./Loading.module.css";

export function LoadingLogo({ icon = "./images/logoLoading.png" }) {
  return (
    <>
      <div className={style.loadingLogo}>
        <div className={style.loadingLogo__wrapper}>
          <div className={style.loadingLogo__logo}>
            <picture>
              <img src={`${icon}`} alt="get Physio" />
            </picture>
          </div>
          <div className={style.loadingLogo__text}>
            <h3 className="text-gray">Loading</h3>
          </div>
        </div>
      </div>
    </>
  );
}

LoadingLogo.getInitialProps = async (context) => {};
