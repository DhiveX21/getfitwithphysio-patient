import React, { useState, useEffect } from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import { appointmentGetAllMedicalRecordByIdUser } from "../../endpoint/Appointment";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { CardFullImage } from "../../components/Card";
import { ButtonWithIcon } from "../../components/Button";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   const medicalRecordsData = await appointmentGetAllMedicalRecordByIdUser(
//     session.credentials.user_id
//   ).then((response) => {
//     return response.data.data;
//   });

//   return {
//     props: { medicalRecordsData },
//   };
// }

export default function CreateDailyMedicalReport() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Laporan Medis Harian"
          icon="/images/icon/daily-calendar.png"
        ></MenuTitle>

        <div className="bg-[#dfdfdf48] p-[10px] rounded-[20px]">
          <CardFullImage
            textStyle={{ marginLeft: "180px" }}
            title="Tulis Laporan Medis Harianmu"
            description="Agara Fisio dapat melihat dan menilai perkembanganmu."
          ></CardFullImage>
          <form
            className="flex-col flex gap-[10px] mt-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Tanggal
              </label>
              <input
                className="w-full"
                placeholder="Tanggal"
                type="date"
                {...register("date", { required: true })}
              ></input>
              <span className="form-hint">Cth : Tanggal Laporan</span>
              {errors.date && <span>This field is required</span>}
            </div>
            <div className="field-group flex flex-col">
              <label className="text-[24px] leading-[28px] text-[#5E5E5E]">
                Laporan Kondisi Kesehatan
                {errors.report && (
                  <span className="text-[24px] text-danger font-bold">
                    (This field is required)
                  </span>
                )}
              </label>
              <textarea
                placeholder="Laporan Kesehatan kamu..."
                {...register("report", { required: true })}
              />
              <span className="form-hint">
                Cth : Saya mengalami Neckpain yang cukup mengganggu, terutama
                pada saat malam hari.
              </span>
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
