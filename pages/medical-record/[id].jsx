import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { useDispatch } from "react-redux";

export default function AppointmentInfo() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle
          text="Detail Rekam Medis"
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

        <hr className="solid"></hr>
      </div>
    </Layout>
  );
}
