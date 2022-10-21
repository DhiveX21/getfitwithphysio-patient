import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
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

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="product-detail px-[20px] h-full flex flex-col gap-[10px] mb-[20px]">
        <div className="product-detail__wrapper mb-[40px]">
          <MenuTitle
            text="Rincian Pembelian"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="product-detail__title flex justify-center mt-[30px]">
            <h2 className="text-[22px] leading-[22px] font-extrabold text-danger">
              Rincian Pembelian
            </h2>
          </div>
          <div className="product-detail__segment mb-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-[22px] leading-[22px] text-gray-600 mt-[1%]">
                Nama Produk
              </h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <p className="text-[18px] leading-[18px] text-gray-500 mt-[1%]">
                Paket GET Physio Promo Kemerdekaan Indonesia
              </p>
            </div>
          </div>
          <div className="product-detail__segment my-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-[22px] leading-[22px] text-gray-600 mt-[1%]">
                List Fasilitas
              </h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <p className="text-[18px] leading-[18px] text-gray-500 mt-[1%]">
                <ol type="1">
                  <li>TeleFisio 3X</li>
                  <li>HomeCare Fisio 4X</li>
                  <li>InClinic Fisio 3X</li>
                  <li>Training Tools 1X</li>
                </ol>
              </p>
            </div>
          </div>
          <div className="product-detail__segment my-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-[22px] leading-[22px] text-gray-600 mt-[1%]">
                Total Harga
              </h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <div className="product-detail__segment__price flex justify-between">
                <span className="text-[18px] leading-[18px] text-gray-500 mt-[1%] w-[65%]">
                  Paket GET Physio Promo Kemerdekaan Indonesia{" "}
                  <span className="text-primary">(Promo)</span>
                </span>
                <span className="text-[25px] leading-[22px] text-danger mt-[1%] animate-pulse">
                  Rp. 499.000
                </span>
              </div>
            </div>
          </div>
          <div className="product-detail__button flex justify-center">
            <Button
              text="Bayar Sekarang"
              classNameInject=" bg-primary text-white p-[5px] max-w-[140px] rounded-lg"
            />
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
