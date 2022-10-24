import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../../components/Card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { appointmentGetAllByUserId } from "../../endpoint/Appointment";
import { formatDateRawToYMD } from "../../helpers/common";
import { useSelector } from "react-redux";

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

export default function Appointment(test) {
  console.log(test);
  const [appointmentData, setAppointmentData] = useState();

  const router = useRouter();
  const credentials = useSelector((state) => state.logedInData.user);
  console.log(credentials);

  useEffect(() => {
    if (credentials.user_id) {
      appointmentGetAllByUserId(credentials.user_id)
        .then((response) => {
          setAppointmentData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Kamu belum membuat appointment apapun.");
        });
    }
  }, [credentials]);
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
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
        {appointmentData
          ? appointmentData.map((item) => {
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
          : ""}
      </div>
    </Layout>
  );
}
