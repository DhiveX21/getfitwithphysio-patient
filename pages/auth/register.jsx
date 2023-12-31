import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_register.module.css";
import { useRouter } from "next/router";
import { getProviders, getCsrfToken, useSession } from "next-auth/react";
import { setLocalStorage } from "../../helpers/localStorage";
import { userRegister } from "../../endpoint/User";
import { useState } from "react";
import { SubmitButton } from "../../components/Button";
import { useDispatch } from "react-redux";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function Register({ providers, csrfToken }) {
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
    dispatch(userRegister(body))
      .then((response) => {
        setLocalStorage(
          "register_attempt",
          { phoneNumber: standartPhoneNumber },
          300
        );
        router.push("/auth/otp/register");
      })
      .catch((error) => {
        alert(error.response.data.data.message);
      });
  };

  return (
    <div className={style["register-page"] + " container-page"}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className="m-0 my-4 ">Daftar</h2>
        </div>
        <div className={style.illustration}>
          <picture>
            <img
              src="/images/register_illustration.png"
              alt="Login illustration"
            />
          </picture>
        </div>

        <div className="otp__note">
          <div className="otp__note__wrapper">
            <h4 className="text-sm text-get_desc text-center mb-[26px] px-[20px]">
              Pastikan kamu menggunakan nomor HP yang aktif, kami akan mengirim
              OTP untuk mengkonfirmasi akun anda.
            </h4>
          </div>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={`${style.form__wrapper} relative`}>
              <span className="absolute top-[7px] rounded-lg text-lg py-[3px] left-[10px] text-white bg-get_pink px-[10px]  ">
                +62
              </span>
              <input
                placeholder="Nomor Handphone"
                className="h-[48px] pl-[70px] text-lg "
                type="tel"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 20,
                  pattern: /^8[1-9][0-9]{6,11}$/,
                  // pattern: /^(\+62)8[1-9][0-9]{6,11}$/,
                })}
              />
              {errors.phoneNumber?.type === "required" && (
                <span className="text-sm text-get_pink font-bold  mt-[-10px] text-center animate-pulse">
                  Nomor HP Wajib Di isi.
                </span>
              )}
              {errors.phoneNumber?.type === "maxLength" && (
                <span className="text-sm text-get_pink font-bold  mt-[-10px] text-center animate-pulse">
                  Maximal Nomor HP 20 Digit
                </span>
              )}
              {errors.phoneNumber?.type === "pattern" && (
                <span className="text-sm text-get_pink font-bold  mt-[-10px] text-center animate-pulse">
                  Mohon Masukan Nomor HP dengan format contoh : <br />
                  [+62] 8123456789
                </span>
              )}
              {/* <button
                className={` ${
                  isLoading
                    ? "bg-gray-200 rounded-lg px-[20px] py-[3px] text-white text-lg"
                    : "bg-get_blue rounded-lg px-[20px] py-[3px] text-white text-lg"
                }`}
                type="submit"
                disabled={isLoading}
              >
                <span className="flex justify-center ">
                  {isLoading ? (
                    <img
                      className="animation-popup"
                      src="/images/loading-button.gif"
                      width={"45px"}
                      alt="loading"
                    ></img>
                  ) : (
                    <p className="animation-popup">Register</p>
                  )}
                </span>
              </button> */}
              <SubmitButton
                text="Register"
                classNameInject="px-[20px] py-[10px] text-white text-sm bg-get_blue rounded-[5px] "
              ></SubmitButton>
            </div>
          </form>
        </div>
        <div className={style["register-note"]}>
          <div className={style["register-note__wrapper"]}>
            <p className="text-get_desc">Sudah memiliki akun? </p>
            <Link href="/auth/login">
              <a className="text-get_blue font-bold"> Login disini.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
