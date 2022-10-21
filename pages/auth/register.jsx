import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_register.module.css";
import { useRouter } from "next/router";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getCsrfToken,
} from "next-auth/react";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function Register({ providers, csrfToken }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setLocalStorage("login_attempt", { phoneNumber: data.phoneNumber }, 300);
    router.push("/auth/otp/register");
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
                {...register("phoneNumber", { required: true, maxLength: 20 })}
              />
              {/* {errors.phoneNumber?.type === "required" && "First name is required"} */}
              <button className="button-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className={style["register-note"]}>
          <div className={style["register-note__wrapper"]}>
            <p>Sudah memiliki akun? </p>
            <Link href="/auth/register">
              <a className="text-primary font-bold"> Login disini.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
