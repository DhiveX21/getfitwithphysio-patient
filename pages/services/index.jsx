import React from "react";
import { CardWithThumbnail2 } from "../../components/Card";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import Link from "next/link";

export default function services() {
  return (
    <>
      <Layout>
        <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
          <MenuTitle text="Pilih Layanan"></MenuTitle>
          <Breadcrumbs
            useDefaultStyle={false}
            containerClassName="breadcrumbs-container"
            listClassName="breadcrumbs-list"
            inactiveItemClassName="breadcrumbs-inactive"
            activeItemClassName="breadcrumbs-active"
            rootLabel="Get Physio"
          />
          <Link href="/services/telephysio">
            <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out">
              <CardWithThumbnail2
                image="/images/article3.png"
                title="Tele Fisio"
                note="Baru"
                description="Treatment Fisioterapi online, konsultasi dan arahan dari keluhan mu secara online."
              ></CardWithThumbnail2>
            </div>
          </Link>
          <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out grayscale">
            <CardWithThumbnail2
              cardStyle="opacity-50"
              image="/images/article2.png"
              title="Clinic Treatment"
              note="Baru"
              description="Treatment Fisioterapi inClinic, nikmati treatment dengan manfaat maksimal dengan datang ke klinik."
            ></CardWithThumbnail2>
          </div>
          <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out grayscale">
            <CardWithThumbnail2
              cardStyle="opacity-50 "
              image="/images/article1.png"
              title="Home Care"
              note="Baru"
              description="Treatment Fisioterapi di rumah, cukup rebahan kamu dapat memanggil Fisio ke rumah mu."
            ></CardWithThumbnail2>
          </div>
        </div>
      </Layout>
    </>
  );
}
