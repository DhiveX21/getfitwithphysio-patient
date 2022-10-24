import React, { useState, useEffect } from "react";
import { CardWithThumbnail } from "../../components/Card";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { MenuTitle } from "../../components/Title";
import Breadcrumbs from "nextjs-breadcrumbs";
import axios from "axios";
import { useSelector } from "react-redux";
import { appointmentGetAllMedicalRecordByIdUser } from "../../endpoint/Appointment";
import { formatDateRawToYMD } from "../../helpers/common";

export default function MedicalRecords() {
  const [medicalRecord, setMedicalRecord] = useState();
  const { user } = useSelector((state) => state.logedInData);
  console.log(user.user_id);
  useEffect(() => {
    if (user.user_id) {
      appointmentGetAllMedicalRecordByIdUser(user.user_id)
        .then((response) => {
          console.log(response);
          setMedicalRecord(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user.user_id]);
  const router = useRouter();
  return (
    <Layout>
      <div className="medical-record">
        <div className="medical-record__wrapper flex flex-col px-[20px] mb-[20px]">
          <MenuTitle
            text="Rekam Medis"
            icon="/images/icon/medical-result_icon.svg"
          ></MenuTitle>
          <div className="medical-record__breadcrumb p-[10px]">
            <Breadcrumbs
              useDefaultStyle={false}
              containerClassName="breadcrumbs-container"
              listClassName="breadcrumbs-list"
              inactiveItemClassName="breadcrumbs-inactive"
              activeItemClassName="breadcrumbs-active"
              rootLabel="Get Physio"
            />
          </div>
          <div className="medical-record__list flex flex-col gap-[10px] mb-[20px]">
            {medicalRecord && medicalRecord.length > 0
              ? medicalRecord.map((item, index) => {
                  return (
                    <div
                      key={item._id}
                      onClick={() => {
                        router.push(`/medical-record/${item._id}`);
                      }}
                      className="medical-record__list__item hover:scale-[1.05] duration-500 cursor-pointer"
                    >
                      <CardWithThumbnail
                        title={item.therapist_detail.name}
                        description={item.records[0].value}
                        note={item.date + " " + item.time + " WIB"}
                        image="/images/icon/user.png"
                      />
                    </div>
                  );
                })
              : ""}
          </div>
          <hr className="solid"></hr>
        </div>
      </div>
    </Layout>
  );
}
