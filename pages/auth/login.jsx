import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_login.module.css";
import { useRouter } from "next/router";
import { setLocalStorage } from "../../helpers/localStorage";
import { getProviders, getCsrfToken, useSession } from "next-auth/react";
import { checkUserExist } from "../../endpoint/User";

import { useDispatch } from "react-redux";
import { SubmitButton } from "../../components/Button";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function Login({ providers, csrfToken }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  if (session) {
    router.push("/dashboard");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const standartPhoneNumber = "+62" + data.phoneNumber;
    const body = { phone_number: standartPhoneNumber };
    dispatch(checkUserExist(body))
      .then((response) => {
        setLocalStorage(
          "login_attempt",
          { phoneNumber: standartPhoneNumber },
          300
        );
        router.push("/auth/pin/login");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setLocalStorage(
            "register_attempt",
            { phoneNumber: standartPhoneNumber },
            300
          );
          alert(
            "Sepertinya kamu belum membuat PIN , ayo kita buat PIN Keamanan Terlebih dahulu"
          );
          router.push("/auth/pin/create");
        }
        if (error.response.status === 401) {
          alert("Nomor HP tidak ditemukan");
        }
      });
  };

  return (
    <div className={style["login-page"] + " container-page"}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className="m-0 my-4 ">Login</h2>
        </div>
        <div className={style.illustration}>
          <picture>
            <img src="/images/loginV2.jpeg" alt="Login illustration" />
          </picture>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={`${style.form__wrapper} relative`}>
              <span className="absolute top-[7px] rounded-lg text-[30px] pt-[5px] left-[10px] text-white bg-danger px-[10px] leading-[1em] ">
                +62
              </span>
              <input
                placeholder="Nomor Handphone"
                className="h-[48px] pl-[70px] text-[30px] pt-[5px]"
                type="tel"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 20,
                  pattern: /^8[1-9][0-9]{6,11}$/,
                })}
              />
              {/* {errors.phoneNumber?.type === "required" && "First name is required"} */}
              {errors.phoneNumber?.type === "required" && (
                <span className="text-[24px] text-danger font-bold leading-[24px] mt-[-10px] text-center animate-pulse">
                  (Nomor HP Wajib Di isi.)
                </span>
              )}
              {errors.phoneNumber?.type === "maxLength" && (
                <span className="text-[24px] text-danger font-bold leading-[24px] mt-[-10px] text-center animate-pulse">
                  (Maximal Nomor 20 Digit)
                </span>
              )}
              {errors.phoneNumber?.type === "pattern" && (
                <span className="text-[24px] text-danger font-bold leading-[24px] mt-[-10px] text-center animate-pulse">
                  (Mohon Masukan Nomor HP dengan format contoh +62123456789)
                </span>
              )}
              <SubmitButton text="Login" />
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
