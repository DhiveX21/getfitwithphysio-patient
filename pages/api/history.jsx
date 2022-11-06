// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function all_history(req, res) {
  res.status(200).json([
    {
      physio: "Rifa Rahmalia. Amd. Ft",
      date: "12 Juni 2022",
      hour: "15:22 WIB",
      health_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      sugestion:
        "Perbanyak konsumsi makan dan minuman yang banyak mengandung Kalsium. serta perbanyak istirahat dan Olahraga secara rutin.",
      status: "finished",
      physio_pic: "/images/physio1.png",
    },
    {
      physio: "Rifa Rahmalia. Amd. Ft",
      date: "12 Juni 2022",
      hour: "15:22 WIB",
      health_complaint:
        "Saya mengalami Neckpain yang cukup mengganggu, terutama pada saat malam hari.",
      sugestion:
        "Perbanyak konsumsi makan dan minuman yang banyak mengandung Kalsium. serta perbanyak istirahat dan Olahraga secara rutin.",
      status: "finished",
      physio_pic: "/images/physio1.png",
    },
  ]);
}
