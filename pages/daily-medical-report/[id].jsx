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

export default function DetailDailyMedicalReport() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });
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
          <div className="note_title mt-[20px]">
            <h3 className="text-get_blue text-center text-lg m-0">
              12 September 2022
            </h3>
          </div>
          <div className="note_desc mt-[10px]">
            <p className="text-get_desc text-sm  text-center m-0">
              COVID-19 pandemic is the biggest challenge for physiotherapists in
              providing health services to stroke patients, that
              physiotherapists must take innovative and adaptive approaches to
              monitor patient progress. Currently, tele-physiotherapy is a
              global trend that can be applied by physiotherapists during the
              COVID-19 pandemic to improve secondary health-care for stroke
              patients. This study aims to determine the effect of
              tele-physiotherapy on the quality of life of stroke patients
              during the COVID-19 pandemic. The design of this study was a
              systematic literature review, the independent variable is
              tele-physiotherapy and the dependent variable is quality of life
              with stroke patients as the study subjects.
            </p>
          </div>
          <div className="note_button mt-[50px]">
            <Button
              text="Kembali"
              classNameInject=" text-lg  h-full bg-get_pink w-full py-[10px] text-white rounded-lg"
              click={() => router.push("/daily-medical-report")}
            ></Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
