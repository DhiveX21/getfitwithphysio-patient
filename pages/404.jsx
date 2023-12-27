// 404.js
import Link from "next/link";
import { Button } from "../components/Button";
import Layout from "../components/Layout";

export default function FourOhFour() {
  return (
    <Layout>
      <div className="error-page w-full flex justify-center">
        <div className="error-page__wrapper w-full flex flex-col p-[20px]  items-center min-h-[500px] my-[20px]">
          <div className="error-page__image">
            <picture className="flex justify-center items-center p-[30px]">
              <img
                className="w-1/2"
                src="/images/icon/404.png"
                alt="not found"
              />
            </picture>
          </div>
          <div className="error-page__title text-xl font-semibold  text-get_pink">
            <h3>Halaman Tidak di temukan.</h3>
          </div>
          <div className="error-page__description text-sm  text-get_light_desc">
            <p>coba kembali ke Menu utama saja yuk :)</p>
          </div>
          <Link href="/dashboard">
            <div className="error-page__button">
              <Button
                text="Menu"
                classNameInject=" bg-white border-2 border-primary px-[20px] py-[5px] shadow-md shadow-slate-200 text-get_blue text-sm rounded-lg min-w-[100px] mt-[20px]"
              />
            </div>
          </Link>
        </div>
      </div>
      <hr className="solid mb-[20px]" />
    </Layout>
  );
}
