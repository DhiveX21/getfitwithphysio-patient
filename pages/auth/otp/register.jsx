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

// register.auth = {
//   role: "admin",
//   loading: "<div>loadingggggggggggggggggggggggggg</div>",
//   unauthorized: "/auth/login", // redirect to this url
// };

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}

export default function register({ providers, csrfToken }) {
  const { status } = useSession();
  console.log(status);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    signIn("credentials", { otp: data.otp, phoneNumber: "0895619258715" });
  };
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
              alt="Login illustration"
            />
          </picture>
        </div>

        <div className="otp__note">
          <div className="otp__note__wrapper">
            <h4 className="text-[20px] text-[#5E5E5E] text-center mb-[26px] px-[20px]">
              Kami telah mengirimkan kode verifikasi ke nomor{" "}
              <b className="text-primary">0895619258715</b>, Silahkan Cek pesan
              masuk.
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
