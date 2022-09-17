import React from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { useRouter } from "next/router";
import axios from "axios";

const API = {
  create: axios.get("http://localhost:3000/api/createAppointment"),
};

export default function createAppointment() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    API.create.then((response) => {
      router.push(`/appointment/${response.data.id_appointment}`);
    });
  };

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle text="Tele Fisio Appointment"></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
        </div>
        <div>
          <form
            className="flex-col flex gap-[10px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Service
              </label>
              <input
                placeholder="Tele Fisio"
                {...register("service", { required: true })}
              />
              <span className="form-hint">Cth : Fisioterapi Home Care</span>
              {errors.service && <span>This field is required</span>}
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Nama Lengkap
              </label>
              <input
                placeholder="Nama Lengkap"
                {...register("fullname", { required: true })}
              />
              <span className="form-hint">Cth : John Doe</span>
              {errors.fullname && <span>This field is required</span>}
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Tanggal Appointment
              </label>
              <input
                placeholder="12-06-22"
                {...register("appointment_date", { required: true })}
              />
              <span className="form-hint">Cth : 12 Desember 2022</span>
              {errors.appointment_date && <span>This field is required</span>}
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Jam Appointment
              </label>
              <input
                placeholder="13 : 30"
                {...register("appointment_hours", { required: true })}
              />
              <span className="form-hint">Cth : 13 : 30 WIB </span>
              {errors.appointment_hours && <span>This field is required</span>}
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
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Keluhan Kesehatan
              </label>
              <textarea
                placeholder="Keluhan Kesehatan kamu..."
                {...register("health_complaint", { required: true })}
              />
              <span className="form-hint">
                Cth : Saya mengalami Neckpain yang cukup mengganggu, terutama
                pada saat malam hari.{" "}
              </span>
              {errors.health_complaint && <span>This field is required</span>}
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
    </Layout>
  );
}
