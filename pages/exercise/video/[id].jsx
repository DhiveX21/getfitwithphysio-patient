import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { VideoPlayer1 } from "../../../components/Video";
import { Button, SubmitButton } from "../../../components/Button";
import {
  exerciseGetOneVideoByUserId,
  exerciseVideoSetWatch,
} from "../../../endpoint/Exercise";
import { getSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export async function getServerSideProps({ query, req, res }) {
  const session = await getSession({ req });
  const video = await exerciseGetOneVideoByUserId(
    query.id,
    session?.credentials.user_id
  )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return null;
    });

  return { props: { credentials: session?.credentials, video: video } };
}

export default function VideoDetail({ credentials, video }) {
  useEffect(() => {
    if (video === null) {
      alert(
        "Maaf Saat ini Video Exercise ini sedang dalam perbaikan, Coba tonton Video Lain aja yukk! :D"
      );
      router.push("/exercise/video");
    }
  }, [video]);

  const dispatch = useDispatch();
  const inputDailyReport = useRef();
  const [dailyReport, setDailyReport] = useState();
  const router = useRouter();
  function handleSubmitWatch(videoId) {
    const body = {
      user_id: credentials.user_id,
      video_id: videoId,
      daily_note: dailyReport,
    };

    dispatch(exerciseVideoSetWatch(body)).then((response) => {
      if (response.status === 200) {
        router.reload(window.location.pathname);
      }
    });
  }

  return (
    <Layout>
      <div className="px-[20px] flex flex-col  mb-[20px]">
        <MenuTitle
          text={video?.title}
          icon="/images/icon/medical-result_icon.svg"
        ></MenuTitle>
        <div className="breadcrumb">
          <div className="breadcrumb__wrapper px-[10px]">
            <Breadcrumbs />
          </div>
        </div>
        <div className="video_detail">
          <div className="video_detail__wrapper">
            <div className="video_detail__player ">
              <VideoPlayer1
                title={video?.title}
                description={video?.description}
                url={video?.video_url}
              ></VideoPlayer1>
            </div>
            <hr className="solid"></hr>
            <div className="video_detail__status flex px-[5px] gap-[10px] py-[10px]">
              <div className="video_detail__status__badge">Status</div>
              <div className="video_detail__status__text">
                {video?.today_watch ? (
                  <span className="bg-success px-[10px] text-white rounded">
                    Selesai di Tonton
                  </span>
                ) : (
                  <span className="bg-danger px-[10px] text-[white] rounded">
                    Belum Di Tonton
                  </span>
                )}
              </div>
            </div>
            {video?.today_watch ? null : (
              <>
                <hr className="solid"></hr>
                <textarea
                  type="text"
                  ref={inputDailyReport}
                  className="w-full leading-[1em] px-[10px] py-[5px]"
                  rows={4}
                  placeholder="Cth : Leher saya mulai membaik hari ini."
                  onChange={(e) => setDailyReport(e.target.value)}
                  required
                ></textarea>
                <span className="form-hint">
                  Tulis Keadaan mu hari ini , agar Fisio dapat melihat progress
                  mu.
                </span>
                <div className="video_detail__button text-right py-[10px]">
                  {/* <Button
                    text="Selesai"
                    click={() => handleSubmitWatch(video?.id)}
                    disabled={dailyReport ? false : true}
                    classNameInject={` py-[5px] rounded-[5px] text-[white] text-[20px] duration-500 ${
                      dailyReport ? "bg-primary" : "bg-secondary"
                    }`}
                  /> */}

                  <SubmitButton
                    text="Selesai"
                    click={() => handleSubmitWatch(video?.id)}
                    disabled={dailyReport ? false : true}
                    classNameInject={` w-full py-[5px] rounded-[5px] text-[white] text-[20px] duration-500 ${
                      dailyReport ? "bg-primary" : "bg-secondary"
                    }`}
                  ></SubmitButton>
                </div>
              </>
            )}
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
