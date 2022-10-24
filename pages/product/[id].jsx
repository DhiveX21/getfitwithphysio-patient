import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { MenuTitle } from "../../components/Title";
import { productGetOne } from "../../endpoint/Product";
import { orderCreate } from "../../endpoint/Order";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
  const productDetailData = await productGetOne(query.id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    props: { productDetailData },
  };
}

export default function ProductDetail({ productDetailData }) {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.logedInData);

  function handleCheckout() {
    if (user.user_id) {
      const body = {
        user_id: user.user_id,
        product_id: +id,
        amount: productDetailData.amount,
        price_paid: productDetailData.cost_paid,
        quota: 1,
      };
      orderCreate(body)
        .then((response) => {
          console.log(response);
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

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
                {productDetailData.name}
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
              <div className="text-[18px] leading-[18px] text-gray-500 mt-[1%]">
                <ol type="1" className="flex flex-col gap-[10px]">
                  {productDetailData.facilities.map((item) => {
                    return (
                      <li key={item.id} className="flex gap-[20px]">
                        {`${item.name} `}{" "}
                        <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                          {item.status}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>
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
                  {productDetailData.name}
                  <span className="text-primary">(Promo)</span>
                </span>
                <span className="text-[25px] leading-[22px] text-danger mt-[1%] animate-pulse">
                  Rp. {productDetailData.cost_paid}
                </span>
              </div>
            </div>
          </div>
          <div className="product-detail__button flex justify-center">
            <Button
              text="Bayar Sekarang"
              classNameInject=" bg-primary text-white p-[5px] max-w-[140px] rounded-lg"
              click={() => handleCheckout()}
            />
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
