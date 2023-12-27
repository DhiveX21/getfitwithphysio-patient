import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Button } from "../../components/Button";
import { MenuTitle } from "../../components/Title";
import { productGetOne } from "../../endpoint/Product";
import { orderCreate } from "../../endpoint/Order";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { SubmitButton } from "../../components/Button";
import PaymentMethodList from "../../components/PaymentMethodList";
import { paymentMethodGetAll } from "../../endpoint/Transaction";
import { useState } from "react";
import { formatCurrency } from "../../helpers/common";

export async function getServerSideProps({ query, req }) {
  const session = await getSession({ req });
  const productDetailData = await productGetOne(query.id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  const paymentMethodData = await paymentMethodGetAll()
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return {
    props: {
      credentials: session?.credentials,
      productDetailData,
      paymentMethodData,
    },
  };
}

export default function ProductDetail({
  credentials,
  productDetailData,
  paymentMethodData,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodData.bank_transfers[1].payment_type
  );

  function handleCheckout() {
    if (credentials?.user_id) {
      const body = {
        product_id: +id,
        user_id: credentials?.user_id,
        payment_type: selectedPaymentMethod,
      };
      dispatch(orderCreate(body))
        .then((response) => {
          alert("Order Berhasil");
          window.open(response.data.data.payment_url, "_blank", "noreferrer");
          setTimeout(() => {
            router.push("/order");
          }, 3000);
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
          <div className="product-detail__title flex justify-center my-[20px]">
            <h2 className="text-sm font-extrabold text-get_pink">
              Rincian Pembelian
            </h2>
          </div>
          <div className="product-detail__segment mb-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-sm  text-get_text">Nama Produk</h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <p className="text-sm  text-get_light_desc ">
                {productDetailData.name}
              </p>
            </div>
          </div>
          <div className="product-detail__segment my-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-sm  text-get_text">List Fasilitas</h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <div className="text-sm  text-get_light_desc ">
                <ol type="1" className="flex flex-col gap-[10px]">
                  {productDetailData.facilities.map((item) => {
                    return (
                      <li key={item.id} className="flex gap-[20px]">
                        {`${item.name} `}{" "}
                        <p className="bg-primary px-[10px] py-[3px]  text-sm rounded-md text-white">
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
              <h2 className="text-sm  text-get_text">Total Harga</h2>
            </div>
            <div className="product-detail__segment__desc my-[20px] px-[20px]">
              <div className="product-detail__segment__price flex justify-between">
                <span className="text-sm  text-get_light_desc  w-[65%]">
                  {productDetailData.name}
                  <span className="text-get_blue"> (Promo)</span>
                </span>
                <span className="text-sm  text-get_pink  animate-pulse">
                  {formatCurrency(productDetailData.cost_paid)}
                </span>
              </div>
            </div>
          </div>

          <div className="product-detail__segment my-[20px]">
            <div className="product-detail__segment__title flex bg-slate-200 py-[5px] px-[10px] rounded-lg">
              <h2 className="text-sm  text-get_text">Pilih Pembayaran</h2>
            </div>

            <div className="product-detail__segment__payment-method my-[20px] px-[10px]">
              <PaymentMethodList
                paymentMethodData={paymentMethodData}
                valueStorageSetState={(e) => setSelectedPaymentMethod(e)}
              />
            </div>
          </div>

          <div className="product-detail__button flex justify-center z-0">
            <SubmitButton
              text="Bayar Sekarang"
              click={() => handleCheckout()}
              classNameInject=" bg-primary text-white text-sm shadow-md p-[5px] rounded-lg "
            />
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
