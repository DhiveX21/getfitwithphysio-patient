import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useDispatch } from "react-redux";
import { CardWithThumbnail } from "../../components/Card";
import axios from "axios";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const medicalRecords = await axios
    .get(
      `http://localhost:3000/api/medical-record/getMedicalRecordById?id=${id}`
    )
    .then((response) => {
      return response.data;
    });
  return {
    props: { medicalRecords },
  };
}

export default function AppointmentInfo(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

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
            title={props.medicalRecords.physio_name}
            description={props.medicalRecords.medical_complaint}
            note={props.medicalRecords.appointment_date}
            image={props.medicalRecords.physio_photo}
          />
        </div>
        <div className="medical-record__content">
          <div className="medical-record__content__wrapper p-[15px] bg-[#f3f3ff] shadow-xl rounded-xl">
            <div className="medical_complaint mb-[20px]">
              <h3 className="text-[24px] text-primary">Keluhan : </h3>
              <p className="text-[#2D2D2D] text-[20px] leading-[16px]">
                {props.medicalRecords.medical_complaint}
              </p>
            </div>
            <div className="rpd mb-[24px]">
              <h3 className="text-[24px] text-primary">RPD : </h3>
              <p className="text-[#2D2D2D] text-[20px] leading-[16px]">
                {props.medicalRecords.rpd}
              </p>
            </div>
            <div className="rpk mb-[24px]">
              <h3 className="text-[24px] text-primary">RPK : </h3>
              <p className="text-[#2D2D2D] text-[20px] leading-[16px]">
                {props.medicalRecords.rpk}
              </p>
            </div>
            <div className="rps mb-[24px]">
              <h3 className="text-[24px] text-primary">RPS : </h3>
              <p className="text-[#2D2D2D] text-[20px] leading-[16px]">
                {props.medicalRecords.rps}
              </p>
            </div>
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
