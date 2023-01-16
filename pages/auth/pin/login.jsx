import React from "react";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../../../helpers/localStorage";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setControlLoading } from "../../../store/actions/controlActions";
import { signIn } from "next-auth/react";
import { ControlLoading } from "../../../components/Control";
import { useEffect } from "react";
import { useState } from "react";

export default function LoginPin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  let loginPhoneNumber = "";
  useEffect(() => {
    loginPhoneNumber = getLocalStorage("login_attempt");

    if (!loginPhoneNumber) {
      alert("session time out");
      router.push("/auth/register");
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(e) {
    let id = +e.target.id.replace("otp", "");

    if (e.target.value) {
      if (id !== 6) {
        e.preventDefault();
        document.getElementById(`otp${id + 1}`).focus();
        document.getElementById(`otp${id + 1}`).value = null;
        // setTimeout(() => {
        //   document.getElementById(`otp${id + 1}`).setSelectionRange(0, 1);
        // }, 0);
      }
    } else {
      if (id !== 1) {
        e.preventDefault();
        document.getElementById(`otp${id - 1}`).focus();
        document.getElementById(`otp${id - 1}`).value = null;
        // setTimeout(() => {
        //   document.getElementById(`otp${id - 1}`).setSelectionRange(0, 1);
        // }, 0);
      }
    }
    // document.getElementById("otp2").value = "";
  }

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      handleChange(event);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const joinPin =
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6;

    const res = signIn("credentials", {
      phone_number: loginPhoneNumber.item.phoneNumber,
      pin: joinPin,
      type: "user",
      redirect: false,
    });
    res.then((response) => {
      if (response.ok === false) {
        alert("PIN SALAH");
        // dispatch(setControlLoading(false));
      } else {
        dispatch(
          setControlLoading(
            true,
            "Loading",
            "Please Wait",
            "/images/controlLoading.webm"
          )
        );
        router.push("/dashboard");
        setTimeout(() => {
          dispatch(setControlLoading(false));
        }, 2000);
      }
      setIsLoading(false);
    });
  };
  return (
    <div className="w-full bg-primary px-[20px]">
      <ControlLoading />
      <div className="flex flex-col gap-[20px] justify-center min-h-screen">
        <div className="w-full flex justify-center">
          <picture>
            <img className="h-[100px]" src="/images/reset.png" alt="PIN" />
          </picture>
        </div>
        <div className="text-center text-[30px] text-white">
          <h3>Masukan PIN</h3>
        </div>
        <div className="text-center text-[20px] px-[40px] leading-[20px] text-white">
          <p>Masukan PIN Akunmu.</p>
        </div>
        <form
          className="flex-col items-center justify-center flex gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-[10px] ">
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp1"
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              {...register("otp1", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%] "
              maxLength={1}
              id="otp2"
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              {...register("otp2", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp3"
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              {...register("otp3", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp4"
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              {...register("otp4", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              id="otp5"
              {...register("otp5", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              id="otp6"
              {...register("otp6", { required: true })}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            {/* {errors.username?.type === "required" && "First name is required"} */}
          </div>
          <div className=" w-full flex flex-col items-center gap-[10px] justify-center mt-[20px] ">
            <button
              className={` ${
                isLoading
                  ? "bg-white rounded-lg px-[20px] py-[3px] text-white text-[30px] duration-500"
                  : "px-[20px] py-[5px] hover:scale-105 duration-500 text-gray-700 text-[24px] bg-white rounded-[10px] w-[200px]"
              }`}
              type="submit"
              disabled={isLoading}
            >
              <span className="flex justify-center duration-200">
                {isLoading ? (
                  <img
                    className="animation-popup"
                    src="/images/loading-button.gif"
                    width={"45px"}
                    alt="loading"
                  ></img>
                ) : (
                  <p className="animation-popup">Konfirmasi</p>
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="px-[20px] py-[5px] hover:scale-105 duration-500 text-white shadow-red-600  text-[24px]  w-[200px]"
            >
              Batal
            </button>
          </div>

          <div className=" w-full flex flex-col items-center gap-[10px] justify-center mt-[20px] ">
            <a
              rel="noreferrer"
              type="button"
              href="https://wa.me/6281286412292?text=Halo%20Sepertinya%20Saya%20lupa%20akan%20PIN%20Akun%20saya.%20Bisakah%20Admin%20GetFisio%20Membantu%20Saya?"
              target="_blank"
              className="underline px-[20px] py-[5px] hover:scale-105 duration-500 text-white shadow-red-600  text-[24px]"
            >
              Apakah Kamu lupa PIN mu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
