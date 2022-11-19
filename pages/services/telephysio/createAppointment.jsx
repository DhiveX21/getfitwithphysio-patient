import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { useRouter } from "next/router";
import { appointmentCreate } from "../../../endpoint/Appointment";
import { useState } from "react";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: { credentials: session?.credentials },
  };
}

export default function CreateAppointment({ credentials }) {
  const [submitButton, setSubmitButton] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitButton(false);

    const body = {
      patient_id: credentials.id,
      therapist_id: 1,
      date: data.appointment_date,
      time: data.appointment_hours,
      appointment_type: data.service,
      address: data.address,
      complaints: data.health_complaint,
    };
    appointmentCreate(body)
      .then((response) => {
        if (response.status === 200) {
          alert("Appointment berhasil di buat");
          router.push(`/appointment/${response.data.data._id}`);
        }
      })
      .catch((error) => {
        alert("Terjadi Keasalahan di Server");
        setSubmitButton(true);
      });
  };

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle text="Tele Fisio Appointment"></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs />
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
              <select
                placeholder="Tele Fisio"
                defaultValue="tele_physio"
                readOnly
                {...register("service", { required: true })}
              >
                <option value="tele_physio">Tele Fisio</option>
              </select>
              <span className="form-hint">Cth : Fisioterapi Home Care</span>
              {errors.service && <span>This field is required</span>}
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Nama Lengkap{" "}
                {errors.fullname && (
                  <span className="text-[24px] text-danger font-bold">
                    (This field is required)
                  </span>
                )}
              </label>
              <input
                defaultValue={credentials.name}
                placeholder="Nama Lengkap"
                readOnly
                {...register("fullname", { required: true })}
              />
              <span className="form-hint">Cth : John Doe</span>
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Tanggal Appointment{" "}
                {errors.appointment_date && (
                  <span className="text-[24px] text-danger font-bold">
                    (This field is required)
                  </span>
                )}
              </label>
              <input
                className="py-[8px] w-full"
                placeholder="12-06-22"
                type="date"
                {...register("appointment_date", {
                  required: true,
                })}
              />
              <span className="form-hint">Cth : 12 Desember 2022 </span>
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Jam Appointment{" "}
                {errors.appointment_hours && (
                  <span className="text-[24px] text-danger font-bold">
                    (Tolong Isi Jam Appointment dengan Benar)
                  </span>
                )}
              </label>
              <input
                placeholder="13 : 30"
                type="time"
                {...register("appointment_hours", {
                  required: true,
                  pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                })}
              />
              <span className="form-hint">Cth : 13:30 </span>
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Alamat{" "}
                {errors.address && (
                  <span className="text-[24px] text-danger font-bold">
                    (This field is required)
                  </span>
                )}
              </label>
              <input
                placeholder="Alamat Lengkap"
                defaultValue={credentials.address}
                {...register("address", { required: true })}
              />
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Keluhan Kesehatan{" "}
                {errors.health_complaint && (
                  <span className="text-[24px] text-danger font-bold">
                    (This field is required)
                  </span>
                )}
              </label>
              <textarea
                className=" text-[24px] leading-[28px] py-[10px]"
                rows={4}
                placeholder="Keluhan Kesehatan kamu..."
                {...register("health_complaint", { required: true })}
              />
              <span className="form-hint">
                Cth : Saya mengalami Neckpain yang cukup mengganggu, terutama
                pada saat malam hari.{" "}
              </span>
            </div>
            <div className="create-appointment-button w-full flex justify-center mt-[20px]">
              <Button
                type="submit"
                text="Buat"
                disabled={!submitButton}
                classNameInject="px-[20px] py-[5px] text-[#fff] text-[24px] bg-primary rounded-[10px] w-[200px]"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
