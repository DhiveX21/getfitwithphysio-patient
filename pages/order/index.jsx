import React from "react";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { CardWithThumbnail } from "../../components/Card";
import { getSession } from "next-auth/react";
import { notificationGetAllByUserId } from "../../endpoint/Notification";
import { useDispatch } from "react-redux";
import { setControlNotification } from "../../store/actions/controlActions";
import { orderGetAllByUserId } from "../../endpoint/Order";
import { useRouter } from "next/router";
import { formatCurrency } from "../../helpers/common";
import { Button } from "../../components/Button";
import { NotFound } from "../../components/Notfound";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const body = {
    and_broadcast: true,
    order_by: {
      key: "id",
      value: "desc",
    },
  };

  const orderData = await orderGetAllByUserId(session?.credentials.user_id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return {
    props: { credentials: session?.credentials, orderData },
  };
}

export default function Order({ credentials, orderData }) {
  console.log(orderData);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Layout>
      <div className="order">
        <div className="order__wrapper flex flex-col justify-center px-[20px] mb-[20px]">
          <MenuTitle
            text="Order"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="order__breadcrumb p-[10px]">
            <Breadcrumbs />
          </div>
          <div className="order__list flex flex-col gap-[20px] mb-[20px]">
            {orderData.length > 0 ? (
              orderData.map((item, index) => (
                <div
                  key={index}
                  // onClick={() => {
                  //   router.push(`/order/${item.id}`);
                  // }}
                  className=" duration-500 group"
                >
                  {/* <CardWithThumbnail
                  title={item.product.name}
                  description={formatCurrency(item.amount)}
                  note={item.created_at}
                  image="/images/icon/user.png"
                /> */}
                  <div className="order__list__card ">
                    <div className="order__list__card__wrapper flex flex-col gap-[10px] border-l-4 border-danger p-[20px] shadow-md rounded-md">
                      <div className="order__list__card__title text-2xl leading-[16px] flex items-center justify-between">
                        <h3>{item.product.name}</h3>
                        {item.status === "unpaid" ? (
                          <Button
                            classNameInject=" bg-primary hover:bg-blue-600 text-white w-1/4 px-[10px] py-[5px] rounded font-thin text-[18px]"
                            text="Bayar"
                            click={() => router.push(`${item.payment_url}`)}
                          />
                        ) : null}
                      </div>
                      <div className="order__list__card__price text-lg leading-[12px]">
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                      <div
                        className={`order__list__card__status text-xl font-bold leading-[12px]  ${
                          item.status === "unpaid"
                            ? "text-red-600"
                            : "text-green-500"
                        }`}
                      >
                        <span>{item.status.toUpperCase()}</span>
                      </div>
                      <div className="order__list__card__content">
                        <div className="order__list__card__content__wrapper overflow-y-scroll h-0 group-hover:h-[200px] duration-500 ">
                          <div className="order__list__card__content__title text-xl">
                            <span>Deskripsi</span>
                          </div>
                          <div className="order__list__card__content__item p-[20px]">
                            <table className="w-full">
                              <tbody className="text-slate-600 font-thin text-xl leading-[22px] flex flex-col gap-[20px]">
                                <tr className=" w-full">
                                  <td>
                                    <ul
                                      className="pl-[25px]"
                                      style={{ listStyleType: "circle" }}
                                    >
                                      <li>
                                        Harga{" "}
                                        {formatCurrency(item.product.amount)}
                                      </li>
                                      <li>
                                        Discount {item.product.discount * 100}%
                                      </li>
                                      <li>{item.product.description}</li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Fasilitas Produk</td>
                                  <td>:</td>
                                  <td>
                                    <ul
                                      className="pl-[25px]"
                                      style={{ listStyleType: "number" }}
                                    >
                                      {item.product?.sub_products ? (
                                        item.product?.sub_products?.map(
                                          (subProduct, index) => (
                                            <li key={index}>
                                              {subProduct.name}{" "}
                                              <span className="font-bold">
                                                ({subProduct.quota}x)
                                              </span>
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <span className="font-bold text-slate-500">
                                          (Tidak ada Fasilitas)
                                        </span>
                                      )}
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NotFound
                title="Kamu belum membuat Order apapun."
                description="Silahkan Klik menu Product di bagian menu untuk membuat Order"
              />
            )}
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
