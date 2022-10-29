import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useDispatch } from "react-redux";
import { VideoPlayer1 } from "../../../components/Video";
import { Button } from "../../../components/Button";
import {
  exerciseGetOneVideo,
  exerciseVideoSetWatch,
} from "../../../endpoint/Exercise";
import { wrapper } from "../../../store/store";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ query, req, res }) {
  const session = await getSession({ req });
  const video = await exerciseGetOneVideo(query.id)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return { props: { credentials: session.credentials, video: video } };
}

export default function VideoDetail({ credentials, video }) {
  const router = useRouter();
  function handleSubmitWatch(videoId) {
    const body = {
      user_id: credentials.user_id,
      video_id: videoId,
    };

    exerciseVideoSetWatch(body).then((response) => {
      if (response.status === 200) {
        router.reload(window.location.pathname);
      }
    });
  }

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text={video.title}
          icon="/images/icon/medical-result_icon.svg"
        ></MenuTitle>
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
        <div className="video_detail">
          <div className="video_detail__wrapper">
            <div className="video_detail__player">
              <VideoPlayer1
                title={video.title}
                description={video.description}
                url={video.video_url}
              ></VideoPlayer1>
            </div>
            <hr className="solid"></hr>
            <div className="video_detail__status flex px-[5px] gap-[10px] py-[10px]">
              <div className="video_detail__status__badge">Status</div>
              <div className="video_detail__status__text">
                <span className="bg-[#05ad75] px-[10px] text-[white] rounded">
                  Selesai
                </span>
              </div>
            </div>
            <hr className="solid"></hr>
            <div className="video_detail__button text-right py-[10px]">
              <Button
                text="Selesai"
                click={() => handleSubmitWatch(video.id)}
                classNameInject=" bg-primary py-[5px] rounded-[5px] text-[white] text-[20px] "
              />
            </div>
          </div>
        </div>
        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
