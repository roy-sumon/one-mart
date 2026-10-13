import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { TbAirConditioning } from 'react-icons/tb';
import './styles.css';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { MdOutlinePestControl, MdPlumbing } from 'react-icons/md';
import { PiOven } from 'react-icons/pi';
import { IoGridOutline } from 'react-icons/io5';
// import required modules



const Banner_slider = () => {


    return (
        < >
         
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                freeMode={true}
                navigation={true}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper bg-white h-[200px] -mt-16  rounded-md  z-50  shadow  max-w-5xl mx-auto mb-20 flex justify-center items-center"

            >

                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                        <TbAirConditioning className='text-6xl' />
                        <h1 className="text-sm">AC Repair Serviece</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                        <CgSmartHomeRefrigerator className='text-6xl' />
                        <h1 className="text-sm">Regrigerator Repair Serviece</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                        <MdOutlinePestControl className='text-6xl' />
                        <h1 className="text-sm">Pest Control</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                    <PiOven  className='text-6xl'/>
                        <h1 className="text-sm">Oven Repair Serviece</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                    <MdPlumbing className='text-6xl'/>
                    
                        <h1 className="text-sm">Plumbing Serviece</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                    <IoGridOutline  className='text-6xl'/>
                        <h1 className="text-sm">All Servieces</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide  >
                    <div className="flex flex-col items-center justify-center p-5  ">
                    <IoGridOutline  className='text-6xl'/>
                        <h1 className="text-sm">All Servieces</h1>
                    </div>
                </SwiperSlide>
             


            </Swiper>

        </>)
};

export default Banner_slider;