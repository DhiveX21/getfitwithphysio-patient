import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CardWithThumbnail } from "../../components/Card";
import { useRouter } from "next/router";
import { appointmentGetAllByUserId } from "../../endpoint/Appointment";
import { formatDateRawToYMD } from "../../helpers/common";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const appointmentData = await appointmentGetAllByUserId(
    session?.credentials.user_id
  )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return [];
    });

  return {
    props: { appointmentData },
  };
}

export default function Appointment({ appointmentData }) {
  const router = useRouter();
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px] ">
        <MenuTitle text="List Appointment"></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs />
          </div>
        </div>
        {appointmentData ? (
          appointmentData.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => {
                  router.push(`/appointment/${item._id}`);
                }}
                className=" hover:scale-[1.05] duration-500 cursor-pointer"
              >
                <CardWithThumbnail
                  title={item.therapist_detail.name}
                  description={item.complaints}
                  note={`${formatDateRawToYMD(item.date_appointment)}  ${
                    item.time_appointment
                  }`}
                  image="/images/icon/user.png"
                  cardStyle=" bg-get_light_bg rounded-md"
                  titleStyle="text-get_blue text-base font-bold"
                  descStyle="text-get_text text-sm "
                  noteStyle="text-get_light_desc text-xs font-bold"
                />
              </div>
            );
          })
        ) : (
          <div className="flex text-center w-full justify-center flex-col items-center">
            <picture className="w-1/6 opacity-50">
              <z src="/images/icon/empty.png" alt="not found video" />
            </picture>
            <h3 className="text-xl text-get_light_desc">
              {" "}
              Belum Ada Appointment
            </h3>
          </div>
        )}
        <hr className="solid" />
      </div>
    </Layout>
  );
}
