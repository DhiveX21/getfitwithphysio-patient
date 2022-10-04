import React from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import Link from "next/link";
import { HoverableCard } from "../../../components/Card";

export default function Video() {
  return (
    <Layout>
      <div className="video">
        <div className="video__wrapper flex flex-col p-[20px]">
          <MenuTitle
            text="Video"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="video__breadcrumb p-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
          <div className="video__list flex flex-col gap-[10px] mb-[20px]">
            <div className="video__list__wrapper flex flex-wrap gap-[10px]">
              <div className="video__list__item hover:cursor-pointer w-[calc(50%-5px)]  p-[5px] rounded-xl">
                <Link href="/exercise/video/123">
                  <div className="video__list__item__thumbnail">
                    <picture>
                      <img
                        className=" rounded-xl overflow-hidden"
                        src="/images/servicelist_1.png"
                        alt="video list"
                      />
                    </picture>
                    <div className="video__list__item__title py-[5px] text-primary text-center text-[24px] leading-[24px]">
                      <h3>Video1</h3>
                    </div>
                    <div className="video__list__item__description text-[#5d5d5d] text-center text-[16px] leading-[12px]">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Deserunt, eveniet.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="video__list__item hover:cursor-pointer w-[calc(50%-5px)]  p-[5px] rounded-xl">
                <Link href="/exercise/video/123">
                  <div className="video__list__item__thumbnail">
                    <picture>
                      <img
                        className=" rounded-xl overflow-hidden"
                        src="/images/article3.png"
                        alt="video list"
                      />
                    </picture>
                    <div className="video__list__item__title py-[5px] text-primary text-center text-[24px] leading-[24px]">
                      <h3>Video1</h3>
                    </div>
                    <div className="video__list__item__description text-[#5d5d5d] text-center text-[16px] leading-[12px]">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Deserunt, eveniet.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="video__list__item hover:cursor-pointer w-[calc(50%-5px)]  p-[5px] rounded-xl">
                <Link href="/exercise/video/123">
                  <div className="video__list__item__thumbnail">
                    <picture>
                      <img
                        className=" rounded-xl overflow-hidden"
                        src="/images/article2.png"
                        alt="video list"
                      />
                    </picture>
                    <div className="video__list__item__title py-[5px] text-primary text-center text-[24px] leading-[24px]">
                      <h3>Video1</h3>
                    </div>
                    <div className="video__list__item__description text-[#5d5d5d] text-center text-[16px] leading-[12px]">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Deserunt, eveniet.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="video__list__item hover:cursor-pointer w-[calc(50%-5px)]  p-[5px] rounded-xl">
                <Link href="/exercise/video/123">
                  <div className="video__list__item__thumbnail">
                    <picture>
                      <img
                        className=" rounded-xl overflow-hidden"
                        src="/images/article1.png"
                        alt="video list"
                      />
                    </picture>
                    <div className="video__list__item__title py-[5px] text-primary text-center text-[24px] leading-[24px]">
                      <h3>Video1</h3>
                    </div>
                    <div className="video__list__item__description text-[#5d5d5d] text-center text-[16px] leading-[12px]">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Deserunt, eveniet.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <hr className="solid py-[10px]"></hr>
        </div>
      </div>
    </Layout>
  );
}
