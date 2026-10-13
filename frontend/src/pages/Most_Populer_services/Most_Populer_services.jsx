import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';



// Function to shuffle array elements
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
const Most_Populer_services = () => {
    const axiosPublic = useAxiosPublic()
    const [services, setServices] = useState([])

    useEffect(() => {

        axiosPublic.get(`/services`)
            .then((res) => setServices(res.data));
    }, [axiosPublic]);

    const imgStyle = {
        height: '204px', 
        width: '100%', 
        objectFit: 'cover', 
        borderRadius: '8px'
    };
    const [randomServices, setRandomServices] = useState([]);

    useEffect(() => {
      // Shuffle the services array
      const shuffledServices = shuffleArray(services);
  
      // Select the first three services from the shuffled array
      const selectedServices = shuffledServices.slice(0, 3);
  
      // Set state with the randomly selected services
      setRandomServices(selectedServices);
    }, [services]);

return (
    <div className='max-w-7xl mx-auto my-20 px-5 lg:px-0'>
        <div className="">
            <h1 className="text-3xl font-semibold">Most Populer Services </h1>
        </div>
        <div className='max-w-7xl mx-auto my-10'>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    440: {
                        slidesPerView: 2 // On screens smaller than 768px, display 1 slide
                    },
                    768: {
                        slidesPerView: 2 // On screens smaller than 768px, display 1 slide
                    },
                    1024: {
                        slidesPerView: 4 // On screens smaller than 1024px, display 2 slides
                    },
                    1280: {
                        slidesPerView: 4 // On screens smaller than 1280px, display 3 slides
                    }
                }}
            >
               {randomServices.map((service) => (
        <SwiperSlide key={service._id} className='cursor-pointer'>
          <Link to={`/service-details/${service._id}`}>
            <div className="rounded-md">
              <img src={service.image} alt={service.service} style={imgStyle} className="rounded-md" />
              <h3 className="text-xl font-semibold">{service.service}</h3>
            </div>
          </Link>
        </SwiperSlide>
      ))}
            </Swiper>
        </div>
    </div>
);
}

export default Most_Populer_services;