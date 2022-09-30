import React from "react";
import Carousel from "../components/carousel";
import Layout from "../components/Layout";
import { ButtonWithIcon, ButtonWithIcon2 } from "../components/Button";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../components/Card";
import { SectionTitle } from "../components/Title";
import { useRouter } from "next/router";
import axios from "axios";

// dashboard.auth = {
//   // role: "admin",
//   // loading: "<div>loading</div>",
//   unauthorized: "/auth/login", // redirect to this url
// };

export async function getServerSideProps(context) {
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

export default function Dashboard(props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__wrapper flex flex-col px-[20px]">
          <div className="dashboard__action mb-[20px]">
            <div className="dashboard__action__wrapper flex flex-row justify-between w-full gap-[10px]">
              <div className="dashboard__action__item w-1/2 h-auto">
                {/* <button className="bg-primary text-white">
                  Buat Appointment
                </button> */}
                <ButtonWithIcon
                  text="Buat Appointment"
                  classNameInject="text-[24px] leading-[18px] h-full bg-primary"
                  icon="/images/icon/appointment_icon.svg"
                  click={() => {
                    router.push("/services");
                  }}
                />
              </div>
              <div className="dashboard__action__item w-1/2 h-auto">
                {/* <button className="bg-danger text-white">Rekam Medis</button> */}
                <ButtonWithIcon
                  classNameInject="bg-lightDanger text-[24px] leading-[18px] h-full"
                  text="Rekam Medis"
                  icon="./images/icon/medical-result_icon.svg"
                  click={() => {
                    router.push("/medical-record");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="dashboard__carousel w-full">
            <div className="dashboard__carousel__wrapper w-full rounded-md">
              <Carousel
                swiperItem={[
                  ` <div className="w-full rounded-[10px] overflow-hidden">
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>`,
                  `<div className="w-full rounded-[10px] overflow-hidden">
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>`,
                ]}
              />
            </div>
          </div>
          <div className="dashboard__breadcrumb my-[5px]">
            <div className="dashboard__breadcrumb__wrapper px-[10px]">
              <Breadcrumbs
                useDefaultStyle={false}
                containerClassName="breadcrumbs-container"
                listClassName="breadcrumbs-list"
                inactiveItemClassName="breadcrumbs-inactive"
                activeItemClassName="breadcrumbs-active"
                rootLabel="Get Physio"
              />
              {/* <span>
                <h4>Get Physio /</h4>
                <h5>Home</h5>
              </span> */}
            </div>
          </div>
          <div className="dashboard__last-appointment mb-[20px]">
            <div className="dashboard__last-appointment__wrapper ">
              <CardWithThumbnail
                image={props.medicalRecords[0].physio_photo}
                title={props.medicalRecords[0].physio_name}
                description={props.medicalRecords[0].medical_complaint}
                note={props.medicalRecords[0].appointment_date}
              ></CardWithThumbnail>
            </div>
          </div>
          <div className="dashboard__menu mb-[20px]">
            <div className="dashboard__menu__wrapper">
              <div className="dashboard__menu__list  flex w-full justify-center gap-[10px] flex-wrap">
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Buat Appointment"
                    type="button"
                    icon="/images/icon/appointment_icon.svg"
                    click={() => router.push("/services")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Rekam Medis"
                    type="button"
                    icon="/images/icon/medical-result_icon.svg"
                    click={() => router.push("/medical-record")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Tele Physio"
                    type="button"
                    icon="/images/icon/online.png"
                    click={() => router.push("/services/telephysio")}
                  ></ButtonWithIcon2>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mb-[20px]"
            style={{ width: "calc(100% + 40px)", marginLeft: "-20px" }}
          >
            <SectionTitle text="Latest Article"></SectionTitle>
          </div>
        </div>
      </div>
    </Layout>
  );
}
