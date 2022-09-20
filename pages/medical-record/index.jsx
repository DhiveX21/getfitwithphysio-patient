import React from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";

export default function index() {
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
            <div
              onClick={() => {
                router.push("/medical-record/1");
              }}
              className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail title="physio1" image="/images/physio1.png" />
            </div>
            <div
              onClick={() => {
                router.push("/medical-record/1");
              }}
              className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail title="physio2" image="/images/physio2.jpeg" />
            </div>
            <div
              onClick={() => {
                router.push("/medical-record/1");
              }}
              className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail title="physio3" image="/images/physio3.jpeg" />
            </div>
            <div
              onClick={() => {
                router.push("/medical-record/1");
              }}
              className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
            >
              <CardWithThumbnail title="physio4" image="/images/physio4.jpg" />
            </div>
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
