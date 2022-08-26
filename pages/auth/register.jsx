import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./_register.module.css";
import { useRouter } from "next/router";

export default function register() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log("sbmit");
    router.push("/auth/register");
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
            <div className={style.form__wrapper}>
              <input
                placeholder="Masukan Nomor Handphone"
                className="h-[48px]"
                {...register("username", { required: true, maxLength: 20 })}
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
