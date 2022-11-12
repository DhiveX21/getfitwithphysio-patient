import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_register.module.css";
import { useRouter } from "next/router";
import { getProviders, getCsrfToken, useSession } from "next-auth/react";
import { setLocalStorage } from "../../helpers/localStorage";
import { userRegister } from "../../endpoint/User";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function Register({ providers, csrfToken }) {
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
    let standartPhoneNumber = () => {
      if (data.phoneNumber.substring(0, 1) === 0) {
        data;
      }
    };
    const body = { phone_number: data.phoneNumber };
    userRegister(body)
      .then((response) => {
        setLocalStorage(
          "register_attempt",
          { phoneNumber: data.phoneNumber },
          300
        );
        router.push("/auth/otp/register");
      })
      .catch((error) => {
        console.error(error);
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
            <h4 className="text-[20px] text-[#5E5E5E] text-center mb-[26px] px-[20px]">
              Pastikan kamu menggunakan nomor HP yang aktif, kami akan mengirim
              OTP untuk mengkonfirmasi akun anda.
            </h4>
          </div>
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={style.form__wrapper}>
              <input
                placeholder="Nomor Handphone"
                className="h-[48px] text-center text-[30px]"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 20,
                  pattern: /^(\+62)8[1-9][0-9]{6,11}$/,
                })}
              />
              {errors.phoneNumber?.type === "required" &&
                "Nomor HP Wajib Di isi."}
              {errors.phoneNumber?.type === "maxLength" &&
                "Maximal Nomor 20 Digit"}
              {errors.phoneNumber?.type === "pattern" &&
                "Mohon Masukan Nomor HP dengan format contoh +62123456789"}
              <button className="button-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className={style["register-note"]}>
          <div className={style["register-note__wrapper"]}>
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
