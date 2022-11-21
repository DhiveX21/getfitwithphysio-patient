import React, { useState, useEffect } from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import { appointmentGetAllMedicalRecordByIdUser } from "../../endpoint/Appointment";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import NotFound from "../../components/Notfound";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const medicalRecordsData = await appointmentGetAllMedicalRecordByIdUser(
    session?.credentials.user_id
  ).then((response) => {
    return response.data.data;
  });

  return {
    props: { medicalRecordsData },
  };
}

export default function MedicalRecords({ medicalRecordsData }) {
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
      <div className="medical-record">
        <div className="medical-record__wrapper flex flex-col px-[20px] mb-[20px]">
          <MenuTitle
            text="Rekam Medis"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="medical-record__breadcrumb p-[10px]">
            <Breadcrumbs />
          </div>
          <div className="medical-record__list flex flex-col gap-[10px] mb-[20px]">
            {medicalRecordsData && medicalRecordsData.length > 0 ? (
              medicalRecordsData.map((item, index) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      router.push(`/medical-record/${item._id}`);
                    }}
                    className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                  >
                    <CardWithThumbnail
                      title={item.therapist_detail.name}
                      description={item.records[0].value}
                      note={item.date + " " + item.time + " WIB"}
                      image={`/images/${item.therapist_detail.name}.png`}
                    />
                  </div>
                );
              })
            ) : (
              <NotFound
                title="Umm, Sepertinya Kosong"
                description="Apakah kamu sudah pernah membuat Appointment Fisio?, jika sudah mungkin saja fisio belum mengisi rekam medisnya untuk mu, Kita tunggu sebentar lagi yukk... :)"
              />
            )}
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
