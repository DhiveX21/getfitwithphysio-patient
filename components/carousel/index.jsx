// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import parse from "html-react-parser";
export default function Carousel({
  swiperItem = [
    ` <div className="bg-danger h-[240px] rounded-[20px] justify-center items-center">
      swiper1
    </div>`,
    ` <div className="bg-primary h-[240px] rounded-[20px] justify-center items-center">
      swiper2
    </div>`,
  ],
  slidesPerView = 1,
  spaceBetween = 50,
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={spaceBetween}
      navigation
      loop={true}
      autoplay={true}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {swiperItem.map((item, index) => {
        return <SwiperSlide key={index}>{parse(item)}</SwiperSlide>;
      })}
    </Swiper>
  );
}
