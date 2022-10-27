import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../../components/Card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { appointmentGetAllByUserId } from "../../endpoint/Appointment";
import { formatDateRawToYMD } from "../../helpers/common";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res }) => {
//       const dispatch = store.dispatch;
//       console.log(store.getState(), "hahahahhaha");
//       console.log(dispatch, "awkdoawkdoaw");
//       // dispatch(setControlLoading(true));
//       // await dispatch(setControlLoading(true));

//       return { props: { test: "awdawd" } };
//     }
// );

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const appointmentData = await appointmentGetAllByUserId(
    session.credentials.user_id
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
  const credentials = useSelector((state) => state.logedInData.user);
  console.log(credentials);

  // useEffect(() => {
  //   if (credentials.user_id) {
  //     appointmentGetAllByUserId(credentials.user_id)
  //       .then((response) => {
  //         setAppointmentData(response.data.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         alert("Kamu belum membuat appointment apapun.");
  //       });
  //   }
  // }, [credentials]);
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px] ">
        <MenuTitle text="List Appointment"></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
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
                />
              </div>
            );
          })
        ) : (
          <div className="flex text-center w-full justify-center flex-col items-center">
            <picture className="w-1/6 opacity-50">
              <img src="/images/icon/empty.png" alt="not found video" />
            </picture>
            <h3 className="text-[34px] text-slate-400">
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
