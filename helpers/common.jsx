const timeStamp = () => Math.floor(new Date().getTime() / 1000);
import Link from "next/link";

export function calcAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getProgressTelePhysio(status, linkMeeting, appointmentType) {
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
  if (status === "finding") {
    progressSimulation[0].status = "2";
    progressSimulation[1].status = "1";
    progressSimulation[2].status = "0";
    progressSimulation[3].status = "0";
    progressSimulation[4].status = "0";
    progressSimulation[5].status = "0";
  } else if (status === "book") {
    progressSimulation[0].status = "2";
    progressSimulation[1].status = "2";
    progressSimulation[2].status = "1";
    progressSimulation[3].status = "0";
    progressSimulation[4].status = "0";
    progressSimulation[5].status = "0";
  } else if (status === "treatment") {
    progressSimulation[0].status = "2";
    progressSimulation[1].status = "2";
    progressSimulation[2].status = "2";
    progressSimulation[3].status = "1";
    progressSimulation[4].status = "0";
    progressSimulation[5].status = "0";
    if (
      linkMeeting &&
      status === "treatment" &&
      appointmentType === "tele_physio"
    ) {
      progressSimulation[3].action = (
        <div className="bg-white p-[10px] rounded-lg text-center text-sm  text-get_desc">
          <p>Room Treatment Telah Tersedia Silahkan Masuk...</p>
          <a
            href={`${linkMeeting}`}
            type="button"
            target="_blank"
            className="bg-primary px-[20px] py-[8px] rounded-lg text-white"
          >
            Masuk
          </a>
        </div>
      );
    }
  } else if (status === "complete") {
    progressSimulation[0].status = "2";
    progressSimulation[1].status = "2";
    progressSimulation[2].status = "2";
    progressSimulation[3].status = "2";
    progressSimulation[4].status = "2";
    progressSimulation[5].status = "2";
  }

  return progressSimulation;
}

export function formatDateRawToYMD(dateRaw) {
  return dateRaw.replace(/T/, " ").replace(/\..+/, "").replace("00:00:00", "");
}

export function getYoutubeId(url) {
  var video_id = url.split("v=")[1];
  if (video_id) {
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
  }
  return video_id;
}

export function formatCurrency(value) {
  let rupiah = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(value);
  return rupiah;
}
