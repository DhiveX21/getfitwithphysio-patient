// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function login(req, res) {
  res.status(200).json({
    phoneNumber: "0895619258715",
    isVerified: true,
    isSuspend: false,
    role: "patient",
  });
}
