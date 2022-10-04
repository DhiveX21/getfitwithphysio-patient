import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardIdentity, FeedBackCardInput } from "../../components/Card";
import { VerticalProgressWithIcon } from "../../components/Progress";
import { Button } from "../../components/Button";
import { Common1 } from "../../components/Common";
import { setControlLoading } from "../../store/actions/controlActions";
import { useDispatch } from "react-redux";

export default function AppointmentInfo() {
  const dispatch = useDispatch();
  const status = "finish";
  const progressSimulation = [
    {
      icon: "/images/icon/search_fisio.svg",
      title: "Memesan Tanggal Appointment",
      description: "Sesi Booking untuk menentukan Tanggal Appointment mu",
      status: "2",
    },
    {
      icon: "/images/icon/booking-online.svg",
      title: "Mencari Fisioterapi",
      description: "Mencari Fisio terbaik dari kami untuk mu...",
      status: "1",
    },
    {
      icon: "/images/icon/waiting.svg",
      title: "Nunggu Tanggal Treatment",
      description: "Menunggu waktu pertemuan kita.",
      status: "0",
    },
    {
      icon: "/images/icon/online.svg",
      title: "Sesi Treatment",
      description:
        "Kami akan selalu mengusahakan Treatment terbaik untuk masalahmu",
      status: "0",
    },
    {
      icon: "/images/icon/positive-vote.svg",
      title: "Selesai Treatment",
      description: "Sesi nya selesai, Kami harap kamu mendapatkan manfaat nya.",
      status: "0",
    },
    {
      icon: "/images/icon/rating.svg",
      title: "Review",
      description:
        "Beri kami Penilaian dan Feedback agar kami dapat meningkatkan Layanan kami.",
      status: "0",
    },
  ];
  const router = useRouter();
  const { id } = router.query;

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
            { name: "Muhammad Ardhiansyah" },
            { Tanggal_Appointment: "12 Juni 2022" },
            { Jam_Appointment: "14 : 00 WIB" },
            { Tipe_Appointment: "Tele Fisio" },
            { Nama_Fisio: "Rifa Rahmalia. S. Kes" },
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
