import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { MenuTitle } from "../../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useDispatch } from "react-redux";
import { VideoPlayer1 } from "../../../components/Video";
import { Button } from "../../../components/Button";

export default function VideoDetail(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Video1"
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
              <VideoPlayer1></VideoPlayer1>
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
