import React from "react";
import style from "./Control.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { MenuTitle } from "../Title";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
import { patientCreate, patientGetOneByUserId } from "../../endpoint/User";
import { setFirstLoginForm } from "../../store/actions/controlActions";
import { calcAge } from "../../helpers/common";
import { useEffect } from "react";

export function ControlLoading({
  image = "/images/example.jpg",
  title = "Title Common1",
  description = "Description Common1",
  noteTitle = "noteTitle",
  noteDescription = "note Description",
}) {
  const loadingCondition = useSelector((state) => state.controlData);
  return (
    <>
      {loadingCondition.controlLoading.active ? (
        <div className={style.control_loading}>
          <div className={style.control_loading__wrapper}>
            <div className={style.control_loading__image}>
              <picture>
                <img
                  src={loadingCondition.controlLoading.image}
                  alt="loading..."
                />
              </picture>
            </div>
            <div className={style.control_loading__title + " animate-pulse"}>
              <h2>{loadingCondition.controlLoading.title}</h2>
            </div>
            <div className={style.control_loading__desc}>
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
  const dispatch = useDispatch();
  let credentials = getLocalStorage("credentials");
  if (credentials) {
    credentials = credentials.item;
  }
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const body = {
      user_id: credentials.id,
      name: data.name,
      gender: data.gender,
      age: calcAge(data.birthdate),
      address: data.address,
      birth_date: data.birthdate,
      email: data.email,
    };
    patientCreate(body)
      .then((responseCreate) => {
        console.log(responseCreate);
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
        <div className="w-full max-w-[480px] relative bg-white z-[1000000]">
          <div className="h-screen w-full max-w-[480px] fixed top-[0px] bg-white">
            <div className="px-[20px] flex flex-col gap-[10px] my-[20px] justify-center">
              <MenuTitle text="Isi Kelengkapan data kamu dulu yuk..."></MenuTitle>
              <div>
                <form
                  className="flex-col flex gap-[10px] overflow-y-scroll max-h-[500px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="field-group flex flex-col">
                    <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                      Nama Lengkap
                    </label>
                    <input
                      placeholder="Nama Lengkap"
                      {...register("name", { required: true })}
                    />
                    <span className="form-hint">Cth : John Doe</span>
                    {errors.name && <span>This field is required</span>}
                  </div>
                  <div className="field-group flex flex-col">
                    <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                      Alamat Email
                    </label>
                    <input
                      placeholder="email@gmail.com"
                      {...register("email", { required: true })}
                    />
                    <span className="form-hint">Cth : getfisio@gmail.com</span>
                    {errors.name && <span>This field is required</span>}
                  </div>
                  <div className="field-group flex flex-col">
                    <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      placeholder="12-06-22"
                      {...register("birthdate", { required: true })}
                    />
                    <span className="form-hint">Cth : 12 Desember 2022</span>
                    {errors.birthdate && <span>This field is required</span>}
                  </div>
                  <div className="field-group flex flex-col">
                    <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                      Jenis Kelamin
                    </label>
                    <select
                      placeholder="13 : 30"
                      {...register("gender", { required: true })}
                    >
                      <option value="male">Laki - Laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                    <span className="form-hint">Cth : Laki-Laki </span>
                    {errors.gender && <span>This field is required</span>}
                  </div>
                  <div className="field-group flex flex-col">
                    <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                      Alamat
                    </label>
                    <textarea
                      placeholder="Alamat Lengkap"
                      {...register("address", { required: true })}
                    />
                    {errors.address && <span>This field is required</span>}
                  </div>

                  <div className="create-appointment-button w-full flex justify-center mt-[20px]">
                    <Button
                      type="submit"
                      text="Buat"
                      classNameInject="px-[20px] py-[5px] text-[#fff] text-[24px] bg-primary rounded-[10px] w-[200px]"
                    />
                  </div>
                </form>
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
