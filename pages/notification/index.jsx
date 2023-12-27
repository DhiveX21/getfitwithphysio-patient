import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { CardWithThumbnail } from "../../components/Card";
import { getSession } from "next-auth/react";
import { notificationGetAllByUserId } from "../../endpoint/Notification";
import { useDispatch } from "react-redux";
import { setControlNotification } from "../../store/actions/controlActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const body = {
    limit: 5,
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
    props: { credentials: session?.credentials, notificationData },
  };
}

export default function Notification({ credentials, notificationData }) {
  const [data, setData] = useState(notificationData);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const reFetchData = async () => {
    const body = {
      limit: data.length + 5,
      and_broadcast: true,
      order_by: {
        key: "id",
        value: "desc",
      },
    };
    await notificationGetAllByUserId(
      credentials.user_id ? credentials.user_id : credentials.id,
      body
    )
      .then((response) => {
        setTimeout(() => {
          if (response.data.data.length === data.length) {
            setHasMore(false);
          }
          setData(response.data.data);
        }, 1000);
      })
      .catch((error) => {
        alert("Sepertinya terjadi kesalahan pada server.");
        router.push("/dashboard");
      });
  };

  return (
    <Layout>
      <div className="notification">
        <div className="notification__wrapper flex flex-col px-[20px] mb-[20px] ">
          <div className="notification__list flex flex-col gap-[10px] mb-[20px]">
            <div className="notification__list__item rounded-xl flex flex-col gap-[10px] ">
              <InfiniteScroll
                dataLength={data.length}
                next={(items) => reFetchData(items)}
                hasMore={hasMore}
                loader={
                  <span className="flex justify-center">
                    <img
                      className="animation-popup"
                      src="/images/loading-button.gif"
                      width={"45px"}
                      alt="loading"
                    ></img>
                  </span>
                }
                endMessage={
                  <p className="text-center text-get_blue text-sm mt-4">
                    <b>Kamu telah melihat semuanya...</b>
                  </p>
                }
              >
                {data.map((item) => {
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
                      className="medical-record__list__item hover:shadow-md duration-500 cursor-pointer "
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
                        titleStyle={"text-get_blue text-sm "}
                        descStyle={"text-get_desc text-xs "}
                        noteStyle={"text-get_pink text-xs"}
                      />
                    </div>
                    // </Link>
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>
          <hr className="solid" />
        </div>
      </div>
    </Layout>
  );
}
