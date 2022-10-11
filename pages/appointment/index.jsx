import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import { CardWithThumbnail } from "../../components/Card";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
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
        <div
          onClick={() => {
            router.push(`/appointment/123`);
          }}
          className=" hover:scale-[1.05] duration-500 cursor-pointer"
        >
          <CardWithThumbnail
            title="awdawda"
            description="Aadawad"
            note="12 Juni 2002"
            image="/images/physio1.png"
          />
        </div>
      </div>
    </Layout>
  );
}
