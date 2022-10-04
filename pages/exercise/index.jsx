import React from "react";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import Link from "next/link";
import { HoverableCard } from "../../components/Card";

export default function Exercise() {
  return (
    <Layout>
      <div className="exercise">
        <div className="exercise__wrapper flex flex-col p-[20px]">
          <MenuTitle
            text="Exercise"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="exercise__breadcrumb p-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
          <div className="exercise__list flex flex-col gap-[10px] mb-[20px]">
            <div className="exercise__list__item rounded-xl">
              <Link href="/exercise/video">
                <div className="hover:cursor-pointer">
                  <HoverableCard
                    image="/images/article3.png"
                    title="Video"
                    description="Pelatihan dengan bentuk Video"
                  ></HoverableCard>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
