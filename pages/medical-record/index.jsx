import React from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import axios from "axios";

export async function getServerSideProps() {
  // const medicalRecords = await fetch(
  //   "http://localhost:3000/api/medical-record/getAllMedicalRecords",
  //   {
  //     body: JSON.stringify({ a: 1, b: "Textual content" }),
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const medicalRecords = await axios
  //   .get(`${req.headers.host}/api/medical-record/getAllMedicalRecords`)
  //   .then((response) => {
  //     return response.data;
  //   });
  const medicalRecords = [
    {
      _id: "1",
      physio_name: "Rifa Rahmalia. S. Kes",
      physio_photo: "/images/physio1.png",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "2",
      physio_name: "Faizah Abdullah, S.St.Ft., S.Ft., M.Biomed.",
      physio_photo: "/images/physio2.jpeg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "3",
      physio_name: "Rossa Nurhanifah. Amd. Ft",
      physio_photo: "/images/physio3.jpeg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "4",
      physio_name: "Amalia Syah V. Amd. Ft",
      physio_photo: "/images/physio4.jpg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
  ];
  return {
    props: { medicalRecords },
  };
}

export default function MedicalRecords(props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="medical-record">
        <div className="medical-record__wrapper flex flex-col p-[20px]">
          <MenuTitle
            text="Rekam Medis"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="medical-record__breadcrumb p-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
          <div className="medical-record__list flex flex-col gap-[10px] mb-[20px]">
            {props.medicalRecords.map((item, index) => {
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    router.push(`/medical-record/${item._id}`);
                  }}
                  className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                >
                  <CardWithThumbnail
                    title={item.physio_name}
                    description={item.medical_complaint}
                    note={item.appointment_date}
                    image={item.physio_photo}
                  />
                </div>
              );
            })}
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
