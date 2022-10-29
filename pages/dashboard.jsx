import React from "react";
import Carousel from "../components/carousel";
import Layout from "../components/Layout";
import { ButtonWithIcon, ButtonWithIcon2 } from "../components/Button";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../components/Card";
import { SectionTitle } from "../components/Title";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { appointmentGetAllByUserId } from "../endpoint/Appointment";
import { formatDateRawToYMD } from "../helpers/common";
import Link from "next/link";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const appointmentData = await appointmentGetAllByUserId(
    session.credentials.user_id
  )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return [];
    });

  return {
    props: { appointmentData },
  };
}

export default function Dashboard({ appointmentData }) {
  const router = useRouter();
  return (
    <Layout>
      <div className="dashboard ">
        <div className="dashboard__wrapper flex flex-col px-[20px]">
          <div className="dashboard__action mb-[20px]">
            <div className="dashboard__action__wrapper flex flex-row justify-between w-full gap-[10px]">
              <div className="dashboard__action__item w-1/2 h-auto">
                <ButtonWithIcon
                  text="Buat Appointment"
                  classNameInject="text-[24px] leading-[18px] h-full bg-primary"
                  icon="/images/icon/calendar_danger.png"
                  click={() => {
                    router.push("/services");
                  }}
                />
              </div>
              <div className="dashboard__action__item w-1/2 h-auto">
                {/* <button className="bg-danger text-white">Rekam Medis</button> */}
                <ButtonWithIcon
                  classNameInject="bg-danger text-[24px] leading-[18px] h-full"
                  text="Rekam Medis"
                  icon="./images/icon/clipboard.png"
                  click={() => {
                    router.push("/medical-record");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="dashboard__carousel w-full">
            <div className="dashboard__carousel__wrapper w-full rounded-md">
              <Carousel>
                {[
                  <div
                    key={1}
                    className="w-full rounded-[10px] overflow-hidden"
                  >
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>,
                  <div
                    key={2}
                    className="w-full rounded-[10px] overflow-hidden"
                  >
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>,
                ]}
              </Carousel>
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
            </div>
          </div>
          {appointmentData.length > 0 ? (
            <Link href={`/appointment/${appointmentData[0]._id}`}>
              <div className="dashboard__last-appointment mb-[20px] cursor-pointer">
                <div className="dashboard__last-appointment__wrapper ">
                  <CardWithThumbnail
                    image="/images/icon/user.png"
                    title={appointmentData[0].therapist_detail.name}
                    description={appointmentData[0].complaints}
                    note={formatDateRawToYMD(
                      appointmentData[0].date_appointment
                    )}
                  ></CardWithThumbnail>
                </div>
              </div>
            </Link>
          ) : null}
          <div className="dashboard__menu mb-[20px]">
            <div className="dashboard__menu__wrapper">
              <div className="dashboard__menu__list  flex w-full justify-center gap-[10px] flex-wrap">
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Buat Appointment"
                    type="button"
                    icon="/images/icon/calendar.png"
                    click={() => router.push("/services")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Rekam Medis"
                    type="button"
                    icon="/images/icon/clipboard.png"
                    click={() => router.push("/medical-record")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Tele Physio"
                    type="button"
                    icon="/images/icon/video-call.png"
                    click={() => router.push("/services/telephysio")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Latihan"
                    type="button"
                    icon="/images/icon/excercise.png"
                    click={() => router.push("/exercise")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Riwayat Appointment"
                    type="button"
                    icon="/images/icon/schedule.png"
                    click={() => router.push("/appointment")}
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
