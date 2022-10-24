import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import Carousel from "../../components/carousel";
import { CardFullImage } from "../../components/Card";
import { Button } from "../../components/Button";
import { productGetAll } from "../../endpoint/Product";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
          <div className="product__list flex flex-col gap-[10px] mb-[20px]">
            <div className="product__carousel w-full">
              <div className="product__carousel__wrapper w-full rounded-md ">
                <Carousel
                  slidesPerView={1.1}
                  spaceBetween={10}
                  navigation={false}
                >
                  {productData.map((item) => {
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
                            <div className="product__list__item__facility__title text-danger text-[16px] leading-[20px] py-[10px]">
                              <h3>Fasilitas</h3>
                            </div>
                            <div className="product__list__item__facility__list flex gap-x-[10px] gap-y-[10px] flex-wrap">
                              {item.facilities.map((facilitiesItem) => {
                                return (
                                  <div
                                    key={facilitiesItem.id}
                                    className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]"
                                  >
                                    <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                      {facilitiesItem.name}
                                    </p>
                                    <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                      {facilitiesItem.status}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <hr className="solid"></hr>
                          <div className="product__list__item__desc w-full py-[10px]">
                            <div className="product__list__item__desc__title text-danger text-[16px] leading-[20px]">
                              <h3>Deskripsi</h3>
                            </div>
                            <div className="product__list__item__desc__text text-[16px] leading-[16px] font-light">
                              <p>{item.description}</p>
                            </div>
                          </div>
                          <hr className="solid"></hr>
                          <div className="product__list__item__price w-full py-[10px]">
                            <div className="product__list__item__price text-[#5E5E5E] text-[16px] leading-[20px]">
                              <p className="flex gap-[5px]">
                                Harga : <strike>Rp. {item.amount}</strike>{" "}
                                <img
                                  src="/images/icon/triple_arrow.svg"
                                  alt="arrow"
                                />
                                <span className="text-danger">
                                  Rp. {item.cost_paid}
                                </span>
                              </p>
                            </div>
                            <div className="product__list__item__duration text-[#5E5E5E] text-[16px] leading-[20px]">
                              <p className="flex gap-[5px]">
                                Hanya Sampai
                                <span className="text-danger">
                                  Minggu Depan
                                </span>
                              </p>
                            </div>
                          </div>
                          <hr className="solid"></hr>
                          <div className="product__list__button text-center p-[10px]">
                            <Button
                              type="button"
                              click={() => router.push(`/product/${item.id}`)}
                              text="Beli Sekarang"
                              classNameInject="px-[10px] py-[5px] text-[#fff] text-[20px] bg-primary rounded-[10px] w-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
