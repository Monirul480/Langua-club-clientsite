import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/element/css/autoplay";
import "./styles.css";
import { Pagination, Navigation, Autoplay } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper  lg:h-[calc(100vh-10vh)]"
        autoplay={{
          delay: 2000, // Delay between slides in milliseconds
          disableOnInteraction: true, // Continue autoplay on user interaction
        }}
      >
        <SwiperSlide>
          <div
            className="hero h-[30vh] lg:h-[calc(100vh-10vh)]"
            style={{
              backgroundImage: `url("https://i.ibb.co/1ZvQrLZ/slider1.jpg")`,
            }}
          >
            <div className="hero-overlay text-start bg-slate-600 bg-opacity-50">
              <div className="lg:mt-48 pl-6 py-3 lg:ml-32 text-white">
                <h2 className="font-bold text-4xl lg:text-5xl ">
                  Classes Now <br />
                  Forming!
                </h2>
                <p className="lg:mt-6 ">
                  Our Courses Are Taught at Beginner To Advanced <br /> Level on
                  a Year Basis
                </p>
                <p className="lg:mt-4">
                  <samp className="text-green-500">Enrollment Date:</samp> June
                  15, 2023
                </p>
                <button className="bg-green-400 py-2 px-4  mt-3 lg:mt-6">
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero h-[30vh] lg:h-[calc(100vh-10vh)]"
            style={{
              backgroundImage: `url("https://i.ibb.co/wQtyRkv/slider2.jpg")`,
            }}
          >
            <div className="hero-overlay bg-slate-600 bg-opacity-50">
              <div className="lg:mt-48 pl-6 text-start py-3 lg:ml-32 text-white">
                <h2 className="font-bold  text-4xl lg:text-5xl ">
                  Study Languages<br />
                  Having Fun!
                </h2>
                <p className="lg:mt-6 ">
                  We Have The International Reputation for Hign <br /> Level on
                  Quality Teaching and Success
                </p>
                <p className="lg:mt-4">
                  <samp className="text-green-500">Enrollment Date:</samp> June
                  15, 2023
                </p>
                <button className="bg-green-400 py-2 px-4  mt-3 lg:mt-6">
                  Click Here
                </button>
              </div>
            </div>
            <div className="text-white"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div
            className="hero h-[30vh] lg:h-[calc(100vh-10vh)]"
            style={{
              backgroundImage: `url("https://i.ibb.co/1QtxDmX/slider3.jpg")`,
            }}
          >
            <div className="hero-overlay bg-slate-600 bg-opacity-50">
              <div className="lg:mt-48 pl-6 text-start py-3 lg:ml-32 text-white">
                <h2 className="font-bold  text-4xl lg:text-5xl ">
                We Are Trusted<br />
                  Institution!
                </h2>
                <p className="lg:mt-6 ">
                 We Offer Programs Designed to meet the Needs of<br />
                 Individuals from All Around The World 
                </p>
                <p className="lg:mt-4">
                  <samp className="text-green-500">Enrollment Date:</samp> June
                  15, 2023
                </p>
                <button className="bg-green-400 py-2 px-4  mt-3 lg:mt-6">
                  Click Here
                </button>
              </div>
            </div>
            <div className="text-white"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero h-[30vh] lg:h-[calc(100vh-10vh)]"
            style={{
              backgroundImage: `url("https://i.ibb.co/Tq3Fmd8/slider5.jpg")`,
            }}
          >
            <div className="hero-overlay text-start bg-slate-600 bg-opacity-50">
              <div className="lg:mt-48 pl-6 py-3 lg:ml-32 text-white">
                <h2 className="font-bold text-4xl lg:text-5xl ">
                  Classes Now <br />
                  Forming!
                </h2>
                <p className="lg:mt-6 ">
                  Our Courses Are Taught at Beginner To Advanced <br /> Level on
                  a Year Basis
                </p>
                <p className="lg:mt-4">
                  <samp className="text-green-500">Enrollment Date:</samp> June
                  15, 2023
                </p>
                <button className="bg-green-400 py-2 px-4  mt-3 lg:mt-6">
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero h-[30vh] lg:h-[calc(100vh-10vh)]"
            style={{
              backgroundImage: `url("https://i.ibb.co/HrcHc6K/slider4.jpg")`,
            }}
          >
            <div className="hero-overlay bg-slate-600 bg-opacity-50">
              <div className="lg:mt-48 pl-6 text-start py-3 lg:ml-32 text-white">
                <h2 className="font-bold  text-4xl lg:text-5xl ">
                  Study Languages<br />
                  Having Fun!
                </h2>
                <p className="lg:mt-6 ">
                  We Have The International Reputation for Hign <br /> Level on
                  Quality Teaching and Success
                </p>
                <p className="lg:mt-4">
                  <samp className="text-green-500">Enrollment Date:</samp> June
                  15, 2023
                </p>
                <button className="bg-green-400 py-2 px-4  mt-3 lg:mt-6">
                  Click Here
                </button>
              </div>
            </div>
            <div className="text-white"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

