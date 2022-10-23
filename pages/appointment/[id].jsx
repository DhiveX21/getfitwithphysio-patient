import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardIdentity, FeedBackCardInput } from "../../components/Card";
import { VerticalProgressWithIcon } from "../../components/Progress";
import { Button } from "../../components/Button";
import { Common1 } from "../../components/Common";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProgressTelePhysio } from "../../helpers/common";
import { appointmentGetOne } from "../../endpoint/Appointment";

export async function getServerSideProps(context) {
  //lagi cancel appointment
  const { id } = context.query;
  const appointmentData = await appointmentGetOne(id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    props: { appointmentData },
  };
}

export default function AppointmentInfo({ appointmentData }) {
  const dispatch = useDispatch();
  const status =
    appointmentData.status === "finish"
      ? "finish"
      : appointmentData.status === "cancel"
      ? "cancel"
      : "progress";
  // const status = "cancel";
  const progressSimulation = getProgressTelePhysio(
    appointmentData.status,
    appointmentData.link_meeting
  );
  // const progressSimulation = getProgressTelePhysio(
  //   "treatment",
  //   appointmentData.link_meeting
  // );
  const router = useRouter();
  const { id } = router.query;
  console.log(appointmentData);
  console.log(progressSimulation);

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle text="Detail Appointment"></MenuTitle>
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
        <CardIdentity
          item={[
            { name: appointmentData.patient_detail.name },
            {
              Tanggal_Appointment: appointmentData.date_appointment
                .replace(/T/, " ")
                .replace(/\..+/, "")
                .replace("00:00:00", ""),
            },
            { Jam_Appointment: `${appointmentData.time_appointment} WIB` },
            {
              Tipe_Appointment: appointmentData.appointment_type.replace(
                "_",
                " "
              ),
            },
            { Nama_Fisio: appointmentData.therapist_detail.name },
          ]}
        ></CardIdentity>

        {status === "finish" ? (
          <div>
            <div>
              <h3 className="text-danger text-[20px] ">Feedback</h3>
            </div>
            <FeedBackCardInput />
          </div>
        ) : (
          ""
        )}
        {status === "progress" ? (
          <VerticalProgressWithIcon progress={progressSimulation} />
        ) : status === "cancel" ? (
          <Common1
            image="/images/docsad 2.svg"
            title="Dibatalkan :’("
            description="Kamu telah membatalkan Appointment ini pada tanggal 24 Desember 2022 15:46 WIB"
            noteTitle="Catatan :"
            noteDescription="“Saya ada urusan pada saat tanggal Appointment”"
          />
        ) : status === "finish" ? (
          <Common1
            image="/images/finish_appointment.svg"
            title="Selesai"
            description="Appointment dengan fisio Rifa telah selesai dilakukan. anda dapat melihat Rekam medis anda dengan mengklik tombol di bawah ini."
            noteTitle=""
            noteDescription=""
          />
        ) : (
          ""
        )}
        <div className="my-[20px] button__wrapper w-full flex flex-row justify-center items-center">
          {status === "progress" ? (
            <Button
              text="Cancel"
              classNameInject="w-full bg-danger px-[40px] py-[5px] rounded-lg text-white"
              click={() => {
                console.log("cancel");
              }}
            ></Button>
          ) : status === "cancel" ? (
            ""
          ) : status === "finish" ? (
            <Button
              text="Rekam Medis"
              classNameInject="w-full bg-primary px-[40px] py-[5px] rounded-lg text-white"
              click={() => {
                console.log("rekam medis");
              }}
            ></Button>
          ) : (
            ""
          )}
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
