import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { CardWithThumbnail } from "../../components/Card";

export default function Notification() {
  return (
    <Layout>
      <div className="notification">
        <div className="notification__wrapper flex flex-col px-[20px] mb-[20px]">
          <div className="notification__list flex flex-col gap-[10px] mb-[20px]">
            <div className="notification__list__item rounded-xl flex flex-col gap-[10px]">
              <Link href="/notification/123">
                <div
                  onClick={() => {
                    // router.push(`/medical-record/${item._id}`);
                  }}
                  className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                >
                  <CardWithThumbnail
                    title="notification 1"
                    description="{item.medical_complaint}"
                    note="{item.appointment_date}"
                    image="/images/icon/notification.png"
                  />
                </div>
              </Link>
              <Link href="/notification/123">
                <div
                  onClick={() => {
                    // router.push(`/medical-record/${item._id}`);
                  }}
                  className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                >
                  <CardWithThumbnail
                    title="notification 1"
                    description="{item.medical_complaint}"
                    note="{item.appointment_date}"
                    image="/images/icon/notification.png"
                  />
                </div>
              </Link>
              <Link href="/notification/123">
                <div
                  onClick={() => {
                    // router.push(`/medical-record/${item._id}`);
                  }}
                  className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                >
                  <CardWithThumbnail
                    title="notification 1"
                    description="{item.medical_complaint}"
                    note="{item.appointment_date}"
                    image="/images/icon/notification.png"
                  />
                </div>
              </Link>
            </div>
          </div>
          <hr className="solid" />
        </div>
      </div>
    </Layout>
  );
}
