import React from "react";
import Carousel from "../components/carousel";
import Layout from "../components/Layout";
import { ButtonWithIcon, ButtonWithIcon2 } from "../components/Button";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../components/Card";
import { SectionTitle } from "../components/Title";
import { useRouter } from "next/router";

// dashboard.auth = {
//   // role: "admin",
//   // loading: "<div>loading</div>",
//   unauthorized: "/auth/login", // redirect to this url
// };

export default function dashboard() {
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
                  icon="./images/appointment_icon.svg"
                />
              </div>
              <div className="dashboard__action__item w-1/2 h-auto">
                {/* <button className="bg-danger text-white">Rekam Medis</button> */}
                <ButtonWithIcon
                  classNameInject="bg-lightDanger text-[24px] leading-[18px] h-full"
                  text="Rekam Medis"
                  icon="./images/medical-result_icon.svg"
                />
              </div>
            </div>
          </div>
          <div className="dashboard__carousel w-full">
            <div className="dashboard__carousel__wrapper w-full rounded-md">
              <Carousel
                swiperItem={[
                  <div className="w-full rounded-[10px] overflow-hidden">
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>,
                  <div className="w-full rounded-[10px] overflow-hidden">
                    <picture>
                      <img
                        className="w-full object-cover"
                        src="./images/servicelist_1.png"
                      />
                    </picture>
                  </div>,
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
              <CardWithThumbnail></CardWithThumbnail>
            </div>
          </div>
          <div className="dashboard__menu mb-[20px]">
            <div className="dashboard__menu__wrapper">
              <div className="dashboard__menu__list  flex w-full justify-center gap-[10px] flex-wrap">
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2
                    text="Buat Appointment"
                    type="button"
                    click={() => router.push("/services")}
                  ></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2></ButtonWithIcon2>
                </div>
                <div className="dashboard__menu__list__item w-1/4">
                  <ButtonWithIcon2></ButtonWithIcon2>
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
