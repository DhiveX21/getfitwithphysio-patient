import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import Carousel from "../../components/carousel";
import { CardFullImage } from "../../components/Card";
import { Button } from "../../components/Button";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Product(props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="product">
        <div className="product__wrapper flex flex-col p-[20px]">
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
                <Carousel slidesPerView={1.1} spaceBetween={10}>
                  {[
                    <div className="product__list__item shadow-lg p-[20px] my-[10px] rounded-[10px]">
                      <div className="product__list__item__wrapper">
                        <div className="product__list__item__thumbnail">
                          <CardFullImage
                            textStyle={{ marginLeft: "180px" }}
                            title="Konsultasi Fisioterapi secara Online"
                            description="Efektif, On Point, dan Edukatif"
                          ></CardFullImage>
                        </div>
                        <div className="product__list__item__facility w-full py-[10px]">
                          <div className="product__list__item__facility__title text-danger text-[16px] leading-[20px] py-[10px]">
                            <h3>Fasilitas</h3>
                          </div>
                          <div className="product__list__item__facility__list flex gap-x-[20px] gap-y-[10px] flex-wrap">
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                HomeCare
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                TeleFisio
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                Webinar
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                In Clinic
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                Training Tools
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__item__desc w-full py-[10px]">
                          <div className="product__list__item__desc__title text-danger text-[16px] leading-[20px]">
                            <h3>Deskripsi</h3>
                          </div>
                          <div className="product__list__item__desc__text text-[16px] leading-[16px] font-light">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nesciunt nam consequuntur, ab excepturi
                              officiis architecto nobis mollitia debitis
                              repellendus tempore laborum eum consectetur.
                              Exercitationem eum porro perferendis doloribus a.
                              Blanditiis!
                            </p>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__item__price w-full py-[10px]">
                          <div className="product__list__item__price text-[#5E5E5E] text-[16px] leading-[20px]">
                            <p className="flex gap-[5px]">
                              Harga : <strike>Rp. 1.499.000</strike>{" "}
                              <img
                                src="/images/icon/triple_arrow.svg"
                                alt="arrow"
                              />
                              <span className="text-danger">Rp. 988.000</span>
                            </p>
                          </div>
                          <div className="product__list__item__duration text-[#5E5E5E] text-[16px] leading-[20px]">
                            <p className="flex gap-[5px]">
                              Hanya Sampai
                              <span className="text-danger">
                                12 September 2022 12:00 WIB
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__button text-center p-[10px]">
                          <Button
                            type="button"
                            click={console.log("terbeli")}
                            text="Beli Sekarang"
                            classNameInject="px-[10px] py-[5px] text-[#fff] text-[20px] bg-primary rounded-[10px] w-[200px]"
                          />
                        </div>
                      </div>
                    </div>,
                    <div className="product__list__item shadow-lg p-[20px] my-[10px] rounded-[10px]">
                      <div className="product__list__item__wrapper">
                        <div className="product__list__item__thumbnail">
                          <CardFullImage
                            textStyle={{ marginLeft: "180px" }}
                            title="Konsultasi Fisioterapi secara Online"
                            description="Efektif, On Point, dan Edukatif"
                          ></CardFullImage>
                        </div>
                        <div className="product__list__item__facility w-full py-[10px]">
                          <div className="product__list__item__facility__title text-danger text-[16px] leading-[20px] py-[10px]">
                            <h3>Fasilitas</h3>
                          </div>
                          <div className="product__list__item__facility__list flex gap-x-[20px] gap-y-[10px] flex-wrap">
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                HomeCare
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                TeleFisio
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                Webinar
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                In Clinic
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                            <div className="product__list__item__facility__list__item flex items-center justify-center gap-[3px]">
                              <p className="leading-[16px] text-[20px] text-[#5E5E5E]">
                                Training Tools
                              </p>
                              <p className="bg-primary px-[10px] py-[3px] leading-[16px] text-[20px] rounded-md text-[white]">
                                1x
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__item__desc w-full py-[10px]">
                          <div className="product__list__item__desc__title text-danger text-[16px] leading-[20px]">
                            <h3>Deskripsi</h3>
                          </div>
                          <div className="product__list__item__desc__text text-[16px] leading-[16px] font-light">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nesciunt nam consequuntur, ab excepturi
                              officiis architecto nobis mollitia debitis
                              repellendus tempore laborum eum consectetur.
                              Exercitationem eum porro perferendis doloribus a.
                              Blanditiis!
                            </p>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__item__price w-full py-[10px]">
                          <div className="product__list__item__price text-[#5E5E5E] text-[16px] leading-[20px]">
                            <p className="flex gap-[5px]">
                              Harga : <strike>Rp. 1.499.000</strike>{" "}
                              <img
                                src="/images/icon/triple_arrow.svg"
                                alt="arrow"
                              />
                              <span className="text-danger">Rp. 988.000</span>
                            </p>
                          </div>
                          <div className="product__list__item__duration text-[#5E5E5E] text-[16px] leading-[20px]">
                            <p className="flex gap-[5px]">
                              Hanya Sampai
                              <span className="text-danger">
                                12 September 2022 12:00 WIB
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr className="solid"></hr>
                        <div className="product__list__button text-center p-[10px]">
                          <Button
                            type="button"
                            click={console.log("terbeli")}
                            text="Beli Sekarang"
                            classNameInject="px-[10px] py-[5px] text-[#fff] text-[20px] bg-primary rounded-[10px] w-[200px]"
                          />
                        </div>
                      </div>
                    </div>,
                  ]}
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
