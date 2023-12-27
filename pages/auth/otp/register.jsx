import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_register.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLocalStorage } from "../../../helpers/localStorage";
import { userRegisterCheckOtp } from "../../../endpoint/User";
import { useDispatch } from "react-redux";
import { SubmitButton } from "../../../components/Button";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seconds, setSeconds] = useState(300);
  const [registerAttempt, setRegisterAttempt] = useState(null);
  const [phoneNumberView, setPhoneNumberView] = useState(null);

  const { data: session } = useSession();
  if (session) {
    router.push("/dashboard");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const checkRegisterAttempt = () => {
    let getRegisterAttempt = getLocalStorage("register_attempt");

    if (!getRegisterAttempt || getRegisterAttempt === "expire") {
      router.push("/auth/register");
    } else {
      if (!registerAttempt) {
        let tempRegisterAttempt = getLocalStorage("register_attempt");
        setPhoneNumberView(tempRegisterAttempt.item.phoneNumber);
        setRegisterAttempt({
          phoneNumber: tempRegisterAttempt.item.phoneNumber,
          expire: tempRegisterAttempt.expire,
        });
      }
      return getRegisterAttempt;
    }
  };

  const onSubmit = (data) => {
    const body = {
      phone_number: getLocalStorage("register_attempt").item.phoneNumber,
      otp: +data.otp,
    };

    dispatch(userRegisterCheckOtp(body))
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.data.message);
          router.push("/auth/pin/create");
        } else {
          alert(response.data.data.message);
        }
      })
      .catch((error) => {
        alert("otp is not match");
        console.error(error);
      });
    // if (data.otp == getOTP.otp) {
    //   checkRegisterAttempt();
    //   dispatch(
    //     setControlLoadingWithTimer(
    //       5000,
    //       "Loading",
    //       "Please Wait",
    //       "/images/controlLoading.webm"
    //     )
    //   );
    //   router.push("/auth/pin/create");

    // } else {
    //   alert("OTP SALAH");
    // }
  };

  useEffect(() => {
    checkRegisterAttempt();

    let interval = null;

    interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    if (seconds < 0) {
      router.push("/auth/register");
    }

    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <div className={style["register-page"] + " container-page"}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2 className="m-0 my-4 ">Verifikasi</h2>
        </div>
        <div className={style.illustration}>
          <picture>
            <img
              src="/images/icon/verifikasi_otp.svg"
              alt="Register illustration"
            />
          </picture>
        </div>
        <div className="otp__timer flex justify-center items-center">
          <div className="otp__timer__wrapper flex flex-col gap-[5px] justify-center items-center">
            <h4 className="text-xl text-get_desc m-0">Tersisa : </h4>
            <h3 className="text-2xl text-danger m-0 font-bold">
              {seconds} Detik
            </h3>
          </div>
        </div>

        <div className="otp__note mt-[10px]">
          <div className="otp__note__wrapper">
            <h4 className="text-sm text-get_desc text-center mb-[26px] px-[20px]">
              Kami telah mengirimkan kode verifikasi ke nomor{" "}
              <b className="text-get_blue">{phoneNumberView}</b>, Silahkan Cek
              pesan masuk.
            </h4>
          </div>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.form__wrapper}>
              <input
                placeholder="Masukan OTP"
                className="h-[48px] text-center"
                {...register("otp", { required: true, maxLength: 4 })}
              />
              {/* {errors.username?.type === "required" && "First name is required"} */}

              <SubmitButton
                text="Lanjut"
                classNameInject="w-[200px] self-center py-[10px] rounded-lg bg-get_blue"
              ></SubmitButton>
              <button
                type="button"
                onClick={() => router.push("/auth/register")}
                className="px-[20px] py-[5px] hover:scale-105 duration-500 text-get_pink  rounded-full w-1/2 self-center  "
              >
                Batal
              </button>
            </div>
          </form>
        </div>
        <div className={style["register-note"]}>
          <div className={style["register-note__wrapper"]}>
            <p>Sudah memiliki akun? </p>
            <Link href="/auth/register">
              <a className="text-get_blue font-bold"> Login disini.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
