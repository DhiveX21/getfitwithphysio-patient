// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Carousel({
  swiperItem = [
    <div className="bg-danger h-[240px] rounded-[20px] justify-center items-center">
      swiper1
    </div>,
    <div className="bg-primary h-[240px] rounded-[20px] justify-center items-center">
      swiper2
    </div>,
  ],
  slidesPerView = 1,
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      navigation
      loop={true}
      autoplay={true}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {swiperItem.map((item) => {
        return <SwiperSlide>{item}</SwiperSlide>;
      })}
    </Swiper>
  );
}
