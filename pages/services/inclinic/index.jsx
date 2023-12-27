import React, { useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import { CardFullImage } from "../../../components/Card";
import { ButtonWithIcon } from "../../../components/Button";
import { useRouter } from "next/router";
import { patientAddSignatureFile } from "../../../endpoint/User";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: { credentials: session?.credentials },
  };
}

export default function Telephysio({ credentials }) {
  const [createButton, setCreateButton] = useState(
    credentials.signature_url ? true : false
  );
  const [uploadSign, setUploadSign] = useState();
  const signUpload = useRef();
  const router = useRouter();

  function handleSubmit() {
    if (!credentials.signature_url) {
      patientAddSignatureFile(credentials.user_id, uploadSign)
        .then((response) => {
          router.push("/services/telephysio/createAppointment");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      router.push("/services/telephysio/createAppointment");
    }
  }
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Tele Fisio"
          icon="/images/icon/tele_physio_icon.png"
        ></MenuTitle>

        <div className="bg-[#dfdfdf48] p-[10px] rounded-[20px]">
          <CardFullImage
            textStyle={{ marginLeft: "38%" }}
            title="Konsultasi Fisioterapi secara Online"
            description="Efektif, On Point, dan Edukatif"
          ></CardFullImage>
          <div className="note_title mt-[20px]">
            <h3 className="text-get_blue text-center text-lg m-0">Detail</h3>
          </div>
          <div className="note_desc mt-[10px]">
            <p className="text-get_navy text-sm text-center m-0">
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
          {!credentials.signature_url ? (
            <div className="note_sign w-full flex mt-[20px] flex-col">
              <span className="text-sm text-center text-get_blue">
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
                className={` hover:bg-get_blue hover:text-white duration-200 rounded-md text-lg text-center px-[20px] py-[5px] cursor-pointer text-get_blue w-full border-2 border-dashed flex flex-col justify-center items-center  ${
                  uploadSign ? "border-success text-success" : "border-get_blue"
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
          ) : null}

          <div className="note_button mt-[20px]">
            <ButtonWithIcon
              text="Buat Appointment"
              classNameInject={` text-white text-sm h-full ${
                createButton ? "bg-get_blue" : "bg-secondary bg-opacity-50"
              }`}
              icon="/images/icon/appointment_icon.svg"
              disabled={!createButton}
              click={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
      ;
    </Layout>
  );
}
