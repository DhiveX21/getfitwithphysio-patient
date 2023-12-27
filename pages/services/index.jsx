import React from "react";
import { CardWithThumbnail2 } from "../../components/Card";
import Layout from "../../components/Layout";
import { MenuTitle, SectionTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { patientQuotaGetAllProduct } from "../../endpoint/User";
import { getSession } from "next-auth/react";
import * as staticContent from "../../staticContent/consts.json";
import { FacilityListWithQuota } from "../../components/FacilityLists";
import { ButtonWithIcon } from "../../components/Button";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const userQuotaData = await patientQuotaGetAllProduct(
    session?.credentials.user_id
  )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return [];
    });

  return {
    props: { userQuotaData },
  };
};

export default function services({ userQuotaData }) {
  return (
    <>
      <Layout>
        <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
          <MenuTitle text="Pilih Layanan"></MenuTitle>
          <div className="px-[10px]">
            <Breadcrumbs />
          </div>

          <div
            className="mb-[10px]"
            style={{ width: "calc(100% + 40px)", marginLeft: "-20px" }}
          >
            <SectionTitle text="Total Quota"></SectionTitle>
          </div>

          <div className="dashboard__facility-list ">
            <FacilityListWithQuota data={userQuotaData} />
          </div>

          <div className=" flex justify-center w-full">
            <div className=" w-[200px]">
              <ButtonWithIcon
                text="Topup Fasilitas?"
                classNameInject="  bg-white text-get_blue shadow-md text-sm border-2 border-get_blue"
                icon="/images/icon/checkout.png"
              />
            </div>
          </div>

          <div
            className="mb-[10px]"
            style={{ width: "calc(100% + 40px)", marginLeft: "-20px" }}
          >
            <SectionTitle text="Fasilitas Tersedia"></SectionTitle>
          </div>

          {userQuotaData.map((item, index) =>
            item.quota > 0 ? (
              <Link
                key={index}
                href={`/services/${staticContent.services[index].url}`}
              >
                <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out">
                  <CardWithThumbnail2
                    image={staticContent.services[index].image}
                    title={item.name}
                    note="Baru"
                    description={item.description}
                    titleStyle="text-base font-bold text-get_blue"
                    descStyle="text-xs font-medium text-get_desc"
                    badgeStyle="text-white text-sm bg-get_pink"
                  ></CardWithThumbnail2>
                </div>
              </Link>
            ) : (
              <div
                key={index}
                className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out grayscale"
              >
                <CardWithThumbnail2
                  image={staticContent.services[index].image}
                  title={item.name}
                  note="Baru"
                  description={item.description}
                  titleStyle="text-base font-bold text-get_blue"
                  descStyle="text-xs font-medium text-get_desc"
                  badgeStyle="text-white text-sm bg-get_pink"
                ></CardWithThumbnail2>
              </div>
            )
          )}

          {/* <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out grayscale">
            <CardWithThumbnail2
              cardStyle="opacity-50"
              image="/images/article2.png"
              title="Clinic Treatment"
              note="Baru"
              description="Treatment Fisioterapi inClinic, nikmati treatment dengan manfaat maksimal dengan datang ke klinik."
              titleStyle="text-base font-bold text-get_blue"
              descStyle="text-xs font-medium text-get_desc"
              badgeStyle="text-white text-sm bg-get_pink"
            ></CardWithThumbnail2>
          </div>
          <div className="cursor-pointer hover:scale-[1.05] duration-500 ease-in-out grayscale">
            <CardWithThumbnail2
              cardStyle="opacity-50 "
              image="/images/article1.png"
              title="Home Care"
              note="Baru"
              description="Treatment Fisioterapi di rumah, cukup rebahan kamu dapat memanggil Fisio ke rumah mu."
              titleStyle="text-base font-bold text-get_blue"
              descStyle="text-xs font-medium text-get_desc"
              badgeStyle="text-white text-sm bg-get_pink"
            ></CardWithThumbnail2>
          </div> */}
        </div>
      </Layout>
    </>
  );
}
