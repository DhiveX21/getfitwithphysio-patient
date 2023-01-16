import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_login.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getCsrfToken,
} from "next-auth/react";
import { getLocalStorage } from "../../../helpers/localStorage";
import { useDispatch } from "react-redux";
import {
  setControlLoading,
  setControlLoadingWithTimer,
} from "../../../store/actions/controlActions";
import axios from "axios";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const getOTP = await axios
    .get("http://localhost:3000/api/loginOtp")
    .then((response) => {
      return response.data;
    });
  return {
    props: { providers, csrfToken: await getCsrfToken(context), getOTP },
  };
}

export default function LoginOtp({ providers, csrfToken, getOTP }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [seconds, setSeconds] = useState(300);
  const [loginAttempt, setLoginAttempt] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const checkLoginAttempt = () => {
    let getLoginAttempt = getLocalStorage("login_attempt");

    if (!getLoginAttempt || getLoginAttempt === "expire") {
      router.push("/auth/login");
    } else {
      if (!loginAttempt) {
        let tempLoginAttempt = getLocalStorage("login_attempt");
        setLoginAttempt({
          phoneNumber: tempLoginAttempt.item.phoneNumber,
          expire: tempLoginAttempt.expire,
        });
      }
      return getLoginAttempt;
    }
  };

  const onSubmit = (data) => {
    if (data.otp == getOTP.otp) {
      checkLoginAttempt();
      dispatch(
        setControlLoadingWithTimer(
          5000,
          "Loading",
          "Please Wait",
          "/images/controlLoading.webm"
        )
      );
      signIn("credentials", {
        otp: data.otp,
        phoneNumber: loginAttempt.phoneNumber,
        callbackUrl: "/dashboard",
      });
    } else {
      alert("OTP SALAH");
    }
  };

  useEffect(() => {
    checkLoginAttempt();

    let interval = null;

    interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    if (seconds < 0) {
      router.push("/auth/login");
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className={style["login-page"] + " container-page"}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className="m-0 my-4 ">Verifikasi</h2>
        </div>
        <div className={style.illustration}>
          <picture>
            <img
              src="/images/icon/verifikasi_otp.svg"
              alt="Login illustration"
            />
          </picture>
        </div>
        <div className="otp__timer flex justify-center items-center">
          <div className="otp__timer__wrapper flex flex-col gap-[5px] justify-center items-center">
            <h4 className="text-[34px] text-[#5e5e5e] m-0 leading-[36px]">
              Tersisa :{" "}
            </h4>
            <h3 className="text-[42px] text-danger m-0 leading-[45px]">
              {seconds} Detik
            </h3>
          </div>
        </div>

        <div className="otp__note">
          <div className="otp__note__wrapper">
            <h4 className="text-[20px] text-[#5E5E5E] text-center mb-[26px] px-[20px]">
              Kami telah mengirimkan kode verifikasi ke nomor{" "}
              <b className="text-primary">
                {loginAttempt ? loginAttempt.phoneNumber : ""}
              </b>
              , Silahkan Cek pesan masuk.
            </h4>
          </div>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.form__wrapper}>
              <input
                placeholder="Masukan OTP"
                className="h-[48px]"
                {...register("otp", { required: true, maxLength: 4 })}
              />
              {/* {errors.username?.type === "required" && "First name is required"} */}
              <button className="button-primary" type="submit">
                Daftar
              </button>
            </div>
          </form>
        </div>
        <div className={style["login-note"]}>
          <div className={style["login-note__wrapper"]}>
            <p>Sudah memiliki akun? </p>
            <Link href="/auth/login">
              <a className="text-primary font-bold"> Login disini.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
