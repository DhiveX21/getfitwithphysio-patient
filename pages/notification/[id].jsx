import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import axios from "axios";

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const medicalRecords = await axios
//     .get(
//       `http://localhost:3000/api/medical-record/getMedicalRecordById?id=${id}`
//     )
//     .then((response) => {
//       return response.data;
//     });
//   return {
//     props: { medicalRecords },
//   };
// }

export default function NotificationDetail(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="px-[20px] h-full flex flex-col gap-[10px] mb-[20px]">
        <div className="notification-detail__content">
          <div className="notification-detail__content__wrapper h-full p-[15px] bg-[#f3f3ff] shadow-xl rounded-xl">
            <p className="leading-[17px] text-[20px] text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              quis, modi minus quos, dolorum consequatur saepe, ipsam quaerat
              sit molestias veritatis blanditiis. Illo, ea tenetur eos ex
              dignissimos molestias aliquam. In fuga nihil placeat obcaecati
              amet, quo facilis porro provident maiores officia ea at molestias
              nobis vel numquam dicta id! Fuga id eaque similique totam ullam,
              eius aliquid voluptatum eveniet libero ut nam iusto. Saepe facilis
              sint inventore, quod nostrum pariatur doloribus ea sit dolorum
              quibusdam in repudiandae magnam cupiditate architecto ratione.
              Velit nobis, commodi non harum nesciunt ducimus. Qui nam ab
              repudiandae vero debitis, beatae molestias maiores neque deleniti!
            </p>
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
