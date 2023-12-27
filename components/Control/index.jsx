import React from "react";
import style from "./Control.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { MenuTitle } from "../Title";
import { setLocalStorage } from "../../helpers/localStorage";
import { patientCreate } from "../../endpoint/User";
import { calcAge } from "../../helpers/common";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { SubmitButton } from "../Button";

export function ControlLoading() {
  const loadingCondition = useSelector((state) => state.controlData);
  return (
    <>
      {loadingCondition.controlLoading.active ? (
        <div className={`${style.control_loading} animation-fade`}>
          <div className={style.control_loading__wrapper}>
            <div className={style.control_loading__image}>
              {/* <picture>
                <img
                  src={loadingCondition.controlLoading.image}
                  alt="loading..."
                />
              </picture> */}

              <video
                className="mb-[20px]"
                autoPlay
                playsInline
                muted
                loop
                width={150}
                src={loadingCondition.controlLoading.image}
              />
            </div>
            <div
              className={
                style.control_loading__title +
                " animate-pulse text-get_blue text-2xl font-semibold"
              }
            >
              <h2>{loadingCondition.controlLoading.title}</h2>
            </div>
            <div className={`${style.control_loading__desc} text-get_desc`}>
              <p>{loadingCondition.controlLoading.description}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export function FirstLoginForm() {
  const firstLoginFormCondition = useSelector(
    (state) => state.controlData.firstLoginForm
  );

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  const dispatch = useDispatch();
  let credentials = session?.credentials;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const body = {
      user_id: credentials.id,
      name: data.name,
      gender: data.gender,
      age: calcAge(data.birthdate),
      address: data.address,
      birth_date: data.birthdate,
      email: data.email,
    };
    dispatch(patientCreate(body))
      .then((responseCreate) => {
        if (responseCreate.status == 200) {
          // dispatch(setFirstLoginForm(false));
          setLocalStorage("credentials", responseCreate.data.data);
          router.reload(window.location.pathname);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {firstLoginFormCondition.active ? (
        <div className="w-full max-w-[480px] relative bg-white z-[1000000] animation-scale-up-center">
          <div className="h-screen w-full max-w-[480px] fixed top-[0px] bg-white">
            <div className="px-[20px] flex flex-col gap-[10px] my-[20px] justify-center">
              <MenuTitle text="Isi Kelengkapan data."></MenuTitle>
              <div className="max-h-[500px] px-[10px]">
                <form
                  className="flex-col flex gap-[10px] "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex w-full gap-[10px] ">
                    <div className="field-group flex flex-col w-[calc(50%-5px)] animation-popup-2">
                      <label className="text-sm   text-get_text">
                        Nama Lengkap
                      </label>

                      <input
                        className={` ${
                          errors.name && "border-red-600 border-2 border-dashed"
                        }`}
                        placeholder="Nama Lengkap"
                        {...register("name", { required: true })}
                      />
                      <span className="form-hint">Cth : John Doe</span>
                    </div>
                    <div className="field-group flex flex-col w-[calc(50%-5px)] animation-popup-2">
                      <label className="text-sm   text-get_text">
                        Alamat Email{" "}
                      </label>
                      <input
                        className={` ${
                          errors.email &&
                          "border-red-600 border-2 border-dashed"
                        }`}
                        placeholder="email@gmail.com"
                        {...register("email", { required: true })}
                      />
                      <span className="form-hint">
                        Cth : getfisio@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full gap-[10px] ">
                    <div className="field-group flex flex-col w-1/2 animation-popup-2">
                      <label className="text-sm   text-get_text">
                        Tanggal Lahir
                      </label>
                      <input
                        className={` ${
                          errors.birthdate &&
                          "border-red-600 border-2 border-dashed"
                        } w-full py-[8px]`}
                        type="date"
                        placeholder="12-06-22"
                        {...register("birthdate", { required: true })}
                      />
                      <span className="form-hint">Cth : 12 Desember 2022</span>
                    </div>
                    <div className="field-group flex flex-col w-1/2 animation-popup-2">
                      <label className="text-sm   text-get_text">
                        Jenis Kelamin{" "}
                      </label>
                      <select
                        className={` ${
                          errors.gender &&
                          "border-red-600 border-2 border-dashed"
                        } w-full py-[8px]`}
                        placeholder="13 : 30"
                        {...register("gender", { required: true })}
                      >
                        <option value="male">Laki - Laki</option>
                        <option value="female">Perempuan</option>
                      </select>
                      <span className="form-hint">Cth : Laki-Laki </span>
                    </div>
                  </div>
                  <div className="field-group flex flex-col animation-popup-2">
                    <label className="text-sm   text-get_text">Alamat</label>
                    <textarea
                      rows={5}
                      className={` ${
                        errors.address &&
                        "border-red-600 border-2 border-dashed"
                      } w-full py-[8px]`}
                      placeholder="Alamat Lengkap"
                      {...register("address", { required: true })}
                    />
                  </div>

                  {errors.address ||
                  errors.name ||
                  errors.email ||
                  errors.birthdate ||
                  errors.gender ? (
                    <div className="mt-[20px] flex items-center">
                      <span className="border-red-600 border-2 border-dashed mr-[10px] pt-[1%] text-white">
                        ------
                      </span>
                      <h3 className="text-danger text-xs pt-[1%]">
                        WAJIB DI ISI.
                      </h3>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="create-appointment-button w-full flex gap-[20px] justify-center mt-[20px]">
                    <SubmitButton
                      text="Buat"
                      classNameInject="px-[20px] py-[10px] text-white text-sm bg-primary rounded-full w-[200px]"
                    />
                  </div>
                </form>
                <div className="flex justify-center mt-[20px] animation-popup">
                  <Button
                    text="Logout"
                    click={() => signOut({ callbackUrl: "/auth/login" })}
                    classNameInject=" px-[10px] py-[5px] text-danger opacity-50 text-sm bg-white border-2 border-red-600  rounded-full w-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
