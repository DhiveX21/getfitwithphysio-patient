// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function createAppointment(req, res) {
  res.status(200).json({
    id_appointment: "123",
    status: "create Appointment Success",
  });
}
