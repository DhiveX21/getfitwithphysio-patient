import React from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import { CardFullImage } from "../../../components/Card";

export default function index() {
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Tele Fisio"
          icon="/images/tele_physio_icon.png"
        ></MenuTitle>

        <div className="bg-[#dfdfdf48] p-[10px] rounded-[20px]">
          <CardFullImage
            textStyle={{ marginLeft: "180px" }}
            title="Konsultasi Fisioterapi secara Online"
            description="Efektif, On Point, dan Edukatif"
          ></CardFullImage>
          <div className="note_title mt-[20px]">
            <h3 className="text-primary text-[30px] m-0">Detail : </h3>
          </div>
          <div className="note_desc mt-[20px]">
            <p className="text-[#5E5E5E] text-[20px] text-justify m-0">
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
        </div>
      </div>
      ;
    </Layout>
  );
}
