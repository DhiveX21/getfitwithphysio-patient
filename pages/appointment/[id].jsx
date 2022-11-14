import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CardIdentity } from "../../components/Card";
import { VerticalProgressWithIcon } from "../../components/Progress";
import { Button } from "../../components/Button";
import { Common1 } from "../../components/Common";
import { useEffect, useState } from "react";
import { getProgressTelePhysio } from "../../helpers/common";
import { appointmentGetOne } from "../../endpoint/Appointment";
import { useRef } from "react";
import { appointmentCreateReview } from "../../endpoint/Appointment";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const appointmentData = await appointmentGetOne(id)
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

export default function AppointmentInfo({ appointmentData }) {
  const [reviewPanel, setReviewPanel] = useState(true);
  const reviewInput = useRef();
  const router = useRouter();
  const status =
    appointmentData.status === "complete"
      ? "complete"
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

  function handleSubmitReview() {
    console.log("masuk");
    const body = {
      appointment_id: appointmentData._id,
      rating: {
        rating_value: 5,
        comment: reviewInput.current.value,
      },
    };
    appointmentCreateReview(body)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle text="Detail Appointment"></MenuTitle>
        <div className="breadcrumb mb-[20px]">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs />
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

        {status === "complete" && reviewPanel && !appointmentData.evaluation ? (
          <div>
            <div>
              <h3 className="text-danger text-[20px] ">Feedback</h3>
            </div>
            {/* <FeedBackCardInput /> */}

            <div className="w-full">
              <div className="w-full flex flex-row items-center justify-center bg-[#EAF7FD] rounded-lg p-[10px]">
                <div className="w-[30%] p-[20px]">
                  <picture>
                    <img
                      className="rounded-lg"
                      src="/images/icon/user.png"
                      alt="fisio"
                    />
                  </picture>
                </div>
                <div className="flex flex-col gap-[5px] w-[70%]">
                  <div className="w-full">
                    <h4 className="text-[#68B2BC]">Review</h4>
                  </div>
                  <div className="w-full">
                    <textarea
                      className="w-full h-[75px] text-[20px] text-center leading-[22px] p-[10px]"
                      placeholder="Fisionya baik dan Mengedukasi..."
                      type="text"
                      ref={reviewInput}
                    />
                  </div>
                  <div className="w-full text-center">
                    <Button
                      text="Kirim"
                      classNameInject="w-full bg-primary px-[40px] py-[5px] rounded-lg text-white"
                      click={() => {
                        handleSubmitReview();
                        setReviewPanel(false);
                      }}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
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
            description="Kamu telah membatalkan Appointment ini"
            noteTitle="Catatan :"
            noteDescription="“Saya ada urusan pada saat tanggal Appointment”"
          />
        ) : status === "complete" ? (
          <Common1
            image="/images/finish_appointment.svg"
            title="Selesai"
            description={`Appointment dengan fisio ${appointmentData.therapist_detail.name} telah selesai dilakukan. anda dapat melihat Rekam medis anda dengan mengklik tombol di bawah ini.`}
            noteTitle=""
            noteDescription=""
          />
        ) : (
          ""
        )}
        <div className="my-[20px] button__wrapper w-full flex flex-row justify-center items-center">
          {status === "progress" ? (
            // <Button
            //   text="Cancel"
            //   classNameInject="w-full bg-danger px-[40px] py-[5px] rounded-lg text-white"
            //   click={() => {
            //     console.log("cancel");
            //   }}
            // ></Button>
            ""
          ) : status === "cancel" ? (
            ""
          ) : status === "complete" && appointmentData?.record?._id ? (
            <Button
              text="Rekam Medis"
              classNameInject="w-full bg-primary px-[40px] py-[5px] rounded-lg text-white"
              click={() => {
                router.push(`/medical-record/${appointmentData.record._id}`);
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
