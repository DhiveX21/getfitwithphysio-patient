import React from "react";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Link from "next/link";
import { Button } from "../../../components/Button";
import {
  exerciseGetAllVideoCategory,
  exerciseGetAllVideoByFilter,
} from "../../../endpoint/Exercise";
import { useEffect } from "react";
import { useState } from "react";
import { getYoutubeId } from "../../../helpers/common";

export async function getServerSideProps() {
  const videoCategory = await exerciseGetAllVideoCategory()
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return { props: { videoCategory: videoCategory } };
}

export default function Video({ videoCategory }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [videoList, setVideoList] = useState();

  useEffect(() => {
    exerciseGetAllVideoByFilter(activeCategory)
      .then((response) => {
        setVideoList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeCategory]);

  return (
    <Layout>
      <div className="video">
        <div className="video__wrapper flex flex-col p-[20px]">
          <MenuTitle
            text="Video"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="video__breadcrumb p-[10px]">
            <Breadcrumbs />
          </div>
          <div className="video__category">
            <div className="video__category__wrapper">
              <div className="video__category__list flex items-center h-full gap-[7px] overflow-x-scroll py-[10px]">
                <div className="video__category__list__item h-full">
                  <Button
                    classNameInject={`${
                      activeCategory === null
                        ? " bg-get_blue text-white text-sm h-full rounded-md whitespace-nowrap"
                        : " bg-white text-get_blue text-sm hover:bg-get_blue hover:text-white duration-300 h-full whitespace-nowrap"
                    } border-2 border-get_blue border-opacity-40 rounded-md  px-[10px] py-[5px]`}
                    text="Semua"
                    click={() => setActiveCategory(null)}
                  />
                </div>
                {videoCategory.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="video__category__list__item h-full"
                    >
                      <Button
                        classNameInject={`${
                          activeCategory === item.id
                            ? " bg-get_blue text-white text-sm h-full rounded-md whitespace-nowrap"
                            : " bg-white text-get_blue text-sm hover:bg-get_blue hover:text-white duration-300 h-full whitespace-nowrap"
                        } border-2 border-get_blue border-opacity-40  rounded-md px-[10px] py-[5px]`}
                        text={item.title}
                        click={() => setActiveCategory(item.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="video__list flex flex-col gap-[10px] mb-[20px]">
            <div className="video__list__wrapper flex flex-wrap gap-[10px] py-[10px] pr-[10px]">
              {videoList && videoList.length > 0 ? (
                videoList.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="video__list__item hover:cursor-pointer animation-popup bg-slate-100 hover:bg-slate-200 duration-300 w-full max-h-[100px]  p-[5px] rounded-xl"
                    >
                      <Link href={`/exercise/video/${item.id}`}>
                        <div className="video__list__item__thumbnail flex h-full">
                          <picture className="w-[40%]">
                            <img
                              className=" rounded-xl h-full"
                              src={`https://img.youtube.com/vi/${getYoutubeId(
                                item.video_url
                              )}/maxresdefault.jpg`}
                              alt="video list"
                            />
                          </picture>
                          <div className="flex flex-col justify-center p-[10px] w-[60%]">
                            <div className="video__list__item__title py-[5px] text-get_blue  text-base font-bold ">
                              <h3>{item.title}</h3>
                            </div>
                            <div className="video__list__item__description text-get_desc  text-xs ">
                              <p className="line-clamp-3">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="flex text-center w-full justify-center flex-col items-center">
                  <picture className="w-1/6 opacity-50">
                    <img
                      src="/images/icon/online-lesson.png"
                      alt="not found video"
                    />
                  </picture>
                  <h3 className="text-xl text-get_light_desc">
                    {" "}
                    Video Tidak Tersedia
                  </h3>
                </div>
              )}
            </div>
          </div>
          <hr className="solid py-[10px]"></hr>
        </div>
      </div>
    </Layout>
  );
}
