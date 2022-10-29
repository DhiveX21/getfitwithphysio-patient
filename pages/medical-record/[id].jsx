import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useDispatch } from "react-redux";
import { CardWithThumbnail } from "../../components/Card";
import axios from "axios";
import { appointmentGetOneMedicalRecord } from "../../endpoint/Appointment";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const medicalRecords = await appointmentGetOneMedicalRecord(id).then(
    (response) => {
      return response.data.data;
    }
  );
  return {
    props: { medicalRecords },
  };
}

export default function AppointmentInfo({ medicalRecords }) {
  const router = useRouter();

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Detail Rekam Medis"
          icon="/images/icon/medical-result_icon.svg"
        ></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
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
        <div className="medical-record__info">
          <CardWithThumbnail
            title={medicalRecords.therapist_detail.name}
            description={medicalRecords.records[0].value}
            note={medicalRecords.date + " " + medicalRecords.time + " WIB"}
            image="/images/icon/user.png"
          />
        </div>
        <div className="medical-record__content">
          <div className="medical-record__content__wrapper p-[15px] bg-[#f3f3ff] shadow-xl rounded-xl">
            {medicalRecords.records.map((item, index) => {
              return (
                <div key={index} className="medical_complaint mb-[20px]">
                  <h3 className="text-[24px] text-primary">{item.key} : </h3>
                  <p className="text-[#2D2D2D] text-[20px] leading-[16px]">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
