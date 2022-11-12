import React from "react";
import { useForm } from "react-hook-form";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../helpers/localStorage";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setControlLoading } from "../../../store/actions/controlActions";
import { signIn } from "next-auth/react";
import { ControlLoading } from "../../../components/Control";
import { userLogin } from "../../../endpoint/User";
import { useEffect } from "react";

export default function LoginPin() {
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

        setTimeout(() => {
          document.getElementById(`otp${id + 1}`).setSelectionRange(0, 1);
        }, 0);
      }
    } else {
      if (id !== 1) {
        e.preventDefault();
        document.getElementById(`otp${id - 1}`).focus();

        setTimeout(() => {
          document.getElementById(`otp${id - 1}`).setSelectionRange(0, 1);
        }, 0);
      }
    }
    // document.getElementById("otp2").value = "";
  }

  const onSubmit = (data) => {
    dispatch(
      setControlLoading(
        true,
        "Loading",
        "Please Wait",
        "/images/controlLoading.gif"
      )
    );

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
        dispatch(setControlLoading(false));
      } else {
        router.push("/dashboard");

        setTimeout(() => {
          dispatch(setControlLoading(false));
        }, 2000);
      }
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
          <h3>Konfirmasi PIN kamu</h3>
        </div>
        <div className="text-center text-[20px] px-[40px] leading-[20px] text-white">
          <p>Masukan ulang PIN mu untuk mengkonfirmasi PIN mu.</p>
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
              {...register("otp1", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%] "
              maxLength={1}
              id="otp2"
              type="password"
              {...register("otp2", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp3"
              type="password"
              {...register("otp3", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp4"
              type="password"
              {...register("otp4", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              id="otp5"
              {...register("otp5", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              id="otp6"
              {...register("otp6", { required: true })}
              onChange={(e) => handleChange(e)}
            />
            {/* {errors.username?.type === "required" && "First name is required"} */}
          </div>
          <div className=" w-full flex justify-center mt-[20px]">
            <button
              type="submit"
              className="px-[20px] py-[5px] hover:scale-105 duration-500 text-gray-700 text-[24px] bg-white rounded-[10px] w-[200px]"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
