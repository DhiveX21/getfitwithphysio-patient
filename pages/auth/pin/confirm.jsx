import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../../../helpers/localStorage";
import { useRouter } from "next/router";
import { userCreatePin } from "../../../endpoint/User";
import { useDispatch } from "react-redux";
import { SubmitButton } from "../../../components/Button";

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
  const dispatch = useDispatch();
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
  });
  const router = useRouter();
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
    const joinPin =
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5 + data.otp6;

    if (createPinAttempt == joinPin) {
      const body = {
        phone_number: registeredPhoneNumber.item.phoneNumber,
        pin: joinPin,
      };
      dispatch(userCreatePin(body))
        .then((response) => {
          if (response.status === 200) {
            alert("registrasi PIN berhasil");
            router.push("/auth/login");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("PIN TIDAK SESUAI ");
    }
  };
  return (
    <div className="w-full bg-get_blue px-[20px]">
      <div className="flex flex-col gap-[20px] justify-center min-h-screen">
        <div className="w-full flex justify-center">
          <picture>
            <img className="h-[100px]" src="/images/reset.png" alt="PIN" />
          </picture>
        </div>
        <div className="text-center text-xl text-white font-bold">
          <h3>Konfirmasi PIN kamu</h3>
        </div>
        <div className="text-center text-sm px-[40px]  text-white">
          <p>Masukan ulang PIN mu untuk mengkonfirmasi PIN mu.</p>
        </div>
        <form
          className="flex-col items-center justify-center flex gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-[10px] ">
            <input
              className=" w-[40px] text-center text-xl p-[0px] "
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
              className=" w-[40px] text-center text-xl p-[0px]  "
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
              className=" w-[40px] text-center text-xl p-[0px] "
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
              className=" w-[40px] text-center text-xl p-[0px] "
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
              className=" w-[40px] text-center text-xl p-[0px] "
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
              className=" w-[40px] text-center text-xl p-[0px] "
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
          <div className=" w-full flex justify-center mt-[20px]">
            <SubmitButton
              classNameInject="  text-get_desc shadow-md text-lg bg-white rounded-md w-[200px] "
              text="Konfirmasi"
            ></SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
