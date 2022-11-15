import React from "react";
import Layout from "../../components/Layout";
import { MenuTitle } from "../../components/Title";
import { ButtonWithIcon2, Button } from "../../components/Button";
import { useRouter } from "next/router";
import { SectionTitle } from "../../components/Title";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: { credentials: session?.credentials },
  };
}

export default function Profile({ credentials }) {
  const router = useRouter();
  return (
    <Layout>
      <div className="px-[20px] flex flex-col gap-[10px] mb-[20px]">
        <MenuTitle text="Tele Fisio" icon="/images/icon/user_2.png"></MenuTitle>

        <div className=" p-[10px] rounded-[20px] text-center">
          <div className="profile__picture flex justify-center flex-col items-center">
            <picture>
              <img
                className="w-[125px] h-[125px]"
                src="/images/icon/user_2.png"
                alt="user profile"
              />
            </picture>
            <div className="profile__picture__name text-center text-primary">
              <h3 className="text-[24px] leading-[24px]">{credentials.name}</h3>
            </div>
            <div className="profile__picture__gender text-center text-[#5e5e5e]">
              <p className="text-[18px] leading-[14px]">{credentials.gender}</p>
            </div>
            <div className="profile__item my-[10px]">
              <div className="profile__item__title text-primary">
                <h3 className="text-[24px] leading-[24px]">Tanggal Lahir</h3>
              </div>
              <div className="profile__item__value text-center text-[#5e5e5e]">
                <p className="text-[18px] leading-[14px]">
                  {credentials.birth_date}
                </p>
              </div>
            </div>
            <div className="profile__item my-[10px]">
              <div className="profile__item__title text-primary">
                <h3 className="text-[24px] leading-[24px]">Alamat</h3>
              </div>
              <div className="profile__item__value text-center text-[#5e5e5e]">
                <p className="text-[18px] leading-[14px]">
                  {credentials.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-[20px]"
          style={{ width: "calc(100% + 40px)", marginLeft: "-20px" }}
        >
          <SectionTitle text="Riwayat & Keterangan"></SectionTitle>
        </div>
        <div className="profile__menu__list  flex w-full justify-center gap-[10px] flex-wrap">
          <div className="profile__menu__list__item w-1/4">
            <ButtonWithIcon2
              text="Riwayat Appointment"
              type="button"
              icon="/images/icon/calendar.png"
              click={() => router.push("/appointment")}
            ></ButtonWithIcon2>
          </div>
          <div className="profile__menu__list__item w-1/4">
            <ButtonWithIcon2
              text="Riwayat Pembelian"
              type="button"
              icon="/images/icon/checkout.png"
              click={() => router.push("/orders")}
            ></ButtonWithIcon2>
          </div>
          <div className="profile__menu__list__item w-1/4">
            <ButtonWithIcon2
              text="Rekam Medis"
              type="button"
              icon="/images/icon/clipboard.png"
              click={() => router.push("/medical-record")}
            ></ButtonWithIcon2>
          </div>
        </div>
        <div
          className="mb-[20px]"
          style={{ width: "calc(100% + 40px)", marginLeft: "-20px" }}
        >
          <SectionTitle text="Action"></SectionTitle>
        </div>
        <div className="profile__action w-full flex justify-center">
          <Button
            type="button"
            click={() => {
              confirm("apa kamu yakin ingin keluar akun?") == true
                ? signOut({ callbackUrl: "/auth/login" })
                : "";
            }}
            text="Keluar Akun"
            classNameInject="px-[20px] py-[5px] text-[#fff] text-[24px] bg-danger rounded-[10px] w-[200px]"
          />
        </div>
        <hr className="solid my-[20px]" />
      </div>
    </Layout>
  );
}
