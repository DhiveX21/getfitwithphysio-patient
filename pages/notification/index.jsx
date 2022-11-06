import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { CardWithThumbnail } from "../../components/Card";
import { getSession } from "next-auth/react";
import { notificationGetAllByUserId } from "../../endpoint/Notification";
import { useDispatch } from "react-redux";
import { setControlNotification } from "../../store/actions/controlActions";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const body = {
    and_broadcast: true,
    order_by: {
      key: "id",
      value: "desc",
    },
  };

  const notificationData = await notificationGetAllByUserId(
    session.credentials.user_id
      ? session.credentials.user_id
      : session.credentials.id,
    body
  )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return [];
    });

  return {
    props: { credentials: session.credentials, notificationData },
  };
}

export default function Notification({ credentials, notificationData }) {
  const dispatch = useDispatch();
  return (
    <Layout>
      <div className="notification">
        <div className="notification__wrapper flex flex-col px-[20px] mb-[20px]">
          <div className="notification__list flex flex-col gap-[10px] mb-[20px]">
            <div className="notification__list__item rounded-xl flex flex-col gap-[10px]">
              {notificationData.map((item) => {
                return (
                  // <Link href={`/notification/${item.id}`}>
                  <div
                    onClick={() =>
                      dispatch(
                        setControlNotification(
                          true,
                          item.title,
                          item.description,
                          credentials.user_id,
                          item.id
                        )
                      )
                    }
                    key={item.id}
                    className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                  >
                    <CardWithThumbnail
                      title={item.title}
                      description={item.description}
                      note={item.created_at}
                      image={
                        item.is_read
                          ? "/images/icon/mail_open.png"
                          : "/images/icon/mail.png"
                      }
                      imageStyle="p-[10px] sm:p-[15px]"
                      cardStyle={item.is_read ? "opacity-30 " : "opacity-100"}
                    />
                  </div>
                  // </Link>
                );
              })}
            </div>
          </div>
          <hr className="solid" />
        </div>
      </div>
    </Layout>
  );
}
