import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import Carousel from "../../components/carousel";
import { CardFullImage } from "../../components/Card";
import { Button } from "../../components/Button";
import { productGetAll } from "../../endpoint/Product";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { formatCurrency } from "../../helpers/common";

export async function getServerSideProps() {
  const productData = await productGetAll()
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return {
    props: { productData },
  };
}

export default function Product({ productData }) {
  const router = useRouter();
  return (
    <Layout>
      <div className="product">
        <div className="product__wrapper flex flex-col px-[20px] mb-[20px]">
          <MenuTitle
            text="Rekam Medis"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="product__breadcrumb p-[10px]">
            <Breadcrumbs />
          </div>
          <div className="product__list flex flex-col gap-[10px] mb-[20px]">
            <div className="product__carousel w-full">
              <div className="product__carousel__wrapper w-full rounded-md ">
                <Carousel
                  slidesPerView={1.2}
                  spaceBetween={10}
                  navigation={false}
                >
                  {productData?.length > 0
                    ? productData.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="product__list__item shadow-lg p-[20px] my-[10px] rounded-[10px]"
                          >
                            <div className="product__list__item__wrapper">
                              <div className="product__list__item__thumbnail">
                                <CardFullImage
                                  textStyle={{ marginLeft: "150px" }}
                                  title={item.name}
                                  description={item.code}
                                ></CardFullImage>
                              </div>
                              <div className="product__list__item__facility w-full py-[10px]">
                                <div className="product__list__item__facility__title text-get_pink text-sm  py-[10px]">
                                  <h3>Fasilitas</h3>
                                </div>
                                <div className="product__list__item__facility__list flex gap-x-[10px] gap-y-[10px] flex-wrap">
                                  {item.sub_products ? (
                                    item.sub_products?.map((subProductItem) => {
                                      return (
                                        <div
                                          key={subProductItem.id}
                                          className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]"
                                        >
                                          <p className=" text-sm text-get_text">
                                            {subProductItem.name}
                                          </p>
                                          <p className="bg-primary px-[10px] py-[3px]  text-sm rounded-md text-white">
                                            {subProductItem.quota}
                                          </p>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <p className=" text-sm text-get_text">
                                      Kosong
                                    </p>
                                  )}
                                </div>
                              </div>
                              <hr className="solid"></hr>
                              <div className="product__list__item__desc w-full py-[10px]">
                                <div className="product__list__item__desc__title text-get_pink text-sm ">
                                  <h3>Deskripsi</h3>
                                </div>
                                <div className="product__list__item__desc__text text-sm  font-light">
                                  <p>{item.description}</p>
                                </div>
                              </div>
                              <hr className="solid"></hr>
                              <div className="product__list__item__price w-full py-[10px]">
                                <div className="product__list__item__price text-get_text text-sm ">
                                  <p className="flex gap-[5px]">
                                    {/* Harga : <strike>Rp. {item.amount}</strike>{" "}
                                     */}
                                    Harga
                                    <img
                                      src="/images/icon/triple_arrow.svg"
                                      alt="arrow"
                                    />
                                    <span className="text-get_pink">
                                      {formatCurrency(item.cost_paid)}
                                    </span>
                                  </p>
                                </div>
                                <div className="product__list__item__duration text-get_text text-sm ">
                                  <p className="flex gap-[5px]">
                                    Hanya Sampai
                                    <span className="text-get_pink">
                                      Minggu Depan
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <hr className="solid"></hr>
                              <div className="product__list__button text-center p-[10px]">
                                <Button
                                  type="button"
                                  click={() =>
                                    router.push(`/product/${item.id}`)
                                  }
                                  text="Beli Sekarang"
                                  classNameInject="px-[10px] py-[5px] text-white text-sm bg-primary rounded-[10px] w-[200px]"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </Carousel>
              </div>
            </div>
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
