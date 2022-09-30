// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function getAllMedicalRecords(req, res) {
  res.status(200).json([
    {
      _id: "1",
      physio_name: "Rifa Rahmalia. S. Kes",
      physio_photo: "/images/physio1.png",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "2",
      physio_name: "Faizah Abdullah, S.St.Ft., S.Ft., M.Biomed.",
      physio_photo: "/images/physio2.jpeg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "3",
      physio_name: "Rossa Nurhanifah. Amd. Ft",
      physio_photo: "/images/physio3.jpeg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
    {
      _id: "4",
      physio_name: "Amalia Syah V. Amd. Ft",
      physio_photo: "/images/physio4.jpg",
      medical_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rps: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpd: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      rpk: "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      appointment_date: "19 September 2022 15:22",
    },
  ]);
}
