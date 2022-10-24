import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../helpers/localStorage";
import { useRouter } from "next/router";
import { userRegister } from "../../../endpoint/User";
import { userCreatePin } from "../../../endpoint/User";

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   const getOTP = await axios
//     .get("http://localhost:3000/api/loginOtp")
//     .then((response) => {
//       return response.data;
//     });
//   return {
//     props: { providers, csrfToken: await getCsrfToken(context), getOTP },
//   };
// }

export default function ConfirmPin() {
  let createPinAttempt = "";
  let registeredPhoneNumber = "";
  useEffect(() => {
    createPinAttempt = getLocalStorage("createPinAttempt").item;
    registeredPhoneNumber = getLocalStorage("register_attempt");
    if (!createPinAttempt) {
      router.push("/auth/login");
    }
    if (!registeredPhoneNumber) {
      alert("session Timeout");
      router.push("/auth/register");
    }
  }, []);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const joinPin =
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6;
    console.log(createPinAttempt);
    console.log(joinPin);

    if (createPinAttempt == joinPin) {
      const body = {
        phone_number: registeredPhoneNumber.item.phoneNumber,
        pin: joinPin,
      };
      userCreatePin(body)
        .then((response) => {
          if (response.status === 200) {
            alert("registrasi PIN berhasil");
            router.push("/auth/login");
            console.log(response);
          }
        })
        .catch((error) => {
          alert("terjadi kesalahan di server");
          console.error(error);
        });
    } else {
      alert("PIN TIDAK SESUAI ");
    }
  };
  return (
    <div className="w-full bg-primary px-[20px]">
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
