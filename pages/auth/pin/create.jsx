import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../helpers/localStorage";
import { useRouter } from "next/router";

export default function CreatePin() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const joinPin =
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6;
    setLocalStorage("createPinAttempt", joinPin, 300);

    if (getLocalStorage("createPinAttempt")) {
      router.push("/auth/pin/confirm");
    } else {
      alert("gagal Terhubung ke Server.");
    }
  };
  return (
    <div className="w-full bg-primary px-[20px]">
      <div className="flex flex-col gap-[20px] justify-center min-h-screen">
        <div className="w-full flex justify-center">
          <picture>
            <img className="h-[100px]" src="/images/password.png" alt="PIN" />
          </picture>
        </div>
        <div className="text-center text-[30px] text-white">
          <h3>Buat PIN Anda</h3>
        </div>
        <div className="text-center text-[20px] px-[40px] leading-[20px] text-white">
          <p>
            Pastikan Jaga Kerahasiaan PIN anda dan <b>JANGAN</b> berikan PIN
            kepada orang lain.
          </p>
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
              onChange={() => document.getElementById("otp2").focus()}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%] "
              maxLength={1}
              id="otp2"
              type="password"
              {...register("otp2", { required: true })}
              onChange={() => document.getElementById("otp3").focus()}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp3"
              type="password"
              {...register("otp3", { required: true })}
              onChange={() => document.getElementById("otp4").focus()}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              id="otp4"
              type="password"
              {...register("otp4", { required: true })}
              onChange={() => document.getElementById("otp5").focus()}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              id="otp5"
              {...register("otp5", { required: true })}
              onChange={() => document.getElementById("otp6").focus()}
            />
            <input
              className=" w-[40px] text-center text-[30px] p-[0px] pt-[1%]"
              maxLength={1}
              type="password"
              id="otp6"
              {...register("otp6", { required: true })}
            />
            {/* {errors.username?.type === "required" && "First name is required"} */}
          </div>
          <div className=" w-full flex justify-center mt-[20px]">
            <button
              type="submit"
              className="px-[20px] py-[5px]  text-gray-700 text-[24px] bg-white rounded-[10px] w-[200px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
