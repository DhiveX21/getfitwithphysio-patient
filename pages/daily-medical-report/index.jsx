import React, { useState, useEffect } from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import { appointmentGetAllMedicalRecordByIdUser } from "../../endpoint/Appointment";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { ButtonWithIcon } from "../../components/Button";

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

export default function DailyMedicalReport() {
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
      <div className="daily-medical-report">
        <div className="daily-medical-report__wrapper flex flex-col px-[20px] mb-[20px]">
          <MenuTitle
            text="Laporan Medis Harian"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="daily-medical-report__breadcrumb p-[10px]">
            <Breadcrumbs />
          </div>
          <div className="daily-medical-report__add mb-[20px]">
            <ButtonWithIcon
              text="Tambah Laporan"
              icon="/images/icon/pencil.png"
              classNameInject=" text-lg bg-white border-2 border-dashed border-primary text-get_blue h-[60px] px-[10px] py-[10px] hover:bg-primary hover:text-white"
              click={() => router.push("/daily-medical-report/create")}
            ></ButtonWithIcon>
          </div>
          <div className="daily-medical-report__list flex flex-col gap-[10px] mb-[20px]">
            <div
              onClick={() => {
                router.push(`/daily-medical-report/1`);
              }}
              className="daily-medical-report__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail
                title={`Daily 1`}
                description={`item.records[0].value`}
                note={null}
                image="/images/icon/clipboard.png"
              />
            </div>
            <div
              onClick={() => {
                router.push(`/daily-medical-report/1`);
              }}
              className="daily-medical-report__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail
                title={`Daily 1`}
                description={`item.records[0].value`}
                note={null}
                image="/images/icon/clipboard.png"
              />
            </div>
            <div
              onClick={() => {
                router.push(`/daily-medical-report/1`);
              }}
              className="daily-medical-report__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail
                title={`Daily 1`}
                description={`item.records[0].value`}
                note={null}
                image="/images/icon/clipboard.png"
              />
            </div>
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
