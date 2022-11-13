import React, { useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import { CardFullImage } from "../../../components/Card";
import { ButtonWithIcon } from "../../../components/Button";
import { useRouter } from "next/router";

export default function Telephysio() {
  const [createButton, setCreateButton] = useState(false);
  const [uploadSign, setUploadSign] = useState();
  const signUpload = useRef();
  console.log(uploadSign);
  const router = useRouter();
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Tele Fisio"
          icon="/images/icon/tele_physio_icon.png"
        ></MenuTitle>

        <div className="bg-[#dfdfdf48] p-[10px] rounded-[20px]">
          <CardFullImage
            textStyle={{ marginLeft: "180px" }}
            title="Konsultasi Fisioterapi secara Online"
            description="Efektif, On Point, dan Edukatif"
          ></CardFullImage>
          <div className="note_title mt-[20px]">
            <h3 className="text-primary text-center text-[24px] m-0">Detail</h3>
          </div>
          <div className="note_desc mt-[10px]">
            <p className="text-[#5E5E5E] text-[20px] leading-[18px] text-center m-0">
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

          <div className="note_sign w-full flex mt-[20px] flex-col">
            <span className="text-[20px] text-center text-primary">
              Upload Tanda Tangan Digitalmu.
            </span>
            <input
              className="w-full"
              id="sign-button"
              type="file"
              hidden
              ref={signUpload}
              accept="image/png, image/jpeg"
              onChange={(e) =>
                e.target.value
                  ? (setCreateButton(true), setUploadSign(e.target.files[0]))
                  : setCreateButton(false)
              }
            />
            <label
              className={` hover:bg-primary hover:text-white duration-200 rounded-md text-[24px] text-center px-[20px] py-[5px] cursor-pointer text-primary w-full border-2 border-dashed flex flex-col justify-center items-center leading-[1em] ${
                uploadSign ? "border-success text-success" : "border-primary"
              }`}
              htmlFor="sign-button"
            >
              <span>
                <img
                  className="max-w-[50px] "
                  src={`/images/icon/${
                    uploadSign ? "upload-success.png" : "upload.png"
                  }`}
                  alt="upload"
                />
              </span>
              {uploadSign ? uploadSign.name : "Upload Tanda Tangan"}
            </label>
          </div>
          <div className="note_button mt-[20px]">
            <ButtonWithIcon
              text="Buat Appointment"
              classNameInject={` text-white text-[24px] leading-[18px] h-full ${
                createButton ? "bg-primary" : "bg-secondary bg-opacity-50"
              }`}
              icon="/images/icon/appointment_icon.svg"
              disabled={!createButton}
              click={() =>
                router.push("/services/telephysio/createAppointment")
              }
            />
          </div>
        </div>
      </div>
      ;
    </Layout>
  );
}
