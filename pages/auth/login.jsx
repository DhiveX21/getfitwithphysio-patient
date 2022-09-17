import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_login.module.css";
import { useRouter } from "next/router";
import * as loginActions from "../../store/actions/loginActions";
import { useDispatch } from "react-redux";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getCsrfToken,
} from "next-auth/react";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function login({ providers, csrfToken }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setLocalStorage("login_attempt", { phoneNumber: data.phoneNumber }, 20);
    router.push("/auth/otp/login");
  };

  return (
    <div className={style["login-page"] + " container-page"}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className="m-0 my-4 ">Login</h2>
        </div>
        <div className={style.illustration}>
          <picture>
            <img
              src="/images/login_illustration.svg"
              alt="Login illustration"
            />
          </picture>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={style.form__wrapper}>
              <input
                placeholder="Nomor Handphone"
                className="h-[48px] text-center text-[30px]"
                {...register("phoneNumber", { required: true, maxLength: 20 })}
              />
              {/* {errors.phoneNumber?.type === "required" && "First name is required"} */}
              <button className="button-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className={style.options}>
          <div className={style.options__separator}>
            <picture>
              <img
                src="/images/login_option_separator.png"
                alt="separator login options"
              />
            </picture>
            {/* <div className="options__separator__title">Login dengan...</div> */}
          </div>
          <div className={style.options__wrapper}>
            <div className="options__google">
              <picture>
                <img
                  className="h-[30px]"
                  src="/images/icon/google.png"
                  alt="google"
                />
              </picture>
            </div>
            <div className="options__facebook">
              <picture>
                <img
                  className="h-[30px]"
                  src="/images/icon/facebook.png"
                  alt="facebook"
                />
              </picture>
            </div>
            <div className="options__twitter">
              <picture>
                <img
                  className="h-[30px]"
                  src="/images/icon/twitter.png"
                  alt="twitter"
                />
              </picture>
            </div>
          </div>
        </div>
        <div className={style["register-note"]}>
          <div className={style["register-note__wrapper"]}>
            <p>Belum memiliki akun? </p>
            <Link href="/auth/register">
              <a className="text-primary font-bold"> Daftar disini.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
